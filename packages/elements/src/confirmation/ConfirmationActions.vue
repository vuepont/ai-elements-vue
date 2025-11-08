<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'
import { useConfirmationContext } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const context = useConfirmationContext()

const shouldRender = computed(
  () => context.value.state === 'approval-requested',
)
</script>

<template>
  <div
    v-if="shouldRender"
    :class="cn('flex items-center justify-end gap-2 self-end', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
