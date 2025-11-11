<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="cn('flex items-center gap-1 border-b p-2', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
