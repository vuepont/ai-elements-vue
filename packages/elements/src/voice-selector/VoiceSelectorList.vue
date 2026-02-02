<script setup lang="ts">
import { CommandList } from '@repo/shadcn-vue/components/ui/command'
</script>

<template>
  <CommandList v-bind="$attrs">
    <slot />
  </CommandList>
</template>
