<script setup lang="ts">
import { CommandGroup } from '@repo/shadcn-vue/components/ui/command'

interface Props {
  heading?: string
}

defineProps<Props>()
</script>

<template>
  <CommandGroup
    :heading="heading"
    v-bind="$attrs"
  >
    <slot />
  </CommandGroup>
</template>
