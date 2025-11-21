import type { InjectionKey, Ref } from 'vue'
import { inject, ref } from 'vue'

export type ExamplesCodeBlockMode = 'light' | 'dark'

export const examplesCodeBlockModeKey: InjectionKey<Ref<ExamplesCodeBlockMode>> = Symbol('examples-code-block-mode')

const fallbackMode = ref<ExamplesCodeBlockMode>('light')

export function useExamplesCodeBlockMode() {
  return inject(examplesCodeBlockModeKey, fallbackMode)
}
