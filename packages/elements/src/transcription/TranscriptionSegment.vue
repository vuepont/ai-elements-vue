<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { TranscriptionSegment } from './types'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, inject } from 'vue'
import { TRANSCRIPTION_CONTEXT_KEY } from './types'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<Props>()

interface Props {
  segment: TranscriptionSegment
  index: number
  class?: HTMLAttributes['class']
}

const context = inject(TRANSCRIPTION_CONTEXT_KEY)

if (!context) {
  throw new Error(
    'Transcription components must be used within Transcription',
  )
}

const isActive = computed(() => {
  return (
    context.currentTime.value >= props.segment.startSecond
    && context.currentTime.value < props.segment.endSecond
  )
})

const isPast = computed(() => {
  return context.currentTime.value >= props.segment.endSecond
})

function handleClick() {
  if (context?.onSeek) {
    context.onSeek(props.segment.startSecond)
  }
}
</script>

<template>
  <button
    :class="
      cn(
        'inline text-left',
        isActive && 'text-primary',
        isPast && 'text-muted-foreground',
        !(isActive || isPast) && 'text-muted-foreground/60',
        context.onSeek && 'cursor-pointer hover:text-foreground',
        !context.onSeek && 'cursor-default',
        props.class,
      )
    "
    :data-active="isActive"
    :data-index="index"
    data-slot="transcription-segment"
    type="button"
    v-bind="$attrs"
    @click="handleClick"
  >
    {{ segment.text }}
  </button>
</template>
