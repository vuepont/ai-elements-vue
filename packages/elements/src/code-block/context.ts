import type { ComputedRef } from 'vue'
import { createContext } from 'reka-ui'

export interface CodeBlockContextValue {
  code: ComputedRef<string>
}

export const [useCodeBlock, provideCodeBlock] = createContext<CodeBlockContextValue>('CodeBlock')
