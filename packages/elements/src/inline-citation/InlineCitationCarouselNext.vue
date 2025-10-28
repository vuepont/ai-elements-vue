<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useCarousel } from '@repo/shadcn-vue/components/ui/carousel'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ArrowRight } from 'lucide-vue-next'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { scrollNext } = useCarousel()
</script>

<template>
  <button
    :class="cn('shrink-0', props.class)"
    type="button"
    aria-label="Next"
    @click="scrollNext"
  >
    <ArrowRight class="size-4 text-muted-foreground" />
  </button>
</template>
