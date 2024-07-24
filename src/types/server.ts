import type { NextResponse } from 'next/server'

export type TErrorResponse = NextResponse<{
  error: {
    title: string
    descriptions?: string
  }
}>
