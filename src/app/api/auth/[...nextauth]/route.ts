import NextAuth, { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'micorreo@mail.com' },
        password: { label: 'Password', type: 'password' },
      },
      // async authorize(credentials, req) {
      async authorize(credentials) {
        // console.log({ credentials, req });

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
          method: 'POST',
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: { 'Content-Type': 'application/json' },
        });
        const user = await res.json();

        if (user.error) return null;
        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    // async jwt({ token, account }: { token: JWT; account: Account }): Promise<JWT> {
    //   if (account) {
    //     token.accessToken = account.access_token;
    //   }
    //   return token;
    // },
    async session({ session, token }: { session: Session; token: JWT }): Promise<Session> {
      if (token) {
        console.log('Token: ', token);
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
          token: token.token,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
