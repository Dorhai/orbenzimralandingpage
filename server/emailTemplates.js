const BRAND_RED = '#DC2626';
const BRAND_BLACK = '#0A0A0A';
const BRAND_TEXT = '#FAFAFA';
const DEFAULT_INSTAGRAM = 'https://www.instagram.com/or_benzimra/';

const LOGO_HEADER_HEIGHT = 275;

function logoHeaderRow(logoSrc) {
  return `
    <tr>
      <td align="center" style="background:#ffffff;padding:0;line-height:0;mso-line-height-rule:exactly;font-size:0;">
        <!--[if mso]>
        <img
          src="${logoSrc}"
          alt="Or Ben Zimra Fitness Coach"
          width="600"
          height="${LOGO_HEADER_HEIGHT}"
          style="display:block;width:600px;height:${LOGO_HEADER_HEIGHT}px;border:0;outline:none;text-decoration:none;"
        />
        <![endif]-->
        <!--[if !mso]><!-->
        <div
          role="img"
          aria-label="Or Ben Zimra Fitness Coach"
          style="width:100%;max-width:600px;height:${LOGO_HEADER_HEIGHT}px;margin:0 auto;background:#ffffff url('${logoSrc}') no-repeat center top;background-size:100% auto;"
        ></div>
        <!--<![endif]-->
      </td>
    </tr>
  `;
}

