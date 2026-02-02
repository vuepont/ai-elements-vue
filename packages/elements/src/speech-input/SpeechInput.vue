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
