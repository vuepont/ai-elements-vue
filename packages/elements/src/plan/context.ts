import type { ComputedRef } from 'vue'
import { createContext } from 'reka-ui'

export interface PlanContextValue {
  isStreaming: ComputedRef<boolean>
}

export const [usePlan, providePlan] = createContext<PlanContextValue>('Plan')
