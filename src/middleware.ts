import { type NextRequest } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    // ignore some of the cases
    // 1. if the pathname is a public file
    // 2. if the pathname starts with /api
    PUBLIC_FILE.test(pathname) ||
    pathname.startsWith('/api')
  ) {
    return
  }

  // do something here
  return
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)'
    // Optional: only run on root (/) URL
    // '/'
  ]
}
