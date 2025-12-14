import type { Ref } from 'vue'
import { createContext } from 'reka-ui'

export interface WebPreviewContextValue {
  url: Ref<string>
  setUrl: (url: string) => void
  consoleOpen: Ref<boolean>
  setConsoleOpen: (open: boolean) => void
}

export const [useWebPreview, provideWebPreview] = createContext<WebPreviewContextValue>('WebPreview')
