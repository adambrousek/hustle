import { execSync } from 'node:child_process';

const PORTS = [5173, 3456];

for (const port of PORTS) {
  try {
    const pids = execSync(`lsof -ti :${port}`, { encoding: 'utf8' }).trim();
    if (!pids) continue;
    for (const pid of pids.split('\n').filter(Boolean)) {
      try {
        process.kill(Number(pid));
      } catch {
        // already gone
      }
    }
  } catch {
    // port free
  }
}
