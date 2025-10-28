<script setup lang="ts">
import { HoverCard } from '@repo/shadcn-vue/components/ui/hover-card'

const props = withDefaults(defineProps<{
  closeDelay?: number
  openDelay?: number
}>(), {
  closeDelay: 0,
  openDelay: 0,
})
</script>

<template>
  <HoverCard :close-delay="props.closeDelay" :open-delay="props.openDelay">
    <slot />
  </HoverCard>
</template>
