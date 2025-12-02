<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Carousel } from '@repo/shadcn-vue/components/ui/carousel'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Carousel :class="cn('w-full', props.class)" :opts="{ loop: true }">
    <slot />
  </Carousel>
</template>
