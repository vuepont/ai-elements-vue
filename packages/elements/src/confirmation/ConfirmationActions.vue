<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useConfirmation } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { state } = useConfirmation()
</script>

<template>
  <div
    v-if="state === 'approval-requested'"
    :class="
      cn('flex items-center justify-end gap-2 self-end', props.class)
    "
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
