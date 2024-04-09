import { db } from '@/lib/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { nanoid } from 'nanoid'
import { NextAuthOptions, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import  CredentialsProvider  from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'
import { redirect } from 'next/navigation'
import { getUserById } from '../../data/user'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
  },
  providers: [
    CredentialsProvider({

      name: "Credentials",
    
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        
        if(!credentials?.email || !credentials?.password){
          return null;
        }
        
        const existingUser = await db.user.findUnique({
          where:{
            email: credentials?.email
          }
        });

        if(!existingUser){
          return null;
        }

        const passwordMatch = await compare(credentials.password, existingUser.password || '');

        if(!passwordMatch){
          return null;
        }

        return {
          id: `${existingUser.id}`,
          username: existingUser.username,
          email: existingUser.email,
        }
      }
    }),
  ],
  callbacks: {
    async signIn({ user, account }): Promise<any> {
      const existingUser = await getUserById(user.id);
    
      if (!existingUser?.emailVerified) {
        return false;
      }

      return true;
    },
    async jwt({ token, user }) {
      // console.log(token, 'userDATA'+user);
      if(user){
        return {
          ...token,
          username: user.username
        }
      }
      return token
    },

    async session({ token, session }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          id: token?.sub
        }
      }
      return session;
    },
    redirect() {
      return '/'
    },
  },
}

export const getAuthSession = () => getServerSession(authOptions)