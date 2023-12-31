import type { NextResponse } from 'next/server'

export type TErrorResponse = NextResponse<{
  error: { message: string }
}>
