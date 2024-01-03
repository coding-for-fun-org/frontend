import httpErrors from 'http-errors'
import { NextResponse } from 'next/server'

import type { TErrorResponse } from '@/types/root/server'

export const createHttpError = (statusCode: number, message?: string) => {
  if (message === undefined) {
    return httpErrors(statusCode ?? 400)
  }

  return httpErrors(statusCode ?? 400, message)
}

export const handleHttpErrorResponse = (error: unknown): TErrorResponse => {
  if (httpErrors.isHttpError(error)) {
    return NextResponse.json(
      { error: { message: error.message } },
      { status: error.status }
    )
  }

  const error400 = createHttpError(400)

  return NextResponse.json(
    { error: { message: error400.message } },
    { status: error400.status }
  )
}
