declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_PAGE_URL: string
      AUTH_SECRET: string
      GITHUB_ID: string
      GITHUB_SECRET: string
      GITHUB_APP_ID: string
      GITHUB_PRIVATE_KEY: string
    }
  }
}

export {}
