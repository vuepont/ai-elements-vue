<script setup lang="ts">
import type { Experimental_TranscriptionResult as TranscriptionResult } from 'ai'
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useVModel } from '@vueuse/core'
import { provide } from 'vue'
import { TRANSCRIPTION_CONTEXT_KEY } from './types'

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  currentTime: 0,
})

const emit = defineEmits<{
  (e: 'update:currentTime', time: number): void
  (e: 'seek', time: number): void
}>()

export type TranscriptionSegment = NonNullable<TranscriptionResult['segments']>[number]

interface Props {
  segments: TranscriptionSegment[]
  currentTime?: number
  class?: HTMLAttributes['class']
}

const currentTime = useVModel(props, 'currentTime', emit)

function handleSeek(time: number) {
  currentTime.value = time
  emit('seek', time)
}

provide(TRANSCRIPTION_CONTEXT_KEY, {
  segments: props.segments,
  currentTime,
  onSeek: handleSeek,
})
</script>

<template>
  <div
    :class="cn('flex flex-wrap gap-1 text-sm leading-relaxed', props.class)"
    data-slot="transcription"
    v-bind="$attrs"
  >
    <template v-for="(segment, index) in segments" :key="`${segment.startSecond}-${segment.endSecond}`">
      <slot v-if="segment.text.trim()" :segment="segment" :index="index" />
    </template>
  </div>
</template>
