<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import CardContent from '@repo/shadcn-vue/components/ui/card/CardContent.vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <CardContent :class="cn('p-3', props.class)">
    <slot />
  </CardContent>
</template>
