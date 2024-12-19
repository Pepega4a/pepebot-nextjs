import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "identify guilds", //email bot applications.commands
        },
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }: any) {
      session.user.id = token.sub;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  pages: {
    signIn: '/auth/discord',
    signOut: '/',
  }
});

export { handler as GET, handler as POST }; 
