import { db } from '@/lib/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions, getServerSession } from 'next-auth'
import  CredentialsProvider  from 'next-auth/providers/credentials'
import * as z from "zod";
import { compare } from 'bcrypt'
import { getUserById } from '../../data/user'

const LoginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have than 8 characters'),
});

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
    CredentialsProvider({

      name: "Credentials",
    
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {

          if(!credentials?.email || !credentials?.password){
            throw new Error(JSON.stringify({ error: "Credentials are required!" }))
          }

          const validatedData = LoginSchema.safeParse(credentials);


        const passwordMatch = await compare(credentials.password, existingUser.password || '');

          if(!validatedData?.success){
            throw new Error(JSON.stringify({ error: "Invalid Credentials entered!" }))
          }


          const existingUser = await db.user.findUnique({
            where:{
              email: credentials?.email
            }
          });

          if(!existingUser){
            throw new Error(JSON.stringify({ error: "User does not exist!" }))
          }

          const passwordMatch = await compare(credentials.password, existingUser.password || '');

          if(!passwordMatch){
            throw new Error( JSON.stringify({ error: "Password did not match!" }))

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