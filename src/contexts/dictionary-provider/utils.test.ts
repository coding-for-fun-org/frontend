import { findTargetDictionaryValue, replaceDynamicText } from './utils'

describe('DictionaryProvider utils', () => {
  describe('findTargetDictionaryValue', () => {
    it('should return undefined if key is not found', () => {
      expect(
        // @ts-expect-error - for testing purpose
        findTargetDictionaryValue('TEST1.TEST2.TEST3', {
          TEST1: {
            TEST2: 'TEST2'
          }
        })
      ).toBeUndefined()
    })

    it('should return undefined if key is not valid', () => {
      expect(
        // @ts-expect-error - for testing purpose
        findTargetDictionaryValue('TEST1_TEST2', {
          TEST1: {
            TEST2: 'TEST2'
          }
        })
      ).toBeUndefined()
    })

    it('should return target string if key is found', () => {
      // depth 1
      expect(
        // @ts-expect-error - for testing purpose
        findTargetDictionaryValue('TEST2', {
          TEST1: 'HELLO1',
          TEST2: 'HELLO2'
        })
      ).toBe('HELLO2')

      // depth > 1
      expect(
        // @ts-expect-error - for testing purpose
        findTargetDictionaryValue('TEST3.TEST4', {
          TEST1: {
            TEST2: 'HELLO1'
          },
          TEST3: {
            TEST4: 'HELLO2'
          },
          TEST5: 'HELLO3'
        })
      ).toBe('HELLO2')
    })
  })

  describe('replaceDynamicText', () => {
    it('should replace dynamic text', () => {
      expect(
        replaceDynamicText(
          // @ts-expect-error - for testing purpose
          { NAME: 'John Doe', AGE: '30' },
          "I am {{NAME}}. My name is {{NAME}}. I'm {{AGE}} years old"
        )
      ).toBe("I am John Doe. My name is John Doe. I'm 30 years old")
    })
  })
})
