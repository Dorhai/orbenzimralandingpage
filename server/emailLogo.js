import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { agentLog } from './debugLog.js';

/** Alphanumeric only — Gmail is picky about CID values with hyphens */
export const EMAIL_LOGO_CID = 'orbenzimalogo';

const imagesDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
  'images',
);

const logoPath = path.join(imagesDir, 'email-logo.png');

let publicLogoUrlOk = null;

function publicLogoUrl(siteUrl) {
  const override = process.env.EMAIL_LOGO_URL?.trim();
  if (override) {
    return override;
  }
  return `${siteUrl.replace(/\/$/, '')}/images/email-logo.png`;
}

async function isPublicLogoReachable(siteUrl) {
  if (publicLogoUrlOk !== null) {
    return publicLogoUrlOk;
  }

  const url = publicLogoUrl(siteUrl);
  try {
    const res = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(4000) });
    publicLogoUrlOk = res.ok;
  } catch {
    publicLogoUrlOk = false;
  }

  return publicLogoUrlOk;
}

function buildCidAttachment() {
  if (!fs.existsSync(logoPath)) {
    return null;
  }

  const raw = fs.readFileSync(logoPath);
  return {
    filename: 'logo.png',
    content: raw.toString('base64'),
    contentType: 'image/png',
    contentId: EMAIL_LOGO_CID,
  };
}

/**
 * Prefer a public HTTPS logo URL (embedded in HTML, no attachment chip in Gmail).
 * Fall back to CID inline attachment when the image is not deployed yet.
 */
export async function resolveEmailLogo(siteUrl) {
  const url = publicLogoUrl(siteUrl);
  const usePublicUrl = await isPublicLogoReachable(siteUrl);

  if (usePublicUrl) {
    // #region agent log
    agentLog({
      location: 'server/emailLogo.js:resolveEmailLogo',
      message: 'using public logo URL in HTML',
      hypothesisId: 'H-F',
      runId: 'post-fix-v2',
      data: { strategy: 'url', logoUrl: url, attachments: 0 },
    });
    // #endregion

    return { logoSrc: url, attachments: undefined };
  }

  const attachment = buildCidAttachment();
  const logoSrc = attachment ? `cid:${EMAIL_LOGO_CID}` : url;

  // #region agent log
  agentLog({
    location: 'server/emailLogo.js:resolveEmailLogo',
    message: 'using CID inline logo fallback',
    hypothesisId: 'H-A,H-B,H-G',
    runId: 'post-fix-v2',
    data: {
      strategy: 'cid',
      logoSrc,
      contentId: attachment?.contentId ?? null,
      publicUrlChecked: url,
      publicUrlOk: false,
      attachments: attachment ? 1 : 0,
    },
  });
  // #endregion

  return {
    logoSrc,
    attachments: attachment ? [attachment] : undefined,
  };
}

export function getEmailLogoSrc() {
  return `cid:${EMAIL_LOGO_CID}`;
}
