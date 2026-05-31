import { resolveEmailLogo } from '../server/emailLogo.js';
import { buildAutoReplyHtml } from '../server/emailTemplates.js';

const siteUrl = process.env.SITE_URL || 'https://orbenzimrafitnesscoach.com';
const { logoSrc, attachments } = await resolveEmailLogo(siteUrl);
const html = buildAutoReplyHtml({
  name: 'Probe',
  siteUrl,
  instagramUrl: 'https://www.instagram.com/or_benzimra/',
  logoSrc,
});

console.log(
  JSON.stringify({
    siteUrl,
    logoSrc,
    attachmentCount: attachments?.length ?? 0,
    contentId: attachments?.[0]?.contentId ?? null,
    usesCidInHtml: html.includes('cid:'),
    usesHttpsInHtml: html.includes('https://'),
  }),
);
