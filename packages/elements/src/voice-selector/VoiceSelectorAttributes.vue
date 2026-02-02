<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

defineProps<Props>()
</script>

<template>
  <div
    :class="cn('flex items-center text-xs', $props.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
