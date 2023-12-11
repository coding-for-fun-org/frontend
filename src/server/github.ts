import { createAppAuth } from '@octokit/auth-app'
import { Octokit } from '@octokit/core'

export const getOctokitWithAccessToken = (accessToken: string): Octokit =>
  new Octokit({ auth: accessToken })

export const getOctokitWithInstallationId = (installationId: string): Octokit =>
  new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: +process.env.GITHUB_APP_ID,
      privateKey: process.env.GITHUB_PRIVATE_KEY,
      installationId: +installationId
    }
  })
