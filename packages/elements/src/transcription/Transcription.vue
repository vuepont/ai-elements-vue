<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { TranscriptionSegment } from './context'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useVModel } from '@vueuse/core'
import { provide } from 'vue'
import { TranscriptionKey } from './context'

const props = withDefaults(defineProps<Props>(), {
  currentTime: 0,
})

const emit = defineEmits<{
  (e: 'update:currentTime', time: number): void
  (e: 'seek', time: number): void
}>()

interface Props {
  segments: TranscriptionSegment[]
  currentTime?: number
  class?: HTMLAttributes['class']
}

const currentTime = useVModel(props, 'currentTime', emit)

function handleTimeUpdate(time: number) {
  currentTime.value = time
}

function handleSeek(time: number) {
  currentTime.value = time
  emit('seek', time)
}

provide(TranscriptionKey, {
  segments: props.segments,
  currentTime,
  onTimeUpdate: handleTimeUpdate,
  onSeek: handleSeek,
})
</script>

<template>
  <div
    :class="cn('flex flex-wrap gap-1 text-sm leading-relaxed', props.class)"
    data-slot="transcription"
  >
    <template v-for="(segment, index) in segments" :key="`${segment.startSecond}-${segment.endSecond}`">
      <slot v-if="segment.text.trim()" :segment="segment" :index="index" />
    </template>
  </div>
</template>
