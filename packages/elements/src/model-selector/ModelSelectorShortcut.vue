<script setup lang="ts">
import { CommandShortcut } from '@repo/shadcn-vue/components/ui/command'
</script>

<template>
  <CommandShortcut v-bind="$attrs">
    <slot />
  </CommandShortcut>
</template>
