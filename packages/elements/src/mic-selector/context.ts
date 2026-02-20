import type { InjectionKey, Ref } from 'vue'
import { inject } from 'vue'

export interface MicSelectorContextValue {
  devices: Ref<MediaDeviceInfo[]>
  value: Ref<string | undefined>
  setValue: (value: string | undefined) => void
  open: Ref<boolean | undefined>
  setOpen: (open: boolean) => void
  width: Ref<number>
  setWidth: (width: number) => void
}

export const MicSelectorKey: InjectionKey<MicSelectorContextValue> = Symbol('MicSelector')

export function useMicSelector(componentName: string): MicSelectorContextValue {
  const context = inject(MicSelectorKey)

  if (!context) {
    throw new Error(`${componentName} must be used within MicSelector`)
  }

  return context
}
