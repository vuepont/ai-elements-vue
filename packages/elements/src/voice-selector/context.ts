import type { InjectionKey, Ref } from 'vue'
import { inject } from 'vue'

export interface VoiceSelectorContextValue {
  value: Ref<string | undefined>
  setValue: (value: string | undefined) => void
  open: Ref<boolean | undefined>
  setOpen: (open: boolean) => void
}

export const VoiceSelectorKey: InjectionKey<VoiceSelectorContextValue> = Symbol('VoiceSelector')

export function useVoiceSelector(componentName: string): VoiceSelectorContextValue {
  const context = inject(VoiceSelectorKey)

  if (!context) {
    throw new Error(`${componentName} must be used within VoiceSelector`)
  }

  return context
}
