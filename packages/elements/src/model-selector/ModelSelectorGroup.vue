<script setup lang="ts">
import { CommandGroup } from '@repo/shadcn-vue/components/ui/command'
</script>

<template>
  <CommandGroup v-bind="$attrs">
    <slot />
  </CommandGroup>
</template>
