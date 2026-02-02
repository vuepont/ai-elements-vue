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
    aria-hidden="true"
    :class="cn('select-none text-border', $props.class)"
    v-bind="$attrs"
  >
    &bull;
  </span>
</template>
