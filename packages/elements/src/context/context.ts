import type { LanguageModelUsage } from 'ai'
import type { ComputedRef } from 'vue'
import { createContext } from 'reka-ui'

export type ModelId = string

export interface ContextContextValue {
  usedTokens: ComputedRef<number>
  maxTokens: ComputedRef<number>
  usage: ComputedRef<LanguageModelUsage | undefined>
  modelId: ComputedRef<ModelId | undefined>
}

export const [useContextValue, provideContext] = createContext<ContextContextValue>('Context')
