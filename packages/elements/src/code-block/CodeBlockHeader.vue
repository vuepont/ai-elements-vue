<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="cn(
      'flex items-center justify-between bg-muted/80 px-3 py-2 text-muted-foreground text-xs',
      props.class,
    )"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
