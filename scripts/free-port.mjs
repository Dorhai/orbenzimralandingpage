import { execSync } from 'child_process';

const port = process.argv[2] || '3001';

function freePortOnWindows(targetPort) {
  try {
    const output = execSync(`netstat -ano | findstr :${targetPort}`, { encoding: 'utf8' });
    const pids = new Set();

    for (const line of output.split('\n')) {
      if (!line.includes('LISTENING')) continue;
      const pid = line.trim().split(/\s+/).at(-1);
      if (pid && pid !== '0') pids.add(pid);
    }

    for (const pid of pids) {
      try {
        execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' });
        console.log(`[free-port] Stopped PID ${pid} on port ${targetPort}`);
      } catch {
        /* already gone */
      }
    }
  } catch {
    /* port not in use */
  }
}

freePortOnWindows(port);
