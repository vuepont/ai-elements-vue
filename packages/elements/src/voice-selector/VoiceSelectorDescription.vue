<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

defineProps<Props>()
</script>

<template>
  <span
    :class="cn('text-muted-foreground text-xs', $props.class)"
    v-bind="$attrs"
  >
    <slot />
  </span>
</template>
