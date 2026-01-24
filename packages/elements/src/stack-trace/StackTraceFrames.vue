<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, inject } from 'vue'
import { StackTraceKey } from './context'
import { AT_PREFIX_REGEX } from './utils'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  showInternalFrames?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  showInternalFrames: true,
})

const context = inject(StackTraceKey)

if (!context) {
  throw new Error('StackTraceFrames must be used within StackTrace')
}

const { trace, onFilePathClick } = context

const framesToShow = computed(() => {
  return props.showInternalFrames
    ? trace.value.frames
    : trace.value.frames.filter(f => !f.isInternal)
})
</script>

<template>
  <div :class="cn('space-y-1 p-3', props.class)" v-bind="$attrs">
    <div
      v-for="(frame, index) in framesToShow"
      :key="`${frame.raw}-${index}`"
      :class="cn(
        'text-xs',
        frame.isInternal
          ? 'text-muted-foreground/50'
          : 'text-foreground/90',
      )"
    >
      <span class="text-muted-foreground">at </span>
      <span v-if="frame.functionName" :class="frame.isInternal ? '' : 'text-foreground'">
        {{ frame.functionName }}
      </span>
      <template v-if="frame.filePath">
        <span class="text-muted-foreground">(</span>
        <button
          :class="cn(
            'underline decoration-dotted hover:text-primary',
            onFilePathClick && 'cursor-pointer',
          )"
          :disabled="!onFilePathClick"
          type="button"
          @click="() => {
            if (frame.filePath && onFilePathClick) {
              onFilePathClick(
                frame.filePath,
                frame.lineNumber ?? undefined,
                frame.columnNumber ?? undefined,
              )
            }
          }"
        >
          {{ frame.filePath }}
          <template v-if="frame.lineNumber !== null">
            :{{ frame.lineNumber }}
          </template>
          <template v-if="frame.columnNumber !== null">
            :{{ frame.columnNumber }}
          </template>
        </button>
        <span class="text-muted-foreground">)</span>
      </template>
      <span v-else-if="!(frame.filePath || frame.functionName)">
        {{ frame.raw.replace(AT_PREFIX_REGEX, '') }}
      </span>
    </div>
    <div v-if="framesToShow.length === 0" class="text-muted-foreground text-xs">
      No stack frames
    </div>
  </div>
</template>
