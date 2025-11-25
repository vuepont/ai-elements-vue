<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
  title?: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'No messages yet',
  description: 'Start a conversation to see messages here',
})
</script>

<template>
  <div
    :class="cn(
      'flex size-full flex-col items-center justify-center gap-3 p-8 text-center',
      props.class,
    )"
    v-bind="$attrs"
  >
    <slot>
      <div v-if="$slots.icon" class="text-muted-foreground">
        <slot name="icon" />
      </div>

      <div class="space-y-1">
        <h3 class="font-medium text-sm">
          {{ props.title }}
        </h3>
        <p v-if="props.description" class="text-muted-foreground text-sm">
          {{ props.description }}
        </p>
      </div>
    </slot>
  </div>
</template>