function footerBlock(instagramUrl, siteUrl) {
  const instagram = (instagramUrl?.trim() || DEFAULT_INSTAGRAM);
  const site = siteUrl?.replace(/\/$/, '') || 'https://www.orbenzimrafitnesscoach.com';
  const siteLabel = site.replace(/^https?:\/\//, '');

  return `
    <tr>
      <td align="center" dir="rtl" style="background:#f7f7f7;padding:20px;border-top:1px solid #e5e5e5;direction:rtl;text-align:center;">
        <p align="center" dir="rtl" style="margin:0 0 10px;font-size:14px;color:#666;direction:rtl;text-align:center;">
          רוצים לראות עוד תוצאות, טיפים ותוכן יומי?
        </p>
        <a
          href="${instagram}"
          target="_blank"
          style="font-size:15px;font-weight:700;color:#e1306c;text-decoration:none;"
        >Instagram</a>
        <p style="margin:12px 0 0;font-size:13px;color:#888;direction:ltr;text-align:center;">
          <a href="${site}" style="color:#888;text-decoration:none;">${siteLabel}</a>
        </p>
      </td>
    </tr>
  `;
}

function wrapEmail({ siteUrl, instagramUrl, bodyRows, logoSrc }) {
  return `<!DOCTYPE html>
<html lang="he" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>אור בן זימרה</title>
</head>
<body dir="ltr" style="margin:0;padding:0;background:#ffffff;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" dir="ltr" style="background:#ffffff;">
    <tr>
      <td align="center" style="padding:0;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" dir="rtl" style="width:100%;max-width:600px;background:#ffffff;direction:rtl;">
          ${logoHeaderRow(logoSrc)}
          ${bodyRows}
          ${footerBlock(instagramUrl, siteUrl)}
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

const RTL_CELL = 'direction:rtl;text-align:right;unicode-bidi:embed;';
const RTL_BLOCK = 'direction:rtl;text-align:right;unicode-bidi:embed;';

export function buildAutoReplyHtml({ name, siteUrl, instagramUrl, logoSrc }) {
  const instagram = instagramUrl?.trim() || DEFAULT_INSTAGRAM;
  const site = siteUrl?.replace(/\/$/, '') || 'https://www.orbenzimrafitnesscoach.com';
  const siteLabel = site.replace(/^https?:\/\//, '');
  const safeName = escapeHtml(name);

  return `<!DOCTYPE html>
<html lang="he" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>אור בן זמרה - מאמן כושר אונליין</title>
</head>
<body dir="ltr" style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#222;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" dir="ltr" style="background:#ffffff;">
    <tr>
      <td align="center" style="padding:0;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" dir="rtl" style="width:100%;max-width:600px;background:#ffffff;direction:rtl;">
          ${logoHeaderRow(logoSrc)}
          <tr>
            <td align="right" dir="rtl" style="padding:36px 32px 32px;${RTL_CELL}">
              <h2 align="right" dir="rtl" style="margin:0 0 22px;font-size:22px;line-height:1.5;font-weight:700;color:#111;${RTL_BLOCK}">
                &#x202B;שלום ${safeName},&#x202C;
              </h2>
              <p align="right" dir="rtl" style="margin:0 0 18px;font-size:17px;line-height:1.9;color:#333;${RTL_BLOCK}">
                &#x202B;תודה על הפנייה ועל ההתעניינות בליווי האונליין שלי.&#x202C;
              </p>
              <p align="right" dir="rtl" style="margin:0 0 18px;font-size:17px;line-height:1.9;color:#333;${RTL_BLOCK}">
                &#x202B;קיבלתי את הפרטים שלך ואחזור אליך בהקדם האפשרי כדי להבין את המטרה שלך
                ולבדוק איך נוכל להתחיל לבנות עבורך תוכנית שמתאימה בדיוק לך.&#x202C;
              </p>
              <p align="right" dir="rtl" style="margin:28px 0 8px;font-size:17px;line-height:1.8;color:#333;${RTL_BLOCK}">
                &#x202B;בברכה,&#x202C;
              </p>
              <p align="right" dir="rtl" style="margin:0;font-size:18px;line-height:1.6;font-weight:700;color:#111;${RTL_BLOCK}">
                &#x202B;אור בן זמרה&#x202C;
              </p>
              <p align="right" dir="rtl" style="margin:4px 0 0;font-size:15px;color:#777;${RTL_BLOCK}">
                &#x202B;מאמן כושר אונליין&#x202C;
              </p>
            </td>
          </tr>
          <tr>
            <td align="center" dir="rtl" style="background:#f7f7f7;padding:20px;border-top:1px solid #e5e5e5;direction:rtl;text-align:center;">
              <p style="margin:0 0 12px;font-size:14px;color:#666;direction:rtl;text-align:center;">
                רוצים לראות עוד תוצאות, טיפים ותוכן יומי?
              </p>
              <a
                href="${instagram}"
                target="_blank"
                style="font-size:15px;font-weight:700;color:#e1306c;text-decoration:none;"
              >Instagram</a>
              <p style="margin:12px 0 0;font-size:13px;color:#888;direction:ltr;text-align:center;">
                <a href="${site}" style="color:#888;text-decoration:none;">${siteLabel}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function buildLeadNotificationHtml({ name, phone, email, siteUrl, instagramUrl, logoSrc }) {
  const bodyRows = `
    <tr>
      <td align="right" dir="rtl" style="padding:28px 32px;font-family:Arial,Helvetica,sans-serif;color:#18181b;line-height:1.6;direction:rtl;text-align:right;">
        <p align="right" dir="rtl" style="margin:0 0 12px;font-size:18px;font-weight:bold;direction:rtl;text-align:right;">&#x202B;ליד חדש מהאתר&#x202C;</p>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" dir="rtl" style="font-size:15px;direction:rtl;">
          <tr><td align="right" dir="rtl" style="padding:8px 0;border-bottom:1px solid #e4e4e7;text-align:right;"><strong>שם:</strong> ${escapeHtml(name)}</td></tr>
          <tr><td align="right" dir="rtl" style="padding:8px 0;border-bottom:1px solid #e4e4e7;text-align:right;"><strong>טלפון:</strong> <span dir="ltr">${escapeHtml(phone)}</span></td></tr>
          <tr><td align="right" dir="rtl" style="padding:8px 0;text-align:right;"><strong>אימייל:</strong> <span dir="ltr">${escapeHtml(email)}</span></td></tr>
        </table>
      </td>
    </tr>
  `;

  return wrapEmail({ siteUrl, instagramUrl, bodyRows, logoSrc });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
