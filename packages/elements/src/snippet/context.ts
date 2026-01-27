import type { ComputedRef, InjectionKey } from 'vue'
import { inject } from 'vue'

export interface SnippetContextValue {
  code: ComputedRef<string>
}

export const SnippetKey: InjectionKey<SnippetContextValue> = Symbol('Snippet')

export function useSnippetContext(componentName: string): SnippetContextValue {
  const context = inject(SnippetKey)

  if (!context) {
    throw new Error(`${componentName} must be used within Snippet`)
  }

  return context
}
