import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { siteContent } from '../src/data/siteContent.js';
import { validateContactBody } from './validateContact.js';
import { buildAutoReplyHtml, buildLeadNotificationHtml } from './emailTemplates.js';

const PORT = Number(process.env.PORT || 3001);

const requiredEnv = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'];
const missing = requiredEnv.filter((key) => !process.env[key]);

const siteUrl = process.env.SITE_URL || 'https://orbenzimra.co.il';
const fromEmail = process.env.CONTACT_FROM_EMAIL || process.env.SMTP_USER || siteContent.contact.email;
const toEmail = process.env.CONTACT_TO_EMAIL || siteContent.contact.email;

const instagramUrl =
  process.env.INSTAGRAM_URL ||
  siteContent.footer.social.find((s) => s.platform === 'Instagram')?.url ||
  '';

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: '32kb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    mailConfigured: missing.length === 0,
  });
});

app.post('/api/contact', async (req, res) => {
  if (missing.length > 0) {
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
  const transporter = createTransporter();

  try {
    await transporter.sendMail({
      from: `"${siteContent.gym.name}" <${fromEmail}>`,
      to: toEmail,
      replyTo: email,
      subject: `פנייה חדשה מהאתר — ${name}`,
      html: buildLeadNotificationHtml({ name, phone, email, siteUrl, instagramUrl }),
      text: `ליד חדש מהאתר\nשם: ${name}\nטלפון: ${phone}\nאימייל: ${email}`,
    });

    await transporter.sendMail({
      from: `"${siteContent.gym.name}" <${fromEmail}>`,
      to: email,
      subject: 'תודה על הפנייה — אור בן זימרה',
      html: buildAutoReplyHtml({ name, siteUrl, instagramUrl }),
      text: [
        `שלום ${name},`,
        '',
        'תודה על הפנייה ועל ההתעניינות!',
        'קיבלנו את הפרטים שלך ונחזור אליך בהקדם האפשרי.',
        '',
        'בברכה,',
        'אור בן זימרה',
        'מאמן כושר אישי',
      ].join('\n'),
    });

    return res.json({ ok: true });
  } catch (err) {
    console.error('[contact] send failed:', err);
    return res.status(500).json({
      ok: false,
      error: 'לא הצלחנו לשלוח את הטופס. נסו שוב או צרו קשר בטלפון.',
    });
  }
});

app.listen(PORT, () => {
  console.log(`Contact API listening on http://localhost:${PORT}`);
  if (missing.length > 0) {
    console.warn(`Mail not configured. Missing env: ${missing.join(', ')}`);
  }
});
