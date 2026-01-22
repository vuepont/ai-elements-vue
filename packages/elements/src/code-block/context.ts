import type { ComputedRef, InjectionKey } from 'vue'
import { inject } from 'vue'

export interface CodeBlockContext {
  code: ComputedRef<string>
}

export const CodeBlockKey: InjectionKey<CodeBlockContext> = Symbol('CodeBlock')

export function useCodeBlockContext() {
  const context = inject(CodeBlockKey)

  if (!context)
    throw new Error('CodeBlockCopyButton must be used within a <CodeBlock />')

  return context
}
