import type { InjectionKey, Ref } from 'vue'
import { inject } from 'vue'

export interface EnvironmentVariablesContextValue {
  showValues: Ref<boolean>
  setShowValues: (show: boolean) => void
}

export const EnvironmentVariablesKey: InjectionKey<EnvironmentVariablesContextValue>
  = Symbol('EnvironmentVariables')

export function useEnvironmentVariablesContext() {
  const context = inject(EnvironmentVariablesKey)
  if (!context) {
    throw new Error('useEnvironmentVariablesContext must be used within <EnvironmentVariables>')
  }
  return context
}

export interface EnvironmentVariableContextValue {
  name: string
  value: string
}

export const EnvironmentVariableKey: InjectionKey<EnvironmentVariableContextValue>
  = Symbol('EnvironmentVariable')

export function useEnvironmentVariableContext() {
  const context = inject(EnvironmentVariableKey)
  if (!context) {
    throw new Error('useEnvironmentVariableContext must be used within <EnvironmentVariable>')
  }
  return context
}
