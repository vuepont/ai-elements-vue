<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <p :class="cn('font-medium text-foreground text-sm', props.class)" v-bind="$attrs">
    <slot />
  </p>
</template>
