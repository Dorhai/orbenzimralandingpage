import { validateContactBody } from './validateContact.js';
import { buildAutoReplyHtml, buildLeadNotificationHtml } from './emailTemplates.js';
import { resolveEmailLogo } from './emailLogo.js';
import {
  mailConfigured,
  resend,
  siteUrl,
  toEmail,
  fromAddress,
  instagramUrl,
} from './mailConfig.js';

export function getHealth() {
  return {
    ok: true,
    mailConfigured,
    provider: 'resend',
  };
}

export async function postContact(body) {
  if (!mailConfigured || !resend) {
    return {
      status: 503,
      json: {
        ok: false,
        error: 'שירות המייל עדיין לא הוגדר בשרת. נסו שוב מאוחר יותר.',
      },
    };
  }

  const validation = validateContactBody(body);
  if (!validation.ok) {
    return { status: 400, json: { ok: false, error: validation.error } };
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

  const { logoSrc } = await resolveEmailLogo(siteUrl);
  const autoReplyHtml = buildAutoReplyHtml({ name, siteUrl, instagramUrl, logoSrc });
  const leadHtml = buildLeadNotificationHtml({
    name,
    phone,
    email,
    siteUrl,
    instagramUrl,
    logoSrc,
  });

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
    });

    if (autoReplyResult.error) {
      throw new Error(autoReplyResult.error.message);
    }

    return { status: 200, json: { ok: true } };
  } catch (err) {
    console.error('[contact] send failed:', err);

    return {
      status: 500,
      json: {
        ok: false,
        error: 'לא הצלחנו לשלוח את הטופס. נסו שוב או צרו קשר בטלפון.',
      },
    };
  }
}
