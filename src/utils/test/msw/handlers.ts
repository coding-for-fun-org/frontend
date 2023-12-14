import { HttpResponse, delay, http } from 'msw'

export const HTTP_FAKE_RESPONSE_DELAY = 100
export const HTTP_FAKE_ERROR = { message: 'HTTP_FAKE_MESSAGE' }

const mockTestHandler = http.get('/api/test', async () => {
  await delay(HTTP_FAKE_RESPONSE_DELAY)

  return HttpResponse.json({ id: 111, name: 'name_111' }, { status: 200 })
})

const mockTestExceptionHandler = http.get('/api/test', async () => {
  await delay(HTTP_FAKE_RESPONSE_DELAY)

  return HttpResponse.json({ error: HTTP_FAKE_ERROR }, { status: 400 })
})

export const handlers = [mockTestHandler, mockTestExceptionHandler]
