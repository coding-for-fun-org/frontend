import { render, screen } from '@/utils/root/test/testing-library'

import { Avatar } from './avatar'

describe('Avatar', () => {
  const FALLBACK_TEXT = 'AZ'
  const IMAGE_SRC =
    'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

  it('should set img src and fallback', () => {
    render(<Avatar src={IMAGE_SRC} fallback={FALLBACK_TEXT} />)

    const img = screen.getByRole('img', { name: FALLBACK_TEXT })

    expect(img).toBeInTheDocument()

    expect(img).toHaveAttribute(
      'src',
      expect.stringMatching(new RegExp(encodeURIComponent(IMAGE_SRC)))
    )
  })

  it('should set className', () => {
    const TEST_CLASS = 'TEST-CLASS'

    render(
      <Avatar
        data-testid="avatar-root"
        className={TEST_CLASS}
        src={IMAGE_SRC}
        fallback={FALLBACK_TEXT}
      />
    )

    expect(screen.getByTestId('avatar-root')).toHaveClass(TEST_CLASS)
  })
})
