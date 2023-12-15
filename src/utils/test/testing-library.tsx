import * as dictionary from '@/dictionaries/root/en.json'
import {
  type RenderHookOptions,
  type RenderOptions,
  render,
  renderHook
} from '@testing-library/react'
import type { FC, ReactElement, ReactNode } from 'react'

import { DictionaryProvider } from '@/contexts/root/DictionaryProvider'

interface ProvidersProps {
  children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => (
  <DictionaryProvider dictionary={dictionary}>{children}</DictionaryProvider>
)

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: Providers, ...options })

const customRenderHook = <T = unknown, U = unknown>(
  callback: (props: U) => T,
  options?: Omit<RenderHookOptions<U>, 'wrapper'>
) => renderHook<T, U>(callback, { wrapper: Providers, ...options })

export * from '@testing-library/react'
export { customRender as render }
export { customRenderHook as renderHook }
