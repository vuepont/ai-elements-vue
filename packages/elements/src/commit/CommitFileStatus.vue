<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  status: 'added' | 'modified' | 'deleted' | 'renamed'
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const fileStatusStyles = {
  added: 'text-green-600 dark:text-green-400',
  modified: 'text-yellow-600 dark:text-yellow-400',
  deleted: 'text-red-600 dark:text-red-400',
  renamed: 'text-blue-600 dark:text-blue-400',
}

const fileStatusLabels = {
  added: 'A',
  modified: 'M',
  deleted: 'D',
  renamed: 'R',
}
</script>

<template>
  <span
    :class="
      cn(
        'font-medium font-mono text-xs',
        fileStatusStyles[props.status],
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <slot>{{ fileStatusLabels[props.status] }}</slot>
  </span>
</template>
