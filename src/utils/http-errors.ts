import httpErrors from 'http-errors'
import { NextResponse } from 'next/server'

import type { TErrorResponse } from '@/types/root/server'

export const createHttpError = (statusCode: number, message?: string) => {
  if (message === undefined) {
    return httpErrors(statusCode ?? 400)
  }

  return httpErrors(statusCode ?? 400, message)
}

export const createHttpErrorCustom = (error: unknown) => {
  if (error) {
    const statusCode = error.response.data.status

    return httpErrors(statusCode, error)
  }
}

export const handleHttpErrorResponse = (error: unknown): TErrorResponse => {
  if (httpErrors.isHttpError(error)) {
    return NextResponse.json(
      {
        error: {
          title: error.response.data.message,
          descriptions: error.response.data.documentation_url,
          statusCode: error.response.data.status
        }
      },
      { status: error.response.data.status }
    )
  }

  const error400 = createHttpError(400)

  return NextResponse.json(
    { error: { descriptions: error400.message } },
    { status: error400.status }
  )
}
