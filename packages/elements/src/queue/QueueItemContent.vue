<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface QueueItemContentProps {
  completed?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(
  defineProps<QueueItemContentProps>(),
  {
    completed: false,
  },
)
</script>

<template>
  <span
    :class="
      cn(
        'line-clamp-1 grow break-words',
        props.completed
          ? 'text-muted-foreground/50 line-through'
          : 'text-muted-foreground',
        props.class,
      )
    "
  >
    <slot />
  </span>
</template>
