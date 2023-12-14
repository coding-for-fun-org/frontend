import * as nextAuthReact from 'next-auth/react'

import { render, screen } from '@/utils/root/test/testing-library'

import { ESessionStatus } from '@/types/root/index'

import { SignButton } from './SignButton'

describe('SignButton', () => {
  it('should render "loading..." when the status is ESessionStatus.LOADING', () => {
    // @ts-expect-error - I only need to mock the status property
    jest.spyOn(nextAuthReact, 'useSession').mockImplementation(() => ({
      status: ESessionStatus.LOADING
    }))

    const { unmount } = render(<SignButton />)

    expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument()

    unmount()
  })

  it('should render "log out" when the status is ESessionStatus.AUTHENTICATED', () => {
    // @ts-expect-error - I only need to mock the status property
    jest.spyOn(nextAuthReact, 'useSession').mockImplementation(() => ({
      status: ESessionStatus.AUTHENTICATED
    }))

    const { unmount } = render(<SignButton />)

    expect(screen.getByText(/log out/i)).toBeInTheDocument()

    unmount()
  })

  it('should render "log in" when the status is ESessionStatus.UNAUTHENTICATED', () => {
    // @ts-expect-error - I only need to mock the status property
    jest.spyOn(nextAuthReact, 'useSession').mockImplementation(() => ({
      status: ESessionStatus.UNAUTHENTICATED
    }))

    const { unmount } = render(<SignButton />)

    expect(screen.getByText(/log in/i)).toBeInTheDocument()

    unmount()
  })
})
