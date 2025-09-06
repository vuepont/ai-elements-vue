<script setup lang="ts">
import { StickToBottom } from 'vue-stick-to-bottom'
import ConversationScrollButton from './ConversationScrollButton.vue'

interface Props {
  ariaLabel?: string
  class?: string
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
    class="relative flex-1"
    :class="[props.class]"
    role="log"
    :initial="props.initial"
    :resize="props.resize"
    :damping="props.damping"
    :stiffness="props.stiffness"
    :mass="props.mass"
    :anchor="props.anchor"
  >
    <slot />
    <ConversationScrollButton />
  </StickToBottom>
</template>
