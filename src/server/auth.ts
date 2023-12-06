import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { getServerSession, type NextAuthOptions } from "next-auth";

import { db } from "~/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session {
    provider: "" | "github";
    name: string | undefined | null;
    email: string | undefined | null;
    image: string | undefined | null;
    accessToken: string | undefined | null;
    refreshToken: string | undefined | null;
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ token }) => token,
    async jwt({ token, user, account }) {
      // user & account is not undefined only after sign in
      if (!(user && account)) {
        return token;
      }

      switch (account.provider) {
        case "github": {
          return {
            provider: account.provider,
            name: user.name,
            email: user.email,
            image: user.image,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
          };
        }

        default: {
          return {
            provider: "",
            name: user.name,
            email: user.email,
            image: user.image,
            accessToken: "",
            refreshToken: "",
          };
        }
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    // 60 seconds * 60 minutes * 24 hours * 30 days
    maxAge: 60 * 60 * 24 * 30,
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
          scope: "read:user user:email read:org repo",
        },
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
