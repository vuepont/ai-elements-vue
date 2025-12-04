<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { MicIcon } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'
import { usePromptInput } from './context'
import PromptInputButton from './PromptInputButton.vue'

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null
  onend: ((this: SpeechRecognition, ev: Event) => any) | null
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null
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

type PromptInputSpeechButtonProps = InstanceType<typeof PromptInputButton>['$props']

interface Props extends /* @vue-ignore */ PromptInputSpeechButtonProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { textInput, setTextInput } = usePromptInput()
const isListening = ref(false)
const recognition = ref<SpeechRecognition | null>(null)

onMounted(() => {
  const Win = window as any
  const SpeechRecognition = Win.SpeechRecognition || Win.webkitSpeechRecognition

  if (SpeechRecognition) {
    const sr = new SpeechRecognition()
    sr.continuous = true
    sr.interimResults = true
    sr.lang = 'en-US'

    sr.onstart = () => isListening.value = true
    sr.onend = () => isListening.value = false

    sr.onresult = (event: any) => {
      let finalTranscript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i]
        if (result.isFinal) {
          finalTranscript += result[0]?.transcript ?? ''
        }
      }

      if (finalTranscript) {
        const newValue = textInput.value + (textInput.value ? ' ' : '') + finalTranscript
        setTextInput(newValue)
      }
    }

    sr.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      isListening.value = false
    }

    recognition.value = sr
  }
})

onUnmounted(() => {
  recognition.value?.stop()
})

function toggleListening() {
  if (!recognition.value)
    return
  if (isListening.value) {
    recognition.value.stop()
  }
  else {
    recognition.value.start()
  }
}
</script>

<template>
  <PromptInputButton
    :disabled="!recognition"
    :class="cn(
      'relative transition-all duration-200',
      isListening && 'animate-pulse bg-accent text-accent-foreground',
      props.class,
    )"
    v-bind="props"
    @click="toggleListening"
  >
    <MicIcon class="size-4" />
  </PromptInputButton>
</template>
