import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { getHealth, postContact } from './contactHandler.js';
import { mailConfigured } from './mailConfig.js';

const PORT = Number(process.env.PORT || 3001);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: '32kb' }));

app.get('/api/health', (_req, res) => {
  res.json(getHealth());
});

app.post('/api/contact', async (req, res) => {
  const { status, json } = await postContact(req.body);
  res.status(status).json(json);
});

const server = app.listen(PORT);

server.on('listening', () => {
  console.log(`Contact API listening on http://localhost:${PORT}`);
  if (!mailConfigured) {
    console.warn('Mail not configured. Missing env: RESEND_API_KEY');
  }
});

server.on('error', (err) => {
  console.error('[api] Server error:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`[api] Port ${PORT} is already in use. Run: npm run dev (frees port) or taskkill the PID from netstat.`);
  }
  process.exit(1);
});
