import httpErrors from 'http-errors'
import { NextResponse } from 'next/server'

import type { TErrorResponse } from '@/types/root/server'

export const createHttpError = (statusCode: number, error?: unknown) => {
  const parsedError = {
    title: error.response.data.message,
    descriptions: error.response.data.documentation_url
  }

  return httpErrors(statusCode ?? 400, parsedError ?? 'Not Found')
}

export const handleHttpErrorResponse = (error: unknown): TErrorResponse => {
  if (httpErrors.isHttpError(error)) {
    return NextResponse.json({ error: error }, { status: error.status })
  }

  const error400 = createHttpError(400)

  return NextResponse.json({ error: error }, { status: error400.status })
}
