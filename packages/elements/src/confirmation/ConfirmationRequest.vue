<script setup lang="ts">
import { useConfirmation } from './context'

const { state } = useConfirmation()
</script>

<template>
  <template v-if="state === 'approval-requested'">
    <slot />
  </template>
</template>
