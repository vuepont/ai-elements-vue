<script setup lang="ts">
import type { Experimental_SpeechResult as SpeechResult } from 'ai'
import type { AudioHTMLAttributes } from 'vue'
import { computed } from 'vue'

interface Props extends /* @vue-ignore */ AudioHTMLAttributes {
  src?: string
  data?: SpeechResult['audio']
}

const props = defineProps<Props>()

const audioSrc = computed(() => {
  if (props.src) {
    return props.src
  }
  if (props.data) {
    return `data:${props.data.mediaType};base64,${props.data.base64}`
  }
  return undefined
})
</script>

<template>
  <audio
    v-bind="{ ...$attrs, slot: 'media' }"
    data-slot="audio-player-element"
    :src="audioSrc"
  />
</template>
