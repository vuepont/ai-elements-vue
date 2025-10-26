<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface QueueItemIndicatorProps {
  completed?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(
  defineProps<QueueItemIndicatorProps>(),
  {
    completed: false,
  },
)
</script>

<template>
  <span
    :class="
      cn(
        'mt-0.5 inline-block size-2.5 rounded-full border',
        props.completed
          ? 'border-muted-foreground/20 bg-muted-foreground/10'
          : 'border-muted-foreground/50',
        props.class,
      )
    "
  />
</template>
