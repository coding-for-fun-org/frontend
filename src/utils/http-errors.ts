import httpErrors from 'http-errors'
import { NextResponse } from 'next/server'

import { isObjectLike, isPlainObject, isString } from '@/utils/root/index'

import type { TErrorResponse } from '@/types/root/server'

export const createHttpError = (
  statusCode: number | undefined = 400,
  error?: Error | string | Record<string, unknown>
) => {
  if (error === undefined) {
    return httpErrors(statusCode)
  }

  return httpErrors(statusCode, error)
}

export const handleHttpErrorResponse = (error: unknown): TErrorResponse => {
  if (httpErrors.isHttpError(error)) {
    if (isObjectLike(error)) {
      if ('response' in error && isPlainObject(error.response)) {
        if ('data' in error.response && isPlainObject(error.response.data)) {
          // there is possibility that this is octokit error
          const errorData = error.response?.data

          if (
            isPlainObject(errorData) &&
            'message' in errorData &&
            isString(errorData.message) &&
            errorData.message.length > 0
          ) {
            const parsedError = {
              title: errorData.message,
              ...('documentation_url' in errorData &&
                isString(errorData.documentation_url) &&
                errorData.documentation_url.length > 0 && {
                  descriptions: errorData.documentation_url
                })
            }

            return NextResponse.json(
              { error: parsedError },
              { status: error.status }
            )
          }
        }
      }
    }

    // if error is not a known error, but it is an http error
    if (error.message && error.message.length > 0) {
      return NextResponse.json(
        { error: { title: error.message } },
        { status: error.status }
      )
    }
  }

  const error400 = createHttpError(400)

  return NextResponse.json(
    { error: { title: error400.message } },
    { status: error400.status }
  )
}
