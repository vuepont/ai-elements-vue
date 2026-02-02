---
title: Speech Input
description: A button component that captures voice input and converts it to text, with cross-browser support.
icon: lucide:mic
---

The `SpeechInput` component provides an easy-to-use interface for capturing voice input in your application. It uses the Web Speech API for real-time transcription in supported browsers (Chrome, Edge), and falls back to MediaRecorder with an external transcription service for browsers that don't support Web Speech API (Firefox, Safari).

:::ComponentLoader{label="Preview" componentName="SpeechInput"}
:::

## Install using CLI

::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add speech-input
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/speech-input.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

::code-group
```vue [SpeechInput.vue]
<script setup lang="ts">
import type { ButtonVariants } from '@repo/shadcn-vue/components/ui/button'
import type { HTMLAttributes } from 'vue'
import { Loader } from '@repo/elements/loader'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { MicIcon, SquareIcon } from 'lucide-vue-next'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null
  onend: ((this: SpeechRecognition, ev: Event) => void) | null
  onresult:
    | ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void)
    | null
  onerror:
    | ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => void)
    | null
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface SpeechRecognitionResultList {
  readonly length: number
  item: (index: number) => SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  readonly length: number
  item: (index: number) => SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
}

declare global {
  interface Window {
    SpeechRecognition: {
      new (): SpeechRecognition
    }
    webkitSpeechRecognition: {
      new (): SpeechRecognition
    }
  }
}

type SpeechInputMode = 'speech-recognition' | 'media-recorder' | 'none'

export interface SpeechInputProps {
  class?: HTMLAttributes['class']
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  onTranscriptionChange?: (text: string) => void
  /**
   * Callback for when audio is recorded using MediaRecorder fallback.
   * This is called in browsers that don't support the Web Speech API (Firefox, Safari).
   * The callback receives an audio Blob that should be sent to a transcription service.
   * Return the transcribed text, which will be passed to onTranscriptionChange.
   */
  onAudioRecorded?: (audioBlob: Blob) => Promise<string>
  lang?: string
}

const props = withDefaults(defineProps<SpeechInputProps>(), {
  lang: 'en-US',
})

const emit = defineEmits<{
  (e: 'transcriptionChange', text: string): void
}>()

const isListening = ref(false)
const isProcessing = ref(false)
const mode = ref<SpeechInputMode>('none')
const recognition = ref<SpeechRecognition | null>(null)

const mediaRecorderRef = ref<MediaRecorder | null>(null)
const audioChunksRef = ref<Blob[]>([])

function detectSpeechInputMode(): SpeechInputMode {
  if (typeof window === 'undefined') {
    return 'none'
  }

  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    return 'speech-recognition'
  }

  if ('MediaRecorder' in window && 'mediaDevices' in navigator) {
    return 'media-recorder'
  }

  return 'none'
}

// Detect mode on mount
onMounted(() => {
  mode.value = detectSpeechInputMode()
})

// Initialize Speech Recognition when mode is speech-recognition
watch([mode, () => props.lang], ([newMode, newLang], [oldMode, oldLang]) => {
  if (newMode !== 'speech-recognition') {
    if (recognition.value) {
      recognition.value.stop()
      recognition.value = null
    }
    return
  }

  // Only re-initialize if mode changed or lang changed
  if (recognition.value && newLang === oldLang && newMode === oldMode) {
    return
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const speechRecognition = new SpeechRecognition()

  speechRecognition.continuous = true
  speechRecognition.interimResults = true
  speechRecognition.lang = newLang

  speechRecognition.onstart = () => {
    isListening.value = true
  }

  speechRecognition.onend = () => {
    isListening.value = false
  }

  speechRecognition.onresult = (event) => {
    let finalTranscript = ''

    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i]
      if (result.isFinal) {
        finalTranscript += result[0]?.transcript ?? ''
      }
    }

    if (finalTranscript) {
      props.onTranscriptionChange?.(finalTranscript)
      emit('transcriptionChange', finalTranscript)
    }
  }

  speechRecognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error)
    isListening.value = false
  }

  recognition.value = speechRecognition
}, { immediate: true })

onUnmounted(() => {
  if (recognition.value) {
    recognition.value.stop()
  }
})

// Start MediaRecorder recording
async function startMediaRecorder() {
  if (!props.onAudioRecorded) {
    console.warn(
      'SpeechInput: onAudioRecorded callback is required for MediaRecorder fallback',
    )
    return
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)
    audioChunksRef.value = []

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.value.push(event.data)
      }
    }

    mediaRecorder.onstop = async () => {
      // Stop all tracks to release the microphone
      for (const track of stream.getTracks()) {
        track.stop()
      }

      const audioBlob = new Blob(audioChunksRef.value, {
        type: 'audio/webm',
      })

      if (audioBlob.size > 0) {
        isProcessing.value = true
        try {
          const transcript = await props.onAudioRecorded!(audioBlob)
          if (transcript) {
            props.onTranscriptionChange?.(transcript)
            emit('transcriptionChange', transcript)
          }
        }
        catch (error) {
          console.error('Transcription error:', error)
        }
        finally {
          isProcessing.value = false
        }
      }
    }

    mediaRecorder.onerror = (event) => {
      console.error('MediaRecorder error:', event)
      isListening.value = false
      // Stop all tracks on error
      for (const track of stream.getTracks()) {
        track.stop()
      }
    }

    mediaRecorderRef.value = mediaRecorder
    mediaRecorder.start()
    isListening.value = true
  }
  catch (error) {
    console.error('Failed to start MediaRecorder:', error)
    isListening.value = false
  }
}

// Stop MediaRecorder recording
function stopMediaRecorder() {
  if (mediaRecorderRef.value?.state === 'recording') {
    mediaRecorderRef.value.stop()
  }
  isListening.value = false
}

function toggleListening() {
  if (mode.value === 'speech-recognition' && recognition.value) {
    if (isListening.value) {
      recognition.value.stop()
    }
    else {
      recognition.value.start()
    }
  }
  else if (mode.value === 'media-recorder') {
    if (isListening.value) {
      stopMediaRecorder()
    }
    else {
      startMediaRecorder()
    }
  }
}

const isDisabled = computed(() => {
  return mode.value === 'none'
    || (mode.value === 'speech-recognition' && !recognition.value)
    || (mode.value === 'media-recorder' && !props.onAudioRecorded)
    || isProcessing.value
})
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<template>
  <div :class="cn('relative inline-flex items-center justify-center', $attrs.class as any)">
    <!-- Animated pulse rings -->
    <template v-if="isListening">
      <div
        v-for="index in [0, 1, 2]"
        :key="index"
        class="absolute inset-0 animate-ping rounded-full border-2 border-red-400/30"
        :style="{
          animationDelay: `${index * 0.3}s`,
          animationDuration: '2s',
        }"
      />
    </template>

    <!-- Main record button -->
    <Button
      v-bind="$attrs"
      :class="cn(
        'relative z-10 rounded-full transition-all duration-300',
        isListening
          ? 'bg-destructive text-white hover:bg-destructive/80 hover:text-white'
          : 'bg-primary text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground',
        props.class,
      )"
      :disabled="isDisabled"
      @click="toggleListening"
    >
      <Loader v-if="isProcessing" />
      <SquareIcon v-else-if="isListening" class="size-4" />
      <MicIcon v-else class="size-4" />
    </Button>
  </div>
</template>
```

