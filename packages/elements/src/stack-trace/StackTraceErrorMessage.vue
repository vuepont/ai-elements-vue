<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { inject } from 'vue'
import { StackTraceKey } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const context = inject(StackTraceKey)

if (!context) {
  throw new Error('StackTraceErrorMessage must be used within StackTrace')
}

const { trace } = context
</script>

<template>
  <span :class="cn('truncate text-foreground', props.class)" v-bind="$attrs">
    <slot>{{ trace.errorMessage }}</slot>
  </span>
</template>
