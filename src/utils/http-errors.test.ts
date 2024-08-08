import { createHttpError } from '@/utils/root/http-errors'

describe('http-errors', () => {
  describe('createHttpError', () => {
    it('should default status code to 400 when not provided and error is undefined', () => {
      const error = createHttpError()

      expect(error).toBeInstanceOf(Error)
      expect(error.status).toBe(400)
    })

    it('should return an error with the correct status code when error is undefined', () => {
      const error = createHttpError(401)

      expect(error).toBeInstanceOf(Error)
      expect(error.status).toBe(401)
    })

    it('should return an error with the correct status code and message when error is a string', () => {
      const errorMessage = 'Not Found'
      const error = createHttpError(404, errorMessage)

      expect(error).toBeInstanceOf(Error)
      expect(error.status).toBe(404)
      expect(error.message).toBe(errorMessage)
    })

    it('should return an error with the correct status code and message when error is an Error object', () => {
      const originalError = new Error('Not Found')
      const error = createHttpError(404, originalError)

      expect(error).toBeInstanceOf(Error)
      expect(error.status).toBe(404)
      expect(error.message).toBe(originalError.message)
    })
  })
})
