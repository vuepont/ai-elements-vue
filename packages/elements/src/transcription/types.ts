import type { Experimental_TranscriptionResult as TranscriptionResult } from 'ai'
import type { InjectionKey, Ref } from 'vue'

export type TranscriptionSegment = NonNullable<TranscriptionResult['segments']>[number]

export interface TranscriptionContextValue {
  segments: TranscriptionSegment[]
  currentTime: Ref<number>
  onSeek?: (time: number) => void
}

export const TRANSCRIPTION_CONTEXT_KEY = Symbol('TRANSCRIPTION_CONTEXT_KEY') as InjectionKey<TranscriptionContextValue>
