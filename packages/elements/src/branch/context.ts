import type { InjectionKey, Ref } from 'vue'
import { inject } from 'vue'

export interface BranchContext {
  currentBranch: Ref<number>
  totalBranches: Ref<number>
  goToPrevious: () => void
  goToNext: () => void
  setTotalBranches: (count: number) => void
}

export const BranchContextKey: InjectionKey<BranchContext> = Symbol('BranchContext')

export function useBranchContext(): BranchContext {
  const ctx = inject(BranchContextKey)
  if (!ctx) {
    throw new Error('Branch components must be used within Branch')
  }
  return ctx
}
