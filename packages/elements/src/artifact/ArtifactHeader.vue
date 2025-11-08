<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="
      cn(
        'flex items-center justify-between border-b bg-muted/50 px-4 py-3',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
