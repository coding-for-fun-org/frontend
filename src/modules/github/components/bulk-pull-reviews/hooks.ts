import { useGetInstallations } from '@/queries/github/root/use-installations'

import {
  useGetInstallationsRepositories,
  useGetRepositoryPullRequests
} from './queries'

export const usePullsGroup = () => {
  const { data: installationIds, isLoading: isInstallationsLoading } =
    useGetInstallations<number[]>(({ installations }) =>
      installations.map((installation) => installation.id)
    )
  const {
    data: repositories,
    isPending: isRepositoriesPending,
    isAllLoading: isAllRepositoriesLoading,
    isAllPending: isAllRepositoriesPending
  } = useGetInstallationsRepositories(
    installationIds,
    ({ repositories }) => repositories,
    (responses) => ({
      data: responses.map((response) => response.data),
      isPending:
        isInstallationsLoading ||
        responses.some((response) => response.isPending),
      isAllLoading:
        isInstallationsLoading ||
        responses.every((response) => response.isLoading),
      isAllPending:
        isInstallationsLoading ||
        responses.every((response) => response.isPending)
    })
  )
  const {
    data: pullsGroup,
    isLoading: isPullsGroupLoading,
    isPending: isPullsGroupPending
  } = useGetRepositoryPullRequests(
    !isAllRepositoriesPending && !isAllRepositoriesLoading
      ? repositories.flatMap((repo) => repo)
      : undefined,
    (pulls, repository) => ({
      org: repository.owner.login,
      repo: repository.name,
      repoUrl: repository.html_url,
      pulls: pulls.map((pull) => ({
        pullUrl: pull.html_url,
        state: pull.state,
        number: pull.number,
        title: pull.title,
        baseRef: pull.base.ref,
        headRef: pull.head.ref,
        user: {
          login: pull.user?.login,
          avatarUrl: pull.user?.avatar_url
        }
      }))
    }),
    (responses) => ({
      data: responses.map((response) => response.data),
      isLoading: responses.some((response) => response.isLoading),
      isPending:
        isRepositoriesPending ||
        responses.some((response) => response.isPending)
    })
  )

  return {
    isLoading: isPullsGroupLoading || isPullsGroupPending,
    pullsGroup:
      isPullsGroupLoading || isPullsGroupPending ? undefined : pullsGroup
  }
}
