// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from 'next-auth/jwt'

/**
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
  interface Session {
    user: {
      name: string | undefined | null
      email: string | undefined | null
      image: string | undefined | null
    }

    token: {
      provider: 'github' | undefined | null
      accessToken: string | undefined | null
      accessTokenExpires: number | undefined | null
      refreshToken: string | undefined | null
    }
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    name?: string | null
    email?: string | null
    image?: string | null
    provider?: '' | 'github'
    accessToken?: string | undefined
    accessTokenExpires?: number | undefined
    refreshToken?: string | undefined
  }
}
