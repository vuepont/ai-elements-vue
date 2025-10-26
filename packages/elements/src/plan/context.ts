import type { ComputedRef, InjectionKey } from 'vue'
import { inject, provide } from 'vue'

export interface PlanContextValue {
  isStreaming: ComputedRef<boolean>
}

export const PlanKey: InjectionKey<PlanContextValue> = Symbol('PlanContext')

export function providePlan(value: PlanContextValue) {
  provide(PlanKey, value)
}

export function usePlan() {
  const context = inject(PlanKey)
  if (!context) {
    throw new Error('Plan components must be used within a Plan component')
  }
  return context
}
