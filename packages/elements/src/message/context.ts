import type { InjectionKey, Ref, VNode } from 'vue'
import { inject } from 'vue'

export interface MessageBranchContextType<T = VNode[]> {
  currentBranch: Readonly<Ref<number>>
  totalBranches: Readonly<Ref<number>>
  goToPrevious: () => void
  goToNext: () => void
  branches: Ref<T>
  setBranches: (count: number) => void
}

export const MessageBranchKey: InjectionKey<MessageBranchContextType>
  = Symbol('MessageBranch')

export function useMessageBranchContext(): MessageBranchContextType {
  const ctx = inject(MessageBranchKey)
  if (!ctx) {
    throw new Error('Message Branch components must be used within Message Branch')
  }
  return ctx
}
