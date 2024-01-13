import { dictionary } from '@/dictionaries/root/en'

import {
  findTargetDictionaryValue,
  replaceDynamicText,
  translate
} from './utils'

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
          { NAME: 'John Doe', AGE: '30' },
          "I am {{NAME}}. My name is {{NAME}}. I'm {{AGE}} years old"
        )
      ).toBe("I am John Doe. My name is John Doe. I'm 30 years old")
    })
  })

  describe('translate', () => {
    it('should translate as expected', () => {
      expect(translate(dictionary, 'COMMON.APP_NAME')).toBe('Coding For Fun')
      expect(
        translate(
          dictionary,
          'GITHUB.PULL_REVIEW_FORM_SUBMIT_DESCRIPTION_REPO',
          {
            repoName: 'Test Repo'
          }
        )
      ).toBe('- Repository Name: Test Repo')
      expect(
        translate(
          dictionary,
          'GITHUB.PULL_REVIEW_FORM_SUBMIT_DESCRIPTION_PULL',
          {
            pullTitle: 'Test Pull'
          }
        )
      ).toBe('- Pull Request Title: Test Pull')
    })
  })
})
