import { render, screen } from '@/utils/root/test/testing-library'

import { Avatar } from './avatar'

describe('Avatar', () => {
  it('should set img src and fallback', () => {
    const FALLBACK_TEXT = 'AZ'
    const IMAGE_SRC =
      'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'

    render(<Avatar src={IMAGE_SRC} fallback={FALLBACK_TEXT} />)

    const img = screen.getByRole('img', { name: FALLBACK_TEXT })

    expect(img).toBeInTheDocument()

    expect(img).toHaveAttribute(
      'src',
      expect.stringMatching(new RegExp(encodeURIComponent(IMAGE_SRC)))
    )
  })
})
