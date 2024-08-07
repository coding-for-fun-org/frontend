import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

import { useToast } from '@/elements/root/toast/toast-provider'

import { useDictionary } from '@/contexts/root/dictionary-provider/dictionary-provider'

import { githubService } from '@/services/root/github'

import type { EPullRequestType } from '@/types/github/root/index'
import type { PullReviewResponse } from '@/types/github/root/server'

import type { ICheckedPull } from './types'

interface IError {
  repo: string
  pullTitle: string
}

export const useSubmitForm = () => {
  const { translate } = useDictionary()
  const { pushToast } = useToast()
  const [progressData, setProgressData] = useState<
    | {
        isRunning: true
        value: number
      }
    | {
        isRunning: false
        value?: never
      }
  >({ isRunning: false })
  const mutationReviews = useMutation<
    PullReviewResponse[],
    IError[],
    {
      checkedPulls: ICheckedPull[]
      reviewType: EPullRequestType
      comment: string
    }
  >({
    mutationFn: async (params) => {
      const progressIncreaseValue = 100 / params.checkedPulls.length

      setProgressData({ isRunning: true, value: 0 })

      return Promise.allSettled(
        params.checkedPulls.map((checkedPull) =>
          githubService
            .reviewPullRequest(
              checkedPull.owner,
              checkedPull.repo,
              checkedPull.pullNumber,
              {
                reviewType: params.reviewType,
                comment: params.comment
              }
            )
            .finally(() => {
              setProgressData((prev) => {
                const value = prev.value! + progressIncreaseValue

                return {
                  isRunning: true,
                  value: value > 100 ? 100 : value
                }
              })
            })
        )
      ).then((results) => {
        const isAllSuccessful = results.every(
          (item) => item.status === 'fulfilled'
        )

        if (isAllSuccessful) {
          pushToast({
            title: translate('COMMON.TOAST_DEFAULT_SUCCESS_TITLE'),
            variant: 'success'
          })

          return results.map((result) => result.value)
        }

        const errors = results.reduce<IError[]>((accu, item, index) => {
          if (item.status === 'rejected') {
            return accu.concat([
              {
                repo: params.checkedPulls[index]!.repo,
                pullTitle: params.checkedPulls[index]!.pullTitle
              }
            ])
          }

          return accu
        }, [])

        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
        return Promise.reject(errors)
      })
    }
  })

  const reset = () => {
    setProgressData({ isRunning: false })
    mutationReviews.reset()
  }

  return {
    progressData,
    submit: mutationReviews.mutateAsync,
    isLoading: mutationReviews.isPending,
    error: mutationReviews.error,
    reset
  }
}
