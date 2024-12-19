import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;
  const redirectUri = encodeURIComponent(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/callback/discord`);
  const scope = encodeURIComponent('bot+applications.commands');
  const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=8&response_type=code&redirect_uri=${redirectUri}&integration_type=0&scope=${scope}`;
  return NextResponse.redirect(discordUrl);
}