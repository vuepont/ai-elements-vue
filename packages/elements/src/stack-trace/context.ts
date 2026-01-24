import type { InjectionKey, Ref } from 'vue'

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
  isOpen: Ref<boolean>
  setIsOpen: (open: boolean) => void
  onFilePathClick?: (filePath: string, line?: number, column?: number) => void
}

export const StackTraceKey: InjectionKey<StackTraceContextValue> = Symbol('StackTrace')
