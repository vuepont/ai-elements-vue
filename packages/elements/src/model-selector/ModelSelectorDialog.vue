<script setup lang="ts">
import { CommandDialog } from '@repo/shadcn-vue/components/ui/command'
</script>

<template>
  <CommandDialog v-bind="$attrs">
    <slot />
  </CommandDialog>
</template>
