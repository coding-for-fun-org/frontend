import { type OctokitResponse, type RequestOptions } from '@octokit/types'
import type { NextResponse } from 'next/server'

export type TErrorResponse = NextResponse<{
  error: {
    title: string
    descriptions?: string
  }
}>

// https://github.com/octokit/request-error.js/blob/main/src/types.ts
// error types from octokit.request
export type TOctokitRequestError = {
  response?: OctokitResponse<unknown>
  request: RequestOptions
}
