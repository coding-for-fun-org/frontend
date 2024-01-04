import { render, screen } from '@/utils/root/test/testing-library'

import { useDictionary } from './dictionary-provider'

describe('useDictionary', () => {
  it('should translate as expected', () => {
    const TestComponent = () => {
      const { translate } = useDictionary()

      return (
        <div>
          <div>{translate('COMMON.APP_NAME')}</div>
          <div>
            {translate('TOAST.COMMON.PULL_REVIEW_SUBMIT_DESCRIPTION_REPO', {
              repoName: 'Test Repo'
            })}
          </div>
          <div>
            {translate('TOAST.COMMON.PULL_REVIEW_SUBMIT_DESCRIPTION_PULL', {
              pullTitle: 'Test Pull'
            })}
          </div>
        </div>
      )
    }

    render(<TestComponent />)

    expect(screen.getByText(/Coding For Fun/)).toBeInTheDocument()
    expect(screen.getByText(/- Repository Name: Test Repo/)).toBeInTheDocument()
    expect(
      screen.getByText(/- Pull Request Title: Test Pull/)
    ).toBeInTheDocument()
  })
})
