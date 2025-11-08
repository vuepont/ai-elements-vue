import type { LanguageModelUsage } from 'ai'
import type { ComputedRef } from 'vue'
import { computed, inject, provide } from 'vue'

export interface ContextSchema {
  usedTokens: number
  maxTokens: number
  usage?: LanguageModelUsage
  modelId?: string
}

const CONTEXT_KEY = Symbol('ContextSchema')

export function provideContext(value: () => ContextSchema) {
  const context = computed(value)
  provide(CONTEXT_KEY, context)
}

export function useContextSchema() {
  const context = inject<ComputedRef<ContextSchema> | null>(CONTEXT_KEY, null)

  if (!context) {
    throw new Error('Context components must be used within Context')
  }

  return context
}
