#!/usr/bin/env node
/**
 * Komprese videí pro web před vložením do /public/videos.
 *
 * Použití:
 *   node scripts/compress-video.mjs public/videos/pilulka-1.mp4
 *   node scripts/compress-video.mjs public/videos/*.mp4 --max-width 1080
 *   node scripts/compress-video.mjs public/videos/*.mp4 --replace
 *
 * Vyžaduje ffmpeg v PATH. Výstup: stejná složka, suffix -web.mp4
 * S --replace: originál přesune do _originals/ a web verze nahradí původní název.
 */

import { spawnSync } from 'node:child_process';
import { basename, dirname, join } from 'node:path';
import { existsSync, mkdirSync, renameSync, statSync, unlinkSync } from 'node:fs';

const args = process.argv.slice(2);
const maxWidthFlag = args.indexOf('--max-width');
const replace = args.includes('--replace');
const maxWidth = maxWidthFlag >= 0 ? Number(args[maxWidthFlag + 1]) || 1080 : 1080;
const inputs = args.filter((arg, i) => {
  if (arg.startsWith('--')) return false;
  if (maxWidthFlag >= 0 && i === maxWidthFlag + 1) return false;
  return arg.endsWith('.mp4') && !arg.includes('-web.mp4');
});

if (!inputs.length) {
  console.error('Použití: node scripts/compress-video.mjs <soubor.mp4> [--max-width 1080] [--replace]');
  process.exit(1);
}

const ffmpeg = spawnSync('ffmpeg', ['-version'], { encoding: 'utf8' });
if (ffmpeg.status !== 0) {
  console.error('ffmpeg není nainstalovaný. Na macOS: brew install ffmpeg');
  process.exit(1);
}

function formatSize(bytes) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const results = [];

for (const input of inputs) {
  if (!existsSync(input)) {
    console.warn(`Přeskočeno (neexistuje): ${input}`);
    continue;
  }

  const dir = dirname(input);
  const name = basename(input, '.mp4');
  const output = join(dir, `${name}-web.mp4`);

  console.log(`\nKomprimuji: ${input}`);

  const result = spawnSync(
    'ffmpeg',
    [
      '-y',
      '-i',
      input,
      '-an',
      '-vf',
      `scale='min(${maxWidth},iw)':-2`,
      '-c:v',
      'libx264',
      '-preset',
      'medium',
      '-crf',
      '28',
      '-movflags',
      '+faststart',
      '-pix_fmt',
      'yuv420p',
      output,
    ],
    { stdio: 'inherit' },
  );

  if (result.status !== 0) {
    console.error(`Chyba při kompresi: ${input}`);
    process.exit(result.status ?? 1);
  }

  const originalSize = statSync(input).size;
  const webSize = statSync(output).size;

  if (replace && webSize < originalSize) {
    const originalsDir = join(dir, '_originals');
    mkdirSync(originalsDir, { recursive: true });
    const backup = join(originalsDir, basename(input));
    if (!existsSync(backup)) {
      renameSync(input, backup);
    } else {
      unlinkSync(input);
    }
    renameSync(output, input);
    console.log(`✓ Nahrazeno: ${formatSize(originalSize)} → ${formatSize(webSize)}`);
    results.push({ name: basename(input), before: originalSize, after: webSize, replaced: true });
  } else if (replace) {
    unlinkSync(output);
    console.log(`– Web verze není menší, ponechán originál (${formatSize(originalSize)} vs ${formatSize(webSize)})`);
    results.push({ name: basename(input), before: originalSize, after: webSize, replaced: false });
  } else {
    console.log(`✓ Hotovo: ${formatSize(originalSize)} → ${formatSize(webSize)} (${output})`);
    results.push({ name: basename(input), before: originalSize, after: webSize, replaced: false });
  }
}

if (results.length) {
  console.log('\n--- Souhrn ---');
  let saved = 0;
  for (const row of results) {
    const delta = row.before - row.after;
    if (row.replaced && delta > 0) saved += delta;
    console.log(
      `${row.name}: ${formatSize(row.before)} → ${formatSize(row.after)}${row.replaced ? ' (nahrazeno)' : ''}`,
    );
  }
  if (saved > 0) {
    console.log(`Celkem ušetřeno: ${formatSize(saved)}`);
  }
}

if (!replace) {
  console.log('\nTip: přidej --replace pro automatické nahrazení originálů (záloha v _originals/).');
}
