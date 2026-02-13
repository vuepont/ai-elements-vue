<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { TranscriptionSegment } from './context'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'
import { useTranscriptionContext } from './context'

const props = defineProps<Props>()

interface Props {
  segment: TranscriptionSegment
  index: number
  class?: HTMLAttributes['class']
}

const { currentTime, onSeek } = useTranscriptionContext()

const isActive = computed(() => {
  return (
    currentTime.value >= props.segment.startSecond
    && currentTime.value < props.segment.endSecond
  )
})

const isPast = computed(() => {
  return currentTime.value >= props.segment.endSecond
})

function handleClick() {
  if (onSeek) {
    onSeek(props.segment.startSecond)
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
        onSeek && 'cursor-pointer hover:text-foreground',
        !onSeek && 'cursor-default',
        props.class,
      )
    "
    :data-active="isActive"
    :data-index="index"
    data-slot="transcription-segment"
    type="button"
    @click="handleClick"
  >
    {{ segment.text }}
  </button>
</template>
