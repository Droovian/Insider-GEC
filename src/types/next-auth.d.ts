import NextAuth from "next-auth"

declare module 'next-auth/jwt'{
  interface JWT {
    id: UserId
    username?: string | null
  }
}
declare module "next-auth" {
 
  interface User{
    username: string | null
  }
  interface Session {
    user: User & {
      id: UserId
      username?: string | null
    }
    token:{
        username: string
    }
  }
}