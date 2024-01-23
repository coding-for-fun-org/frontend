import axios from 'axios'

export const getAccessToken = async (
  urlSearchParams: URLSearchParams
): Promise<{
  accessToken: string
  refreshToken: string
} | null> => {
  try {
    const code = urlSearchParams.get('code')
    const githubAccessTokenResponse = await axios
      .post<string>('https://github.com/login/oauth/access_token', {
        client_id: process.env.GITHUB_ID,
        client_secret: process.env.GITHUB_SECRET,
        code
      })
      .then((response) => response.data)
    const params = new URLSearchParams(githubAccessTokenResponse)
    const accessToken = params.get('access_token')
    const refreshToken = params.get('refresh_token')

    if (!accessToken || !refreshToken) {
      return null
    }

    return { accessToken, refreshToken }
  } catch (_) {
    return null
  }
}
