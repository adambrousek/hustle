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

export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD_COMMIT_TIME__: JSON.stringify(getBuildCommitTime()),
  },
});
