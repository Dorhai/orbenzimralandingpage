import 'dotenv/config';
import { Resend } from 'resend';
import { siteConfig } from './siteConfig.js';
import { normalizeSiteUrl } from './emailLogo.js';

const resendApiKey = process.env.RESEND_API_KEY?.trim();
export const mailConfigured = Boolean(resendApiKey);

export const siteUrl = normalizeSiteUrl(
  process.env.SITE_URL || 'https://www.orbenzimrafitnesscoach.com',
);

export const fromEmail =
  process.env.CONTACT_FROM_EMAIL?.trim() || siteConfig.contactEmail;
export const toEmail =
  process.env.CONTACT_TO_EMAIL?.trim() || siteConfig.contactEmail;

const DEFAULT_INSTAGRAM = 'https://www.instagram.com/or_benzimra/';

function resolveInstagramUrl() {
  const candidates = [
    process.env.INSTAGRAM_URL?.trim(),
    siteConfig.instagramUrl?.trim(),
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
export const fromAddress = `${siteConfig.gymName} <${fromEmail}>`;
