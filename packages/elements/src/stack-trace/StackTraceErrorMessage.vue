<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useStackTraceContext } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { trace } = useStackTraceContext('StackTraceErrorMessage')
</script>

<template>
  <span :class="cn('truncate text-foreground', props.class)" v-bind="$attrs">
    <slot>{{ trace.errorMessage }}</slot>
  </span>
</template>
