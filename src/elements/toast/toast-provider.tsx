'use client'

import {
  type ComponentPropsWithoutRef,
  type ReactNode,
  createContext,
  forwardRef,
  useContext,
  useImperativeHandle,
  useReducer,
  useRef
} from 'react'

import { createIdGenerator } from '@/utils/root/index'

import {
  ToastProvider as RadixToastProvider,
  type TToastRoot,
  Toast,
  ToastViewport
} from './toast'

enum EToastActionType {
  PUSH_TOAST = 'PUSH-TOAST',
  DISMISS_TOAST = 'DISMISS-TOAST',
  REMOVE_TOAST = 'REMOVE-TOAST'
}

type TToastProps = ComponentPropsWithoutRef<TToastRoot>

type TToastId = NonNullable<TToastProps['id']>

type TToasterToast = TToastProps & {
  id: TToastId
  title?: ReactNode
  description?: ReactNode
  action?: ReactNode
}

type TToastState = {
  toasts: TToasterToast[]
}

type TToastAction =
  | {
      type: EToastActionType.PUSH_TOAST
      toast: TToasterToast
    }
  | {
      type: EToastActionType.DISMISS_TOAST
      toastId?: TToastId
    }
  | {
      type: EToastActionType.REMOVE_TOAST
      toastId?: TToastId
    }

const TOAST_LIMIT = 5
const TOAST_DURATION = 5000
const TOAST_SWIPE_THRESHOLD = 50
const TOAST_REMOVE_DELAY = TOAST_SWIPE_THRESHOLD

const idGenerator = createIdGenerator()

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const reducer = (state: TToastState, action: TToastAction): TToastState => {
  switch (action.type) {
    case EToastActionType.PUSH_TOAST: {
      return {
        ...state,
        toasts: state.toasts.concat([action.toast]).slice(-TOAST_LIMIT)
      }
    }

    case EToastActionType.DISMISS_TOAST: {
      const { toastId } = action

      if (toastId === undefined) {
        return {
          ...state,
          toasts: []
        }
      }

      return {
        ...state,
        toasts: state.toasts.map((toast) =>
          toast.id === toastId || toastId === undefined
            ? {
                ...toast,
                open: false
              }
            : toast
        )
      }
    }

    case EToastActionType.REMOVE_TOAST: {
      const { toastId } = action

      if (toastId === undefined) {
        return {
          ...state,
          toasts: []
        }
      }

      return {
        ...state,
        toasts: state.toasts.filter((toast) => toast.id !== toastId)
      }
    }
  }
}

type TUpdateToastContext = {
  pushToast: ({ ...props }: Omit<TToasterToast, 'id'>) => {
    toastId: TToastId
    dismissToast: () => void
  }
  dismissToast: () => void
}

const UpdateToastContext = createContext<Partial<TUpdateToastContext>>({})

const Toaster = forwardRef<TUpdateToastContext, object>((_, ref) => {
  const [state, dispatch] = useReducer<
    (state: TToastState, action: TToastAction) => TToastState
  >(reducer, { toasts: [] })
  const { toasts } = state

  const addToRemoveQueue = (toastId: TToastId): void => {
    if (toastTimeouts.has(toastId)) {
      return
    }

    const timeout = setTimeout(() => {
      toastTimeouts.delete(toastId)
      dispatch({ type: EToastActionType.REMOVE_TOAST, toastId })
    }, TOAST_REMOVE_DELAY)

    toastTimeouts.set(toastId, timeout)
  }

  const dismissToast = (toastId?: TToastId): void => {
    if (toastId) {
      addToRemoveQueue(toastId)
    }
    dispatch({ type: EToastActionType.DISMISS_TOAST, toastId })
  }

  const pushToast = ({
    ...props
  }: Omit<TToasterToast, 'id'>): {
    toastId: TToastId
    dismissToast: TUpdateToastContext['dismissToast']
  } => {
    const toastId = idGenerator().toString()

    dispatch({
      type: EToastActionType.PUSH_TOAST,
      toast: {
        ...props,
        id: toastId,
        open: true,
        duration: props.duration ?? TOAST_DURATION,
        onOpenChange: (open) => {
          if (!open) {
            dismissToast(toastId)
          }
        }
      }
    })

    return {
      toastId,
      dismissToast: () => {
        dismissToast(toastId)
      }
    }
  }

  useImperativeHandle(ref, () => ({ pushToast, dismissToast }), [])

  return (
    <RadixToastProvider swipeThreshold={TOAST_SWIPE_THRESHOLD}>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            title={title}
            description={description}
            action={action}
            {...props}
          />
        )
      })}
      <ToastViewport />
    </RadixToastProvider>
  )
})

export function ToastProvider({ children }: { children: ReactNode }) {
  const ref = useRef<TUpdateToastContext>(null)

  /**
   * TODO: Add a way to not to throw an error
   *
   * @description 99.9% of the time, this won't throw an error
   *
   * @throws {Error} if the component is not mounted
   */
  const pushToast: TUpdateToastContext['pushToast'] = ({ ...props }) => {
    if (!ref.current) {
      throw Error('Component Toaster is not mounted')
    }

    return ref.current.pushToast(props)
  }

  /**
   * TODO: Add a way to not to throw an error
   *
   * @description 99.9% of the time, this won't throw an error
   *
   * @throws {Error} if the component is not mounted
   */
  const dismissToast: TUpdateToastContext['dismissToast'] = () => {
    if (!ref.current) {
      throw Error('Component Toaster is not mounted')
    }

    ref.current.dismissToast()
  }

  return (
    <UpdateToastContext.Provider value={{ pushToast, dismissToast }}>
      {children}

      <Toaster ref={ref} />
    </UpdateToastContext.Provider>
  )
}

export const useToast = (): TUpdateToastContext => {
  const { pushToast, dismissToast } = useContext(
    UpdateToastContext
  ) as TUpdateToastContext

  return { pushToast, dismissToast }
}
