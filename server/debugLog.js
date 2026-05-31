import { appendFileSync } from 'fs';
import path from 'path';

const LOG_PATH = path.join(process.cwd(), 'debug-b764cf.log');
const INGEST = 'http://127.0.0.1:7308/ingest/332e662d-173f-4559-a14e-efacec495e50';

export function agentLog({ location, message, data, hypothesisId, runId = 'pre-fix' }) {
  const entry = {
    sessionId: 'b764cf',
    timestamp: Date.now(),
    location,
    message,
    data,
    hypothesisId,
    runId,
  };

  // #region agent log
  try {
    appendFileSync(LOG_PATH, `${JSON.stringify(entry)}\n`);
  } catch {
    /* ignore */
  }
  fetch(INGEST, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'b764cf' },
    body: JSON.stringify(entry),
  }).catch(() => {});
  // #endregion
}
