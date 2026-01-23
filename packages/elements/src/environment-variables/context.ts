import type { InjectionKey, Ref } from 'vue'

export interface EnvironmentVariablesContextValue {
  showValues: Ref<boolean>
  setShowValues: (show: boolean) => void
}

export const EnvironmentVariablesKey: InjectionKey<EnvironmentVariablesContextValue>
  = Symbol('EnvironmentVariables')

export interface EnvironmentVariableContextValue {
  name: string
  value: string
}

export const EnvironmentVariableKey: InjectionKey<EnvironmentVariableContextValue>
  = Symbol('EnvironmentVariable')
