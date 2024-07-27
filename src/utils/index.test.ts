import {
  createIdGenerator,
  isObjectLike,
  isPlainObject,
  isString
} from '@/utils/root/index'

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

  describe('isString', () => {
    it('should return true when value is string', () => {
      expect(isString('')).toBe(true)
      expect(isString('abc')).toBe(true)
    })

    it('should return false when value is not string', () => {
      expect(isString(null)).toBe(false)
      expect(isString(undefined)).toBe(false)
      expect(isString(0)).toBe(false)
      expect(isString({})).toBe(false)
      expect(isString([])).toBe(false)
      expect(isString(true)).toBe(false)
    })
  })

  describe('isObjectLike', () => {
    it('should return true when value is object like', () => {
      expect(isObjectLike({})).toBe(true)
      expect(isObjectLike([])).toBe(true)
    })

    it('should return false when value is not object like', () => {
      expect(isObjectLike(null)).toBe(false)
      expect(isObjectLike(undefined)).toBe(false)
      expect(isObjectLike(0)).toBe(false)
      expect(isObjectLike('')).toBe(false)
      expect(isObjectLike(true)).toBe(false)
    })
  })

  describe('isPlainObject', () => {
    it('should return true when value is plain object', () => {
      expect(isPlainObject({})).toBe(true)
      expect(isPlainObject({ a: 1 })).toBe(true)
      expect(isPlainObject({ a: { b: 2 } })).toBe(true)
    })

    it('should return false when value is not plain object', () => {
      expect(isPlainObject([])).toBe(false)
      expect(isPlainObject(null)).toBe(false)
      expect(isPlainObject(undefined)).toBe(false)
      expect(isPlainObject(0)).toBe(false)
      expect(isPlainObject('')).toBe(false)
      expect(isPlainObject(true)).toBe(false)
    })
  })
})
