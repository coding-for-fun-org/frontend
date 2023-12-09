import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { getServerSession } from 'next-auth'
import type { NextAuthOptions } from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

import { db } from '@/server/root/db'

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        name: token.name,
        email: token.email,
        image: token.image
      },
      token: {
        provider: token.provider,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken
      }
    }),
    async jwt({ token, user, account }) {
      // user & account is not undefined only after sign in
      if (!(user && account)) {
        return token
      }

      switch (account.provider) {
        case 'github': {
          return {
            provider: account.provider,
            name: user.name,
            email: user.email,
            image: user.image,
            accessToken: account.access_token,
            refreshToken: account.refresh_token
          }
        }

        default: {
          return {
            provider: '',
            name: user.name,
            email: user.email,
            image: user.image,
            accessToken: '',
            refreshToken: ''
          }
        }
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    // 60 seconds * 60 minutes * 24 hours * 30 days
    maxAge: 60 * 60 * 24 * 30
  },
  adapter: PrismaAdapter(db),
  providers: [
    /**
     * Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers
     */
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          scope: 'read:user user:email read:org repo'
        }
      }
    })
  ]
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions)
