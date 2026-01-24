import type { InjectionKey, Ref } from 'vue'
import { inject } from 'vue'

export interface StackFrame {
  raw: string
  functionName: string | null
  filePath: string | null
  lineNumber: number | null
  columnNumber: number | null
  isInternal: boolean
}

export interface ParsedStackTrace {
  errorType: string | null
  errorMessage: string
  frames: StackFrame[]
  raw: string
}

export interface StackTraceContextValue {
  trace: Ref<ParsedStackTrace>
  raw: Ref<string>
  isOpen: Ref<boolean | undefined>
  setIsOpen: (open: boolean) => void
  onFilePathClick?: (filePath: string, line?: number, column?: number) => void
}

export const StackTraceKey: InjectionKey<StackTraceContextValue> = Symbol('StackTrace')

export function useStackTraceContext(componentName: string): StackTraceContextValue {
  const context = inject(StackTraceKey)
  if (!context) {
    throw new Error(`${componentName} must be used within StackTrace`)
  }
  return context
}
