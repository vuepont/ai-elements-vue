<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="cn('flex items-center justify-between gap-2 rounded-t-md bg-secondary p-2', props.class)"
  >
    <slot />
  </div>
</template>
