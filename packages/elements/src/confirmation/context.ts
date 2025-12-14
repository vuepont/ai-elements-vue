import type { ToolUIPart } from 'ai'
import type { Ref } from 'vue'
import { createContext } from 'reka-ui'

export type ToolUIPartApproval
  = | {
    id: string
    approved?: never
    reason?: never
  }
  | {
    id: string
    approved: boolean
    reason?: string
  }
  | {
    id: string
    approved: true
    reason?: string
  }
  | {
    id: string
    approved: true
    reason?: string
  }
  | {
    id: string
    approved: false
    reason?: string
  }
  | undefined

export interface ConfirmationContextValue {
  approval: Ref<ToolUIPartApproval>
  state: Ref<ToolUIPart['state']>
}

export const [useConfirmation, provideConfirmation] = createContext<ConfirmationContextValue>('Confirmation')
