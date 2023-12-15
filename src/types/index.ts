import type { getDictionary } from '@/dictionaries/root/index'
import type { NextResponse } from 'next/server'

export type PromiseReturnType<T> = T extends Promise<infer U> ? U : T

export enum ESessionStatus {
  AUTHENTICATED = 'authenticated',
  LOADING = 'loading',
  UNAUTHENTICATED = 'unauthenticated'
}

export type TServerErrorResponse = NextResponse<{
  error: { message: string }
}>

export type TDictionary = PromiseReturnType<ReturnType<typeof getDictionary>>
