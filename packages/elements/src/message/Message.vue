<script setup lang="ts">
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'

interface Props {
  from: 'user' | 'assistant'
  class?: string
}

const props = defineProps<Props>()

const classes = computed(() => cn(
  'group w-full py-4',
  props.from === 'user'
    ? 'is-user flex items-end justify-end gap-2'
    : 'is-assistant flex flex-row-reverse justify-end gap-2',
  props.class,
))
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
