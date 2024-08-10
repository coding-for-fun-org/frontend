import {
  createHttpError,
  handleHttpErrorResponse
} from '@/utils/root/http-errors'

describe('http-errors', () => {
  describe('createHttpError', () => {
    it('should default status code to 400 when status is not provided and error is undefined', () => {
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

  describe('handleHttpErrorResponse', () => {
    it("should return an error with the correct status code, but we can't check response", () => {
      const error = {
        status: 404,
        response: {
          data: {
            message: 'Not Found',
            documentation_url: 'https://test_documentation_url/coding-for-fun'
          }
        }
      }
      const parsedError = createHttpError(error.status, error)
      const result = handleHttpErrorResponse(parsedError)

      expect(result.status).toEqual(error.status)
    })

    it('should return an error with the status code 400', () => {
      const error = {
        response: {
          data: {
            message: 'Not Found',
            documentation_url: 'https://test_documentation_url/coding-for-fun'
          }
        }
      }

      const parsedError = createHttpError(undefined, error)
      const result = handleHttpErrorResponse(parsedError)

      expect(result.status).toEqual(400)
    })

    it('should return error message', async () => {
      const error = {
        status: 505,
        message: 'it is message'
      }

      const parsedError = createHttpError(error.status, error.message)
      const result = handleHttpErrorResponse(parsedError)
      const resultResponse = (await result.json()) as {
        error: { title: string }
      }

      expect(result.status).toEqual(error.status)
      expect(resultResponse.error.title).toEqual(error.message)
    })
  })
})
