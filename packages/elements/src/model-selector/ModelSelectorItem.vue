<script setup lang="ts">
import { CommandItem } from '@repo/shadcn-vue/components/ui/command'

const props = defineProps<{
  value: string
}>()
</script>

<template>
  <CommandItem v-bind="$attrs" :value="props.value">
    <slot />
  </CommandItem>
</template>
