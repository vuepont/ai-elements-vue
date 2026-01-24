<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useStackTraceContext } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { trace } = useStackTraceContext('StackTraceErrorType')
</script>

<template>
  <span
    :class="cn('shrink-0 font-semibold text-destructive', props.class)"
    v-bind="$attrs"
  >
    <slot>{{ trace.errorType }}</slot>
  </span>
</template>
