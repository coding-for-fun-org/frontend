import axios from 'axios'
import { cookies } from 'next/headers'

import { ECookieKey } from '@/types/root/index'

export const refreshToken = async (): Promise<{
  accessToken: string
  refreshToken: string
} | null> => {
  try {
    const refreshToken = cookies().get(
      ECookieKey.AUTH_GITHUB_REFRESH_TOKEN
    )?.value

    if (!refreshToken) {
      return null
    }

    const githubRefreshTokenResponse = await axios
      .post<string>('https://github.com/login/oauth/access_token', {
        client_id: process.env.GITHUB_ID,
        client_secret: process.env.GITHUB_SECRET,
        grant_type: 'refresh_token',
        refresh_token: refreshToken
      })
      .then((response) => response.data)
    const params = new URLSearchParams(githubRefreshTokenResponse)
    const accessToken = params.get('access_token')
    const newRefreshToken = params.get('refresh_token')

    if (!accessToken || !newRefreshToken) {
      return null
    }

    return { accessToken, refreshToken: newRefreshToken }
  } catch (error) {
    console.error('error', error)
    return null
  }
}
