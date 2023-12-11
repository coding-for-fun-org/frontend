import type { NextResponse } from 'next/server'

export enum ESessionStatus {
  AUTHENTICATED = 'authenticated',
  LOADING = 'loading',
  UNAUTHENTICATED = 'unauthenticated'
}

export type TServerErrorResponse = NextResponse<{
  error: { message: string }
}>
