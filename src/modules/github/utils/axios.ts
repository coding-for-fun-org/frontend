import axios, { type AxiosError, type AxiosRequestConfig } from 'axios'

import { authService } from '@/services/root/auth'
import { urlService } from '@/services/root/url'

import { EAuthErrorReason, ELocalStorageKey } from '@/types/root/index'

import { EProviders } from '@/types/github/root/server'

// Define the structure of a retry queue item
interface IRetryQueueItem {
  resolve: (value?: unknown) => void
  reject: (error?: unknown) => void
  config: AxiosRequestConfig
}

const axiosGithub = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosGithub.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(
      ELocalStorageKey.AUTH_GITHUB_ACCESS_TOKEN
    )

    if (accessToken) {
      config.headers.setContentType('application/json')
      config.headers.setAuthorization(accessToken)
    }

    return config
  },
  (error) => Promise.reject(error)
)

const refreshAndRetryQueue: IRetryQueueItem[] = []

let isRefreshing = false

axiosGithub.interceptors.response.use(
  (response) => response,
  async (error: AxiosError | Error) => {
    if (axios.isAxiosError(error)) {
      const originalRequest = error.config as AxiosRequestConfig

      if (
        error.response?.status === 401 &&
        !originalRequest.url?.startsWith('/api/auth/csrf') &&
        !originalRequest.url?.startsWith('/api/auth/access_token') &&
        !originalRequest.url?.startsWith('/api/auth/refresh_token') &&
        !originalRequest.url?.startsWith('/api/auth/sign_in')
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            refreshAndRetryQueue.push({
              config: originalRequest,
              resolve,
              reject
            })
          })
        }

        isRefreshing = true

        return authService
          .refreshAccessToken(EProviders.GITHUB)
          .then(({ accessToken }) => {
            localStorage.setItem(
              ELocalStorageKey.AUTH_GITHUB_ACCESS_TOKEN,
              accessToken
            )

            isRefreshing = false

            return new Promise((resolve, reject) => {
              axiosGithub(originalRequest)
                .then((response) => resolve(response))
                .catch((_error) => reject(_error))

              refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
                axiosGithub
                  .request(config)
                  .then((response) => resolve(response))
                  .catch((_error) => reject(_error))
              })

              refreshAndRetryQueue.length = 0
            })
          })
          .catch((error) => {
            console.error('error', error)

            isRefreshing = false

            authService
              .signOut(EProviders.GITHUB)
              .then(() => {
                localStorage.removeItem(
                  ELocalStorageKey.AUTH_GITHUB_ACCESS_TOKEN
                )

                location.href = `${
                  location.origin
                }${urlService.github.signIn()}?reason=${
                  EAuthErrorReason.REFRESH_TOKEN_EXPIRED
                }`
              })
              .catch(console.error)
          })
      }
    }

    return Promise.reject(error)
  }
)

export { axiosGithub }
