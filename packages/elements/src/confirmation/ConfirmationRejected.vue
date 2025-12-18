<script setup lang="ts">
import { useConfirmation } from './context'

const { approval, state } = useConfirmation()
</script>

<template>
  <template
    v-if="
      approval?.approved === false
        && (state === 'approval-responded'
          || state === 'output-denied'
          || state === 'output-available')
    "
  >
    <slot />
  </template>
</template>
