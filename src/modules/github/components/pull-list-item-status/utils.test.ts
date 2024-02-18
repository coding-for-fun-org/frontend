import { ECheckStatus } from './types'
import { getCheckStatus } from './utils'

describe('PullListItemStatus utils', () => {
  describe('getCheckStatus', () => {
    it('should get undefined if requiredChecksName or checkRuns is undefined', () => {
      expect(getCheckStatus(undefined, undefined)).toBeUndefined()
    })

    it('should not return failed if non-required check is failed', () => {
      const requiredChecksName = ['check1', 'check2']
      const checkRuns = [
        { name: 'check1', status: 'completed', conclusion: 'success' },
        { name: 'check2', status: 'queued', conclusion: null },
        { name: 'check3', status: 'completed', conclusion: 'failed' }
      ]

      expect(
        // @ts-expect-error - don't care of the full data
        getCheckStatus(requiredChecksName, checkRuns)
      ).not.toBe(ECheckStatus.FAILED)
    })

    it('should return failed if at least one of the required checks are not success', () => {
      const requiredChecksName = ['check1', 'check3']
      const checkRuns = [
        { name: 'check1', status: 'completed', conclusion: 'success' },
        { name: 'check2', status: 'queued', conclusion: null },
        { name: 'check3', status: 'completed', conclusion: 'failed' }
      ]

      expect(
        // @ts-expect-error - don't care of the full data
        getCheckStatus(requiredChecksName, checkRuns)
      ).toBe(ECheckStatus.FAILED)
    })

    it('should not return running if non-required checks is in_progress or queued', () => {
      const requiredChecksName = ['check1']
      const checkRuns1 = [
        { name: 'check1', status: 'completed', conclusion: 'success' },
        { name: 'check2', status: 'in_progress', conclusion: null }
      ]

      expect(
        // @ts-expect-error - don't care of the full data
        getCheckStatus(requiredChecksName, checkRuns1)
      ).not.toBe(ECheckStatus.RUNNING)

      const checkRuns2 = [
        { name: 'check1', status: 'completed', conclusion: 'success' },
        { name: 'check2', status: 'queued', conclusion: null }
      ]

      expect(
        // @ts-expect-error - don't care of the full data
        getCheckStatus(requiredChecksName, checkRuns2)
      ).not.toBe(ECheckStatus.RUNNING)
    })

    it('should return running if one of the required checks is in_progress or queued', () => {
      const requiredChecksName = ['check1', 'check2']
      const checkRuns1 = [
        { name: 'check1', status: 'completed', conclusion: 'success' },
        { name: 'check2', status: 'in_progress', conclusion: null }
      ]

      expect(
        // @ts-expect-error - don't care of the full data
        getCheckStatus(requiredChecksName, checkRuns1)
      ).toBe(ECheckStatus.RUNNING)

      const checkRuns2 = [
        { name: 'check1', status: 'completed', conclusion: 'success' },
        { name: 'check2', status: 'queued', conclusion: null }
      ]

      expect(
        // @ts-expect-error - don't care of the full data
        getCheckStatus(requiredChecksName, checkRuns2)
      ).toBe(ECheckStatus.RUNNING)
    })

    it('should return running if not all required checks are present', () => {
      const requiredChecksName = ['check1', 'check2']
      const checkRuns = [
        { name: 'check1', status: 'completed', conclusion: 'success' }
      ]

      expect(
        // @ts-expect-error - don't care of the full data
        getCheckStatus(requiredChecksName, checkRuns)
      ).toBe(ECheckStatus.RUNNING)
    })

    it('should return success if all required checks are success', () => {
      const requiredChecksName = ['check1', 'check2']
      const checkRuns = [
        { name: 'check1', status: 'completed', conclusion: 'success' },
        { name: 'check2', status: 'completed', conclusion: 'success' }
      ]

      expect(
        // @ts-expect-error - don't care of the full data
        getCheckStatus(requiredChecksName, checkRuns)
      ).toBe(ECheckStatus.SUCCESS)
    })
  })
})
