const BRAND_RED = '#DC2626';
const BRAND_BLACK = '#0A0A0A';
const BRAND_TEXT = '#FAFAFA';

function logoBlock(siteUrl) {
  const logoUrl = `${siteUrl.replace(/\/$/, '')}/images/email-logo.png`;

  return `
    <tr>
      <td align="center" style="padding:32px 24px 20px;background:${BRAND_BLACK};">
        <img
          src="${logoUrl}"
          alt="OR BEN ZIMRA — FITNESS COACH"
          width="320"
          style="display:block;max-width:320px;width:100%;height:auto;border:0;margin:0 auto;"
        />
      </td>
    </tr>
  `;
}

function footerBlock(instagramUrl, siteUrl) {
  const instagram = instagramUrl?.trim() || '';
  const site = siteUrl?.replace(/\/$/, '') || '';

  return `
    <tr>
      <td align="center" style="padding:24px;background:#f4f4f5;border-top:1px solid #e4e4e7;">
        ${
          instagram
            ? `<p style="margin:0 0 12px;font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#52525b;">
                עקבו אחריי באינסטגרם:
              </p>
              <a
                href="${instagram}"
                style="display:inline-block;font-family:Arial,Helvetica,sans-serif;font-size:14px;font-weight:bold;color:${BRAND_RED};text-decoration:none;"
              >Instagram</a>`
            : ''
        }
        ${
          site
            ? `<p style="margin:16px 0 0;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#71717a;">
                <a href="${site}" style="color:#71717a;text-decoration:underline;">${site.replace(/^https?:\/\//, '')}</a>
              </p>`
            : ''
        }
      </td>
    </tr>
  `;
}

function wrapEmail({ siteUrl, instagramUrl, bodyRows }) {
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>אור בן זימרה</title>
</head>
<body style="margin:0;padding:0;background:#e4e4e7;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#e4e4e7;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;">
          ${logoBlock(siteUrl)}
          ${bodyRows}
          ${footerBlock(instagramUrl, siteUrl)}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildAutoReplyHtml({ name, siteUrl, instagramUrl }) {
  const bodyRows = `
    <tr>
      <td style="padding:32px 28px 28px;font-family:Arial,Helvetica,sans-serif;color:#18181b;line-height:1.7;">
        <p style="margin:0 0 16px;font-size:18px;font-weight:bold;">שלום ${escapeHtml(name)},</p>
        <p style="margin:0 0 16px;font-size:16px;">
          תודה על הפנייה ועל ההתעניינות!
        </p>
        <p style="margin:0 0 16px;font-size:16px;">
          קיבלנו את הפרטים שלך ונחזור אליך בהקדם האפשרי.
        </p>
        <p style="margin:0;font-size:16px;">
          בברכה,<br />
          <strong>אור בן זימרה</strong><br />
          <span style="color:#52525b;">מאמן כושר אישי</span>
        </p>
      </td>
    </tr>
  `;

  return wrapEmail({ siteUrl, instagramUrl, bodyRows });
}

export function buildLeadNotificationHtml({ name, phone, email, siteUrl, instagramUrl }) {
  const bodyRows = `
    <tr>
      <td style="padding:28px;font-family:Arial,Helvetica,sans-serif;color:#18181b;line-height:1.6;">
        <p style="margin:0 0 12px;font-size:18px;font-weight:bold;">ליד חדש מהאתר</p>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size:15px;">
          <tr><td style="padding:8px 0;border-bottom:1px solid #e4e4e7;"><strong>שם:</strong> ${escapeHtml(name)}</td></tr>
          <tr><td style="padding:8px 0;border-bottom:1px solid #e4e4e7;"><strong>טלפון:</strong> <span dir="ltr">${escapeHtml(phone)}</span></td></tr>
          <tr><td style="padding:8px 0;"><strong>אימייל:</strong> <span dir="ltr">${escapeHtml(email)}</span></td></tr>
        </table>
      </td>
    </tr>
  `;

  return wrapEmail({ siteUrl, instagramUrl, bodyRows });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
