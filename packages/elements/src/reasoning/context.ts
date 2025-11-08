import type { ComputedRef, Ref } from 'vue'
import { inject, provide } from 'vue'

interface ReasoningContextValue {
  isStreaming: ComputedRef<boolean>
  isOpen: ComputedRef<boolean>
  setIsOpen: (open: boolean) => void
  duration: Ref<number | undefined>
}

const REASONING_KEY = Symbol('ReasoningContext')

export function provideReasoningContext(value: ReasoningContextValue) {
  provide(REASONING_KEY, value)
}

export function useReasoningContext() {
  const context = inject<ReasoningContextValue | null>(REASONING_KEY, null)

  if (!context) {
    throw new Error('Reasoning components must be used within Reasoning')
  }

  return context
}
