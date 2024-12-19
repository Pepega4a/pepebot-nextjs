import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = encodeURIComponent('http://localhost:3000/api/auth/callback/discord');
  const scope = encodeURIComponent('bot+applications.commands');
  const discordUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&permissions=8&response_type=code&redirect_uri=${redirectUri}&integration_type=0&scope=${scope}`;
  return NextResponse.redirect(discordUrl);
}