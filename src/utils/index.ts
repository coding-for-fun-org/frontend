export const createIdGenerator = (initialNumber?: number) => {
  let currentId = (initialNumber ?? 0) - 1

  return () => {
    const nextId = currentId === Number.MAX_SAFE_INTEGER - 1 ? 0 : currentId + 1

    currentId = nextId

    return nextId
  }
}

export const isServer = () => typeof window === 'undefined'
