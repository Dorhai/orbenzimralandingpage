let cachedPublicLogoUrl = undefined;

/** Live site is on www (Vercel); apex often points at GoDaddy with a mismatched SSL cert */
export function normalizeSiteUrl(siteUrl) {
  const trimmed = (siteUrl || '').replace(/\/$/, '');
  try {
    const u = new URL(trimmed);
    if (u.hostname === 'orbenzimrafitnesscoach.com') {
      u.hostname = 'www.orbenzimrafitnesscoach.com';
      return u.origin;
    }
  } catch {
    return trimmed || 'https://www.orbenzimrafitnesscoach.com';
  }
  return trimmed;
}

function logoUrlCandidates(siteUrl) {
  const override = process.env.EMAIL_LOGO_URL?.trim();
  if (override) {
    return [override];
  }

  const normalized = normalizeSiteUrl(siteUrl);
  const raw = (siteUrl || '').replace(/\/$/, '');
  const candidates = [
    `${normalized}/images/email-brand-logo.png`,
    `${raw}/images/email-brand-logo.png`,
    'https://www.orbenzimrafitnesscoach.com/images/email-brand-logo.png',
    // Fallbacks (used only until the new brand logo is deployed)
    `${normalized}/images/email-logo-header.png`,
    `${raw}/images/email-logo-header.png`,
    'https://www.orbenzimrafitnesscoach.com/images/email-logo-header.png',
  ];

  return [...new Set(candidates.filter(Boolean))];
}

async function resolveWorkingPublicLogoUrl(siteUrl) {
  if (cachedPublicLogoUrl !== undefined) {
    return cachedPublicLogoUrl;
  }

  for (const url of logoUrlCandidates(siteUrl)) {
    try {
      const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(4000) });
      if (res.ok) {
        cachedPublicLogoUrl = url;
        return url;
      }
    } catch {
      /* try next candidate */
    }
  }

  cachedPublicLogoUrl = null;
  return null;
}

const DEFAULT_LOGO_URL = 'https://www.orbenzimrafitnesscoach.com/images/email-brand-logo.png';

/**
 * Hosted logo URL for embedding in the email HTML (no MIME attachments).
 * A normal hosted image is loaded by Gmail only when the message is opened — it does not
 * create a downloadable attachment chip the way a CID/file attachment does.
 */
export async function resolveEmailLogo(siteUrl) {
  const workingUrl = await resolveWorkingPublicLogoUrl(siteUrl);
  const logoSrc = workingUrl ?? logoUrlCandidates(siteUrl)[0] ?? DEFAULT_LOGO_URL;
  return { logoSrc };
}
