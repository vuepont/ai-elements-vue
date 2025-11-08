<script setup lang="ts">
import { CommandEmpty } from '@repo/shadcn-vue/components/ui/command'
</script>

<template>
  <CommandEmpty v-bind="$attrs">
    <slot />
  </CommandEmpty>
</template>
