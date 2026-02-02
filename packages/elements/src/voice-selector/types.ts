import type { InjectionKey, Ref } from 'vue'

export interface VoiceSelectorContextValue {
  value: Ref<string | undefined>
  setValue: (value: string | undefined) => void
  open: Ref<boolean | undefined>
  setOpen: (open: boolean) => void
}

export const VOICE_SELECTOR_CONTEXT_KEY = Symbol('VOICE_SELECTOR_CONTEXT_KEY') as InjectionKey<VoiceSelectorContextValue>
