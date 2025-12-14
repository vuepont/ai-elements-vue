import type { Ref } from 'vue'
import { createContext } from 'reka-ui'

export interface ChainOfThoughtContextValue {
  isOpen: Ref<boolean>
  setIsOpen: (open: boolean) => void
}

export const [useChainOfThought, provideChainOfThought] = createContext<ChainOfThoughtContextValue>('ChainOfThought')
