import type { Ref, VNode } from 'vue'
import { createContext } from 'reka-ui'

export interface MessageBranchContextType<T = VNode[]> {
  currentBranch: Readonly<Ref<number>>
  totalBranches: Readonly<Ref<number>>
  goToPrevious: () => void
  goToNext: () => void
  branches: Ref<T>
  setBranches: (count: number) => void
}

export const [useMessageBranch, provideMessageBranch] = createContext<MessageBranchContextType>('MessageBranch')
