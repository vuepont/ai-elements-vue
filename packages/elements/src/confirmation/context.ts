import type { ToolUIPart } from 'ai'
import type { ComputedRef } from 'vue'
import { computed, inject, provide } from 'vue'

interface ConfirmationContextValue {
  approval: ToolUIPartApproval | undefined
  state: ToolUIPart['state']
}

type ToolUIPartApproval
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
    approved: false
    reason?: string
  }
  | undefined

const CONFIRMATION_KEY = Symbol('ConfirmationContext')

export function createConfirmationContext(value: () => ConfirmationContextValue) {
  const context = computed(value)
  provide(CONFIRMATION_KEY, context)
}

export function useConfirmationContext() {
  const context = inject<ComputedRef<ConfirmationContextValue> | null>(
    CONFIRMATION_KEY,
    null,
  )

  if (!context) {
    throw new Error('Confirmation components must be used within Confirmation')
  }

  return context
}

export type { ToolUIPartApproval }
