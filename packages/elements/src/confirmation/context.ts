import type { ToolUIPart } from 'ai'
import type { InjectionKey, Ref } from 'vue'
import { inject } from 'vue'

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

export const ConfirmationKey: InjectionKey<ConfirmationContextValue>
  = Symbol('ConfirmationContext')

export function useConfirmationContext() {
  const context = inject<ConfirmationContextValue | null>(ConfirmationKey, null)
  if (!context)
    throw new Error('Confirmation components must be used within <Confirmation>')
  return context
}
