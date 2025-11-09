<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import CardFooter from '@repo/shadcn-vue/components/ui/card/CardFooter.vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <CardFooter :class="cn('rounded-b-md border-t bg-secondary p-3!', props.class)">
    <slot />
  </CardFooter>
</template>
