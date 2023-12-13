import '@testing-library/jest-dom'

import { mswServer } from '@/utils/root/test/msw/server'

beforeAll(() => {
  mswServer.listen()
})

afterEach(() => {
  mswServer.resetHandlers()
})

afterAll(() => {
  mswServer.close()
})
