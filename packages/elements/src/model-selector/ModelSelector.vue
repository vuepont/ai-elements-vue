<script setup lang="ts">
import { Dialog } from '@repo/shadcn-vue/components/ui/dialog'
</script>

<template>
  <Dialog v-bind="$attrs">
    <slot />
  </Dialog>
</template>
