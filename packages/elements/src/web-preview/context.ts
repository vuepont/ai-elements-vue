import type { Ref } from 'vue'
import { inject, provide } from 'vue'

interface WebPreviewContextValue {
  url: Ref<string>
  setUrl: (url: string) => void
  consoleOpen: Ref<boolean>
  setConsoleOpen: (open: boolean) => void
}

const WEB_PREVIEW_KEY = Symbol('WebPreviewContext')

export function provideWebPreviewContext(value: WebPreviewContextValue) {
  provide(WEB_PREVIEW_KEY, value)
}

export function useWebPreviewContext() {
  const context = inject<WebPreviewContextValue | null>(WEB_PREVIEW_KEY, null)
  if (!context) {
    throw new Error('WebPreview components must be used within a WebPreview')
  }
  return context
}
