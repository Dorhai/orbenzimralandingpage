import 'dotenv/config';
import { Resend } from 'resend';
import { siteContent } from '../src/data/siteContent.js';
import { normalizeSiteUrl } from './emailLogo.js';

const resendApiKey = process.env.RESEND_API_KEY?.trim();
export const mailConfigured = Boolean(resendApiKey);

export const siteUrl = normalizeSiteUrl(
  process.env.SITE_URL || 'https://www.orbenzimrafitnesscoach.com',
);

export const fromEmail =
  process.env.CONTACT_FROM_EMAIL?.trim() || siteContent.contact.email;
export const toEmail =
  process.env.CONTACT_TO_EMAIL?.trim() || siteContent.contact.email;

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

export const instagramUrl = resolveInstagramUrl();

export const resend = mailConfigured ? new Resend(resendApiKey) : null;
export const fromAddress = `${siteContent.gym.name} <${fromEmail}>`;
