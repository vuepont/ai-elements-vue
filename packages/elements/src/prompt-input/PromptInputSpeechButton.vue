<script setup lang="ts">
import { InputGroupButton } from '@repo/shadcn-vue/components/ui/input-group'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { MicIcon } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'
import { usePromptInput } from './context'

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null
  onend: ((this: SpeechRecognition, ev: Event) => any) | null
  onresult: ((this: SpeechRecognition, ev: any) => any) | null
  onerror: ((this: SpeechRecognition, ev: any) => any) | null
}

const props = defineProps<{ class?: string }>()

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
  <InputGroupButton
    type="button"
    variant="ghost"
    size="icon-sm"
    :disabled="!recognition"
    :class="cn(
      'relative transition-all duration-200',
      isListening && 'animate-pulse bg-accent text-accent-foreground',
      props.class,
    )"
    @click="toggleListening"
  >
    <MicIcon class="size-4" />
  </InputGroupButton>
</template>