```ts [index.ts]
export { default as SpeechInput } from './SpeechInput.vue'
```
::

## Features

- Built on Web Speech API (SpeechRecognition) with MediaRecorder fallback
- Cross-browser support (Chrome, Edge, Firefox, Safari)
- Continuous speech recognition with interim results
- Visual feedback with pulse animation when listening
- Loading state during transcription processing
- Automatic browser compatibility detection
- Final transcript extraction and callbacks
- Error handling and automatic state management
- Extends shadcn-vue Button component
- Full TypeScript support

## Props

### `<SpeechInput />`

The component extends the shadcn-vue Button component, so all Button props are available.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onTranscriptionChange` | `(text: string) => void` | - | Callback fired when final transcription text is available. |
| `onAudioRecorded` | `(audioBlob: Blob) => Promise<string>` | - | Callback for MediaRecorder fallback. Required for Firefox/Safari support. |
| `lang` | `string` | `"en-US"` | Language for speech recognition. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `transcriptionChange` | `string` | Fired when final transcription text is available. |

## Behavior

### Speech Recognition Modes

The component automatically detects browser capabilities and uses the best available method:

| Browser | Mode | Behavior |
|---------|------|----------|
| Chrome, Edge | Web Speech API | Real-time transcription, no server required |
| Firefox, Safari | MediaRecorder | Records audio, sends to external transcription service |
| Unsupported | Disabled | Button is disabled |

### Web Speech API Mode (Chrome, Edge)

Uses the Web Speech API with the following configuration:

- **Continuous**: Set to `true` to keep recognition active until manually stopped
- **Interim Results**: Set to `true` to receive partial results during speech
- **Language**: Configurable via `lang` prop, defaults to `"en-US"`

### MediaRecorder Mode (Firefox, Safari)

When the Web Speech API is unavailable, the component falls back to recording audio:

1. Records audio using `MediaRecorder` API
2. On stop, creates an audio blob (`audio/webm`)
3. Calls `onAudioRecorded` with the blob
4. Waits for transcription result
5. Passes result to `onTranscriptionChange` and emits `transcriptionChange`

**Note**: The `onAudioRecorded` prop is required for this mode to work. Without it, the button will be disabled in Firefox/Safari.

## Usage with MediaRecorder Fallback

To support Firefox and Safari, provide an `onAudioRecorded` callback that sends audio to a transcription service:

```vue
<script setup lang="ts">
import { SpeechInput } from '@repo/elements/speech-input'

async function handleAudioRecorded(audioBlob: Blob): Promise<string> {
  const formData = new FormData()
  formData.append('file', audioBlob, 'audio.webm')
  formData.append('model', 'whisper-1')

  const response = await fetch(
    'https://api.openai.com/v1/audio/transcriptions',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: formData,
    }
  )

  const data = await response.json()
  return data.text
}
</script>

<template>
  <SpeechInput
    :on-audio-recorded="handleAudioRecorded"
    @transcription-change="(text) => console.log(text)"
  />
</template>
```

## Browser Support

The component provides cross-browser support through a two-tier system:

| Browser | API Used | Requirements |
|---------|----------|--------------|
| Chrome | Web Speech API | None |
| Edge | Web Speech API | None |
| Firefox | MediaRecorder | `onAudioRecorded` prop |
| Safari | MediaRecorder | `onAudioRecorded` prop |

For full cross-browser support, provide the `onAudioRecorded` callback that sends audio to a transcription service like OpenAI Whisper, Google Cloud Speech-to-Text, or AssemblyAI.
