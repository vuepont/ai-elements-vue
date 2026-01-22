<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="cn('not-prose w-full rounded-md border', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
