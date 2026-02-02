import type { Experimental_TranscriptionResult as TranscriptionResult } from 'ai'
import type { InjectionKey, Ref } from 'vue'
import { inject } from 'vue'

export type TranscriptionSegment = NonNullable<TranscriptionResult['segments']>[number]

export interface TranscriptionContextValue {
  segments: TranscriptionSegment[]
  currentTime: Ref<number>
  onTimeUpdate: (time: number) => void
  onSeek?: (time: number) => void
}

export const TranscriptionKey: InjectionKey<TranscriptionContextValue> = Symbol('Transcription')

export function useTranscriptionContext(): TranscriptionContextValue {
  const context = inject(TranscriptionKey)
  if (!context) {
    throw new Error('Transcription components must be used within Transcription')
  }
  return context
}
