import { createContext } from 'reka-ui'

export interface OpenInContextContextValue {
  query: string
}

export const [useOpenInContext, provideOpenInContext] = createContext<OpenInContextContextValue>('OpenIn')
