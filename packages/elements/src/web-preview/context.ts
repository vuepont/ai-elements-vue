import type { InjectionKey, Ref } from 'vue'
import { inject, provide } from 'vue'

export interface WebPreviewContextValue {
  url: Ref<string>
  setUrl: (url: string) => void
  consoleOpen: Ref<boolean>
  setConsoleOpen: (open: boolean) => void
}

const WebPreviewContextKey: InjectionKey<WebPreviewContextValue> = Symbol('WebPreviewContext')

export function provideWebPreviewContext(value: WebPreviewContextValue) {
  provide(WebPreviewContextKey, value)
}

export function useWebPreviewContext() {
  const context = inject(WebPreviewContextKey, null)

  if (!context) {
    throw new Error('WebPreview components must be used within WebPreview')
  }

  return context
}
