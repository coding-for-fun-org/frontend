import axios from 'axios'

import type {
  EProviders,
  TAccessTokenResponse,
  TCsrfTokenResponse,
  TRefreshTokenResponse,
  TSignInResponse,
  TSignOutResponse
} from '@/types/github/root/server'

export const authService = {
  async issueCsrfToken(): Promise<TCsrfTokenResponse> {
    return axios
      .get<TCsrfTokenResponse>('/api/auth/csrf')
      .then((response) => response.data)
  },
  async signIn(provider: EProviders): Promise<TSignInResponse> {
    return this.issueCsrfToken()
      .then(({ csrfToken }) =>
        axios.post<TSignInResponse>(`/api/auth/sign_in/${provider}`, {
          csrf_token: csrfToken
        })
      )
      .then((response) => response.data)
  },
  async signOut(provider: EProviders): Promise<TSignOutResponse> {
    return this.issueCsrfToken()
      .then(({ csrfToken }) =>
        axios.post<TSignOutResponse>(`/api/auth/sign_out/${provider}`, {
          csrf_token: csrfToken
        })
      )
      .then((response) => response.data)
  },
  async issueAccessToken(
    provider: EProviders,
    params?: Record<string, string>
  ): Promise<TAccessTokenResponse> {
    const searchParamsString = new URLSearchParams(params).toString()
    const locationSearch = searchParamsString ? `?${searchParamsString}` : ''

    return axios
      .get<TAccessTokenResponse>(
        `/api/auth/access_token/${provider}${locationSearch}`
      )
      .then((response) => response.data)
  },
  async refreshAccessToken(
    provider: EProviders
  ): Promise<TRefreshTokenResponse> {
    return axios
      .get<TRefreshTokenResponse>(`/api/auth/refresh_token/${provider}`)
      .then((response) => response.data)
  }
}
