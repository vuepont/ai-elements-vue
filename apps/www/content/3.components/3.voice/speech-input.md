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

:::code-group
```vue [SpeechInput.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { Spinner } from '@repo/shadcn-vue/components/ui/spinner'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { MicIcon, SquareIcon } from 'lucide-vue-next'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  lang: 'en-US',
})

const emit = defineEmits<{
  (e: 'transcriptionChange', text: string): void
}>()

type SpeechInputProps = InstanceType<typeof Button>['$props']

interface Props extends /* @vue-ignore */ SpeechInputProps {
  class?: HTMLAttributes['class']
  /**
   * Callback for when audio is recorded using MediaRecorder fallback.
   * This is called in browsers that don't support the Web Speech API (Firefox, Safari).
   * The callback receives an audio Blob that should be sent to a transcription service.
   * Return the transcribed text, which will be emitted via transcriptionChange.
   */
  onAudioRecorded?: (audioBlob: Blob) => Promise<string>
  lang?: string
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  onstart: ((this: SpeechRecognitionInstance, ev: Event) => void) | null
  onend: ((this: SpeechRecognitionInstance, ev: Event) => void) | null
  onresult:
    | ((this: SpeechRecognitionInstance, ev: SpeechRecognitionEventCustom) => void)
    | null
  onerror:
    | ((this: SpeechRecognitionInstance, ev: SpeechRecognitionErrorEventCustom) => void)
    | null
}

interface SpeechRecognitionEventCustom extends Event {
  results: SpeechRecognitionResultListCustom
  resultIndex: number
}

interface SpeechRecognitionResultListCustom {
  readonly length: number
  item: (index: number) => SpeechRecognitionResultCustom
  [index: number]: SpeechRecognitionResultCustom
}

interface SpeechRecognitionResultCustom {
  readonly length: number
  item: (index: number) => SpeechRecognitionAlternativeCustom
  [index: number]: SpeechRecognitionAlternativeCustom
  isFinal: boolean
}

interface SpeechRecognitionAlternativeCustom {
  transcript: string
  confidence: number
}

interface SpeechRecognitionErrorEventCustom extends Event {
  error: string
}

// Type alias for the SpeechRecognition constructor
type SpeechRecognitionConstructor = new () => SpeechRecognitionInstance

type SpeechInputMode = 'speech-recognition' | 'media-recorder' | 'none'

const isListening = ref(false)
const isProcessing = ref(false)
const mode = ref<SpeechInputMode>('none')
const recognition = ref<SpeechRecognitionInstance | null>(null)

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

  const SpeechRecognitionCtor = (window.SpeechRecognition || window.webkitSpeechRecognition) as SpeechRecognitionConstructor
  const speechRecognition = new SpeechRecognitionCtor()

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
      emit('transcriptionChange', finalTranscript)
      // Stop recognition after receiving final transcript to return to default state
      recognition.value?.stop()
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

<template>
  <div class="relative inline-flex items-center justify-center">
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
      <Spinner v-if="isProcessing" />
      <SquareIcon v-else-if="isListening" class="size-4" />
      <MicIcon v-else class="size-4" />
    </Button>
  </div>
</template>
```

```ts [index.ts]
export { default as SpeechInput } from './SpeechInput.vue'
```
:::

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

:::field-group
  ::field{name="onAudioRecorded" type="(audioBlob: Blob) => Promise<string>"}
  Callback for MediaRecorder fallback. Required for Firefox/Safari support. Receives recorded audio blob and should return transcribed text from an external service (e.g., OpenAI Whisper).
  ::
  ::field{name="lang" type="string" default='"en-US"'}
  Language for speech recognition.
  ::
  ::field{name="...props" type="ButtonProps"}
  Any other props are spread to the Button component, including variant, size, disabled, etc.
  ::
:::

## Emits

:::field-group
  ::field{name="transcriptionChange" type="string"}
  Fired when final transcription text is available. Only fires for completed phrases, not interim results.
  ::
:::

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
5. Emits `transcriptionChange` with the result

**Note**: The `onAudioRecorded` prop is required for this mode to work. Without it, the button will be disabled in Firefox/Safari.

### Transcription Processing

The component only emits `transcriptionChange` with **final transcripts**. Interim results (Web Speech API) are ignored to prevent incomplete text from being processed.

### Visual States

- **Default State**: Standard button appearance with microphone icon
- **Listening State**: Pulsing animation with accent colors to indicate active listening
- **Processing State**: Loading spinner while waiting for transcription (MediaRecorder mode)
- **Disabled State**: Button is disabled when no API is available or required props are missing

### Lifecycle

1. **Mount**: Detects available APIs and initializes appropriate mode
2. **Click**: Toggles between listening/recording and stopped states
3. **Stop (MediaRecorder)**: Processes audio and waits for transcription
4. **Unmount**: Stops recognition/recording and releases microphone

## Browser Support

The component provides cross-browser support through a two-tier system:

| Browser | API Used | Requirements |
|---------|----------|--------------|
| Chrome | Web Speech API | None |
| Edge | Web Speech API | None |
| Firefox | MediaRecorder | `onAudioRecorded` prop |
| Safari | MediaRecorder | `onAudioRecorded` prop |

For full cross-browser support, provide the `onAudioRecorded` callback that sends audio to a transcription service like OpenAI Whisper, Google Cloud Speech-to-Text, or AssemblyAI.

## Accessibility

- Uses semantic button element via shadcn-vue Button
- Visual feedback for listening state
- Keyboard accessible (can be triggered with Space/Enter)
- Screen reader friendly with proper button semantics

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
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
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

## Notes

- Requires a secure context (HTTPS or localhost)
- Browser may prompt user for microphone permission
- Only final transcripts trigger the `transcriptionChange` emit
- Language is configurable via the `lang` prop
- Continuous recognition continues until button is clicked again
- Errors are logged to console and automatically stop recognition/recording
- MediaRecorder fallback requires the `onAudioRecorded` prop to be provided
- Audio is recorded in `audio/webm` format for the MediaRecorder fallback

## TypeScript

The component includes full TypeScript definitions for the Web Speech API:

- `SpeechRecognitionInstance`
- `SpeechRecognitionEventCustom`
- `SpeechRecognitionResultCustom`
- `SpeechRecognitionAlternativeCustom`
- `SpeechRecognitionErrorEventCustom`

These types are properly declared with custom suffixes to avoid conflicts with built-in DOM types.
