declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_PAGE_URL: string
      DATABASE_URL: string
      NEXTAUTH_SECRET: string
      NEXTAUTH_URL: string
      GITHUB_ID: string
      GITHUB_SECRET: string
      GITHUB_APP_ID: string
      GITHUB_PRIVATE_KEY: string
    }
  }
}
