import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import { siteContent } from '../src/data/siteContent.js';
import { validateContactBody } from './validateContact.js';
import { buildAutoReplyHtml, buildLeadNotificationHtml } from './emailTemplates.js';
import { resolveEmailLogo } from './emailLogo.js';
import { agentLog } from './debugLog.js';

const PORT = Number(process.env.PORT || 3001);

const resendApiKey = process.env.RESEND_API_KEY?.trim();
const mailConfigured = Boolean(resendApiKey);

const siteUrl = process.env.SITE_URL || 'https://orbenzimrafitnesscoach.com';
const fromEmail =
  process.env.CONTACT_FROM_EMAIL?.trim() || siteContent.contact.email;
const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || siteContent.contact.email;

const DEFAULT_INSTAGRAM = 'https://www.instagram.com/or_benzimra/';

function resolveInstagramUrl() {
  const candidates = [
    process.env.INSTAGRAM_URL?.trim(),
    siteContent.footer.social.find((s) => s.platform === 'Instagram')?.url?.trim(),
  ].filter(Boolean);

  for (const url of candidates) {
    if (url === '#' || url === 'https://www.instagram.com/' || url === 'http://www.instagram.com/') {
      continue;
    }
    return url;
  }
  return DEFAULT_INSTAGRAM;
}

const instagramUrl = resolveInstagramUrl();

const resend = mailConfigured ? new Resend(resendApiKey) : null;
const fromAddress = `${siteContent.gym.name} <${fromEmail}>`;

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: '32kb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    mailConfigured,
    provider: 'resend',
  });
});

app.post('/api/contact', async (req, res) => {
  // #region agent log
  agentLog({
    location: 'server/index.js:contact:entry',
    message: 'contact request received',
    hypothesisId: 'H-A,H-B',
    runId: 'post-fix',
    data: { pid: process.pid },
  });
  // #endregion

  if (!mailConfigured || !resend) {
    return res.status(503).json({
      ok: false,
      error: 'שירות המייל עדיין לא הוגדר בשרת. נסו שוב מאוחר יותר.',
    });
  }

  const validation = validateContactBody(req.body);
  if (!validation.ok) {
    return res.status(400).json({ ok: false, error: validation.error });
  }

  const { name, phone, email } = validation.data;

  const leadText = `ליד חדש מהאתר\nשם: ${name}\nטלפון: ${phone}\nאימייל: ${email}`;
  const autoReplyText = [
    `שלום ${name},`,
    '',
    'תודה על הפנייה ועל ההתעניינות בליווי האונליין שלי.',
    'קיבלתי את הפרטים שלך ואחזור אליך בהקדם האפשרי כדי להבין את המטרה שלך',
    'ולבדוק איך נוכל להתחיל לבנות עבורך תוכנית שמתאימה בדיוק לך.',
    '',
    'בברכה,',
    'אור בן זמרה',
    'מאמן כושר אונליין',
  ].join('\n');

  const { logoSrc, attachments } = await resolveEmailLogo(siteUrl);
  const autoReplyHtml = buildAutoReplyHtml({ name, siteUrl, instagramUrl, logoSrc });
  const leadHtml = buildLeadNotificationHtml({ name, phone, email, siteUrl, instagramUrl, logoSrc });

  // #region agent log
  agentLog({
    location: 'server/index.js:contact',
    message: 'email send payload logo',
    hypothesisId: 'H-A,H-C,H-F',
    runId: 'post-fix-v2',
    data: {
      logoSrcInHtml: logoSrc,
      usesCid: logoSrc.startsWith('cid:'),
      usesHttps: logoSrc.startsWith('https://'),
      attachmentCount: attachments?.length ?? 0,
      autoReplyOnlyAttachments: true,
    },
  });
  // #endregion

  try {
    const leadResult = await resend.emails.send({
      from: fromAddress,
      to: [toEmail],
      replyTo: email,
      subject: `פנייה חדשה מהאתר — ${name}`,
      html: leadHtml,
      text: leadText,
    });

    if (leadResult.error) {
      throw new Error(leadResult.error.message);
    }

    const autoReplyResult = await resend.emails.send({
      from: fromAddress,
      to: [email],
      subject: 'תודה על הפנייה — אור בן זמרה',
      html: autoReplyHtml,
      text: autoReplyText,
      attachments,
    });

    if (autoReplyResult.error) {
      throw new Error(autoReplyResult.error.message);
    }

    // #region agent log
    agentLog({
      location: 'server/index.js:contact:success',
      message: 'contact emails sent',
      hypothesisId: 'H-A,H-B',
      runId: 'post-fix',
      data: { pid: process.pid, ok: true },
    });
    // #endregion

    return res.json({ ok: true });
  } catch (err) {
    console.error('[contact] send failed:', err);

    // #region agent log
    agentLog({
      location: 'server/index.js:contact:error',
      message: 'contact send failed',
      hypothesisId: 'H-C,H-D',
      runId: 'post-fix',
      data: { pid: process.pid, error: err?.message ?? String(err) },
    });
    // #endregion

    return res.status(500).json({
      ok: false,
      error: 'לא הצלחנו לשלוח את הטופס. נסו שוב או צרו קשר בטלפון.',
    });
  }
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
