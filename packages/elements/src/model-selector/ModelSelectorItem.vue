<script setup lang="ts">
import { CommandItem } from '@repo/shadcn-vue/components/ui/command'
</script>

<template>
  <CommandItem v-bind="$attrs">
    <slot />
  </CommandItem>
</template>
