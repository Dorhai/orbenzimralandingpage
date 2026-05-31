const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactBody(body) {
  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const phone = typeof body?.phone === 'string' ? body.phone.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim() : '';

  if (!name || name.length < 2) {
    return { ok: false, error: 'נא להזין שם מלא תקין' };
  }
  if (!phone || phone.replace(/\D/g, '').length < 9) {
    return { ok: false, error: 'נא להזין מספר טלפון תקין' };
  }
  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: 'נא להזין כתובת אימייל תקינה' };
  }

  return { ok: true, data: { name, phone, email } };
}
