import { getHighestColumnsLength } from './utils'

describe('Table utils', () => {
  describe('getHighestColumnsLength', () => {
    it('should return 1 if headers param is empty', () => {
      const headers: never[] = []

      expect(getHighestColumnsLength(headers)).toBe(1)
    })

    it('should return 1 if there is no column', () => {
      const headers = [
        {
          items: []
        },
        {
          items: []
        }
      ]

      // @ts-expect-error - I don't care about the type of items
      expect(getHighestColumnsLength(headers)).toBe(1)
    })

    it('should return max column length', () => {
      const headers = [
        {
          items: [1, 2, 3]
        },
        {
          items: [1, 2, 3, 4]
        },
        {
          items: [1, 2]
        }
      ]

      // @ts-expect-error - I don't care about the type of items
      expect(getHighestColumnsLength(headers)).toBe(4)
    })
  })
})
