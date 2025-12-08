<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import CardHeader from '@repo/shadcn-vue/components/ui/card/CardHeader.vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
const className = computed(() => cn('gap-0.5 rounded-t-md border-b bg-secondary p-3!', props.class))
</script>

<template>
  <CardHeader :class="className">
    <slot />
  </CardHeader>
</template>
