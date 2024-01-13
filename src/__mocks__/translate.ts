jest.mock('@/contexts/root/dictionary-provider/dictionary-provider', () => {
  const translate = (key: string) => key
  const originalModule: object = jest.requireActual(
    '@/contexts/root/dictionary-provider/dictionary-provider'
  )

  return {
    __esModule: true,
    ...originalModule,
    useDictionary: jest.fn(() => ({ translate }))
  }
})
