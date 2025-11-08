<script setup lang="ts">
import { computed } from 'vue'
import { useConfirmationContext } from './context'

const context = useConfirmationContext()

const shouldRender = computed(
  () => context.value.state === 'approval-requested',
)
</script>

<template>
  <template v-if="shouldRender">
    <slot />
  </template>
</template>
