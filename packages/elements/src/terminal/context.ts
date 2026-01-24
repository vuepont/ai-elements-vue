import type { ComputedRef, InjectionKey } from 'vue'
import { inject } from 'vue'

export interface TerminalContextValue {
  output: ComputedRef<string>
  isStreaming: ComputedRef<boolean>
  autoScroll: ComputedRef<boolean>
  hasClear: ComputedRef<boolean>
  onClear: () => void
}

export const TerminalKey: InjectionKey<TerminalContextValue> = Symbol('Terminal')

export function useTerminalContext(componentName: string): TerminalContextValue {
  const context = inject(TerminalKey)

  if (!context) {
    throw new Error(`${componentName} must be used within Terminal`)
  }

  return context
}
