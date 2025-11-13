<script setup lang="ts">
import { useConfirmationContext } from './context'

const { state } = useConfirmationContext()
</script>

<template>
  <template v-if="state === 'approval-requested'">
    <slot />
  </template>
</template>
