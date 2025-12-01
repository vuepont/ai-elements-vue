<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface QueueItemDescriptionProps {
  completed?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(
  defineProps<QueueItemDescriptionProps>(),
  {
    completed: false,
  },
)
</script>

<template>
  <div
    :class="
      cn(
        'ml-6 text-xs',
        completed
          ? 'text-muted-foreground/40 line-through'
          : 'text-muted-foreground',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
