import type { Ref } from 'vue'
import { createContext } from 'reka-ui'

export interface ReasoningContextValue {
  isStreaming: Ref<boolean>
  isOpen: Ref<boolean>
  setIsOpen: (open: boolean) => void
  duration: Ref<number | undefined>
}

export const [useReasoning, provideReasoning] = createContext<ReasoningContextValue>('Reasoning')
