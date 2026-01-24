<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  passed?: number
  failed?: number
  skipped?: number
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  passed: 0,
  failed: 0,
  skipped: 0,
})
</script>

<template>
  <div
    :class="cn('ml-auto flex items-center gap-2 text-xs', props.class)"
    v-bind="$attrs"
  >
    <slot>
      <span
        v-if="props.passed > 0"
        class="text-green-600 dark:text-green-400"
      >
        {{ props.passed }} passed
      </span>
      <span
        v-if="props.failed > 0"
        class="text-red-600 dark:text-red-400"
      >
        {{ props.failed }} failed
      </span>
      <span
        v-if="props.skipped > 0"
        class="text-yellow-600 dark:text-yellow-400"
      >
        {{ props.skipped }} skipped
      </span>
    </slot>
  </div>
</template>
