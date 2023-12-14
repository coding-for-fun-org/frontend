import {
  type RenderHookOptions,
  type RenderOptions,
  render,
  renderHook
} from '@testing-library/react'
import type { FC, ReactElement, ReactNode } from 'react'

interface ProvidersProps {
  children: ReactNode
}

const Providers: FC<ProvidersProps> = ({ children }) => <>{children}</>

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
