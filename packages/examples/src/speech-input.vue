<script setup lang="ts">
import { SpeechInput } from '@repo/elements/speech-input'
import { ref } from 'vue'

const transcript = ref('')

function handleTranscriptionChange(text: string) {
  transcript.value = transcript.value ? `${transcript.value} ${text}` : text
}

function handleClear() {
  transcript.value = ''
}

/**
 * Fallback handler for browsers that don't support Web Speech API (Firefox, Safari).
 * This function receives recorded audio and should send it to a transcription service.
 * Example uses OpenAI Whisper API - replace with your preferred service.
 */
async function handleAudioRecorded(audioBlob: Blob): Promise<string> {
  const formData = new FormData()
  formData.append('file', audioBlob, 'audio.webm')
  formData.append('model', 'whisper-1')

  const response = await fetch(
    'https://api.openai.com/v1/audio/transcriptions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: formData,
    },
  )

  if (!response.ok) {
    throw new Error('Transcription failed')
  }

  const data = await response.json()
  return data.text
}
</script>

<template>
  <div class="flex size-full flex-col items-center justify-center gap-4">
    <div class="flex gap-2">
      <SpeechInput
        size="icon"
        variant="outline"
        :on-audio-recorded="handleAudioRecorded"
        @transcription-change="handleTranscriptionChange"
      />
      <button
        v-if="transcript"
        class="text-muted-foreground text-sm underline hover:text-foreground"
        type="button"
        @click="handleClear"
      >
        Clear
      </button>
    </div>
    <div v-if="transcript" class="max-w-md rounded-lg border bg-card p-4 text-sm">
      <p class="text-muted-foreground">
        <strong>Transcript:</strong>
      </p>
      <p class="mt-2">
        {{ transcript }}
      </p>
    </div>
    <p v-else class="text-muted-foreground text-sm">
      Click the microphone to start speaking
    </p>
  </div>
</template>
