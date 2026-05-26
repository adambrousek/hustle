import { execSync } from 'node:child_process';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function getBuildCommitTime() {
  try {
    return execSync('git log -1 --format=%ci', { encoding: 'utf8' }).trim();
  } catch {
    return new Date().toISOString();
  }
}

function getBuildCommitHash() {
  try {
    return execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
  } catch {
    return 'dev';
  }
}

/** Local time when Vite runs the production build (what you see on Vercel). */
function getBuildTime() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD_TIME__: JSON.stringify(getBuildTime()),
    __BUILD_COMMIT_TIME__: JSON.stringify(getBuildCommitTime()),
    __BUILD_COMMIT_HASH__: JSON.stringify(getBuildCommitHash()),
  },
});
