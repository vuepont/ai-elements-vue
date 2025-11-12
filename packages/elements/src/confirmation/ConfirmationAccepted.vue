<script setup lang="ts">
import { useConfirmationContext } from './context'

const { approval, state } = useConfirmationContext()
</script>

<template>
  <template
    v-if="
      approval?.approved
        && (state === 'approval-responded'
          || state === 'output-denied'
          || state === 'output-available')
    "
  >
    <slot />
  </template>
</template>
