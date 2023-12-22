import { createIdGenerator } from '@/utils/root/index'

describe('index', () => {
  describe('createIdGenerator', () => {
    it('should create id generator (when initial number is not passed, it should starts from 0)', () => {
      const idGenerator = createIdGenerator()

      expect(idGenerator()).toBe(0)
      expect(idGenerator()).toBe(1)
      expect(idGenerator()).toBe(2)
      expect(idGenerator()).toBe(3)
    })

    it('should create id generator (when initial number is passed)', () => {
      const idGenerator = createIdGenerator(6)

      expect(idGenerator()).toBe(6)
      expect(idGenerator()).toBe(7)
      expect(idGenerator()).toBe(8)
      expect(idGenerator()).toBe(9)
    })
  })
})
