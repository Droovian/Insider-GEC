import { db } from '@/lib/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions, getServerSession } from 'next-auth'
import { generateRandomUsername } from './generateRandomUsername'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
    error: '/signin'
  },
  providers: [
    
  ],
  callbacks: {
    async jwt({ token, user }) {

      if (user) {
        if (!user.username) {
          const randomUsername = generateRandomUsername();
          
          await db.user.update({
            where: { id: user.id },
            data: { username: randomUsername },
          });

          return {
            ...token,
            username: randomUsername,
          };
        }

        return {
          ...token,
          username: user.username,
        };
      }

      return token;
    },

    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token?.username || 'Anonymous',
          id: token?.sub,
        },
      };
    },
    async redirect() {
      return '/'
    },
  },
}

export const getAuthSession = () => getServerSession(authOptions)