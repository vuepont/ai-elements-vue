<script setup lang="ts">
import { HoverCard } from '@repo/shadcn-vue/components/ui/hover-card'

withDefaults(defineProps<{
  closeDelay?: number
  openDelay?: number
}>(), {
  closeDelay: 0,
  openDelay: 0,
})
</script>

<template>
  <HoverCard :close-delay="closeDelay" :open-delay="openDelay">
    <slot />
  </HoverCard>
</template>
