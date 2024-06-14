import logger from '@/services/logger';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
// import { NextRequest, NextResponse } from 'next/server';

const handler = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, {
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
        async authorize(credentials) {
          // async authorize(credentials) {
          try {
            const reslogin = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`, {
              method: 'POST',
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
              headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
              },
            });
            // console.log('Respuesta Server', res);
            const user = await reslogin.json();

            const backToken = user?.token;

            cookies().set(process.env.BACKEND_JWT_TOKEN_NAME || 'token', backToken, {
              maxAge: 60 * 60 * 24 * 7, // 1 week
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              domain: 'localhost',
              path: '/',
            });
            // res.setHeader('Set-Cookie', 'my_cookie=value');

            // setCookie(process.env.BACKEND_JWT_TOKEN_NAME || 'token', MYTOKEN, {
            //   req,
            //   res,
            //   maxAge: 60 * 60 * 24 * 7, // 1 week
            //   httpOnly: true,
            //   secure: process.env.NODE_ENV === 'production',
            //   sameSite: 'strict',
            //   path: '/',
            // });
            console.log('token set');
            if (user.error) throw user.error;

            logger.info(`NextAuth success for ${credentials?.email}`);
            return user;
          } catch (ex) {
            logger.error(`NextAuth failed for ${credentials?.email}: ${ex}`);
            throw new Error('Error when logging in');
          }
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
          // console.log('Token: ', token);
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
