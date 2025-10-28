<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <blockquote
    :class="cn('border-muted border-l-2 pl-3 text-muted-foreground text-sm italic', props.class)"
  >
    <slot />
  </blockquote>
</template>
