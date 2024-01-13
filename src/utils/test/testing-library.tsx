import {
  type RenderHookOptions,
  type RenderOptions,
  render,
  renderHook
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { FC, ReactElement, ReactNode } from 'react'

import { dictionary } from '@/dictionaries/root/en'

import { DictionaryProvider } from '@/contexts/root/dictionary-provider/dictionary-provider'

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
export const userEventSetup = () => userEvent.setup()
