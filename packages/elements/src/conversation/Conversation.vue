<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { StickToBottom } from 'vue-stick-to-bottom'

interface Props {
  ariaLabel?: string
  class?: HTMLAttributes['class']
  initial?: boolean | 'instant' | { damping?: number, stiffness?: number, mass?: number }
  resize?: 'instant' | { damping?: number, stiffness?: number, mass?: number }
  damping?: number
  stiffness?: number
  mass?: number
  anchor?: 'auto' | 'none'
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: 'Conversation',
  initial: true,
  damping: 0.7,
  stiffness: 0.05,
  mass: 1.25,
  anchor: 'none',
})
</script>

<template>
  <StickToBottom
    :aria-label="props.ariaLabel"
    :class="cn('relative flex-1 overflow-y-hidden', props.class)"
    role="log"
    :initial="props.initial"
    :resize="props.resize"
    :damping="props.damping"
    :stiffness="props.stiffness"
    :mass="props.mass"
    :anchor="props.anchor"
  >
    <slot />
  </StickToBottom>
</template>
