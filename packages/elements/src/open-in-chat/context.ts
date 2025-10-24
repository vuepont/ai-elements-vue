import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'

export interface OpenInContext {
  query: string
}

export const OpenInContextKey: InjectionKey<OpenInContext> = Symbol('OpenInContext')

export function provideOpenInContext(context: OpenInContext) {
  provide(OpenInContextKey, context)
}

export function useOpenInContext() {
  const context = inject(OpenInContextKey)
  if (!context) {
    throw new Error('OpenIn components must be used within an OpenIn provider')
  }
  return context
}
