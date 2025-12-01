<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = withDefaults(
  defineProps<{
    label: string
    description?: string
    status?: 'complete' | 'active' | 'pending'
    class?: HTMLAttributes['class']
  }>(),
  {
    status: 'complete',
    description: undefined,
  },
)

const statusStyles = {
  complete: 'text-muted-foreground',
  active: 'text-foreground',
  pending: 'text-muted-foreground/50',
}
</script>

<template>
  <div
    :class="
      cn(
        'flex gap-2 text-sm',
        statusStyles[status],
        'fade-in-0 slide-in-from-top-2 animate-in',
        props.class as string,
      )
    "
    v-bind="$attrs"
  >
    <div class="relative mt-0.5">
      <slot name="icon" />
      <div
        class="-mx-px absolute top-7 bottom-0 left-1/2 w-px bg-border"
      />
    </div>
    <div class="flex-1 space-y-2">
      <div>{{ label }}</div>
      <div
        v-if="description"
        class="text-muted-foreground text-xs"
      >
        {{ description }}
      </div>
      <slot />
    </div>
  </div>
</template>
