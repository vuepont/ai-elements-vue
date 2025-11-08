<script setup lang="ts">
import { computed } from 'vue'
import { useConfirmationContext } from './context'

const context = useConfirmationContext()

const shouldRender = computed(() => {
  const { approval, state } = context.value

  if (approval?.approved !== false) {
    return false
  }

  return (
    state === 'approval-responded'
    || state === 'output-denied'
    || state === 'output-available'
  )
})
</script>

<template>
  <template v-if="shouldRender">
    <slot />
  </template>
</template>
