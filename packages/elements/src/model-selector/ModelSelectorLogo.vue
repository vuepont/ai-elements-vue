<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  provider: string
}>()
</script>

<template>
  <img
    :alt="`${props.provider} logo`"
    :class="cn('size-3', props.class)"
    height="12"
    :src="`https://models.dev/logos/${props.provider}.svg`"
    width="12"
    v-bind="$attrs"
  >
</template>
