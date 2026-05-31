import { postContact } from '../server/contactHandler.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { status, json } = await postContact(req.body);
  return res.status(status).json(json);
}
