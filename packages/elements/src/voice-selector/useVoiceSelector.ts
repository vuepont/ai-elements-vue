import { inject } from 'vue'
import { VOICE_SELECTOR_CONTEXT_KEY } from './types'

export function useVoiceSelector() {
  const context = inject(VOICE_SELECTOR_CONTEXT_KEY)
  if (!context) {
    throw new Error(
      'VoiceSelector components must be used within VoiceSelector',
    )
  }
  return context
}
