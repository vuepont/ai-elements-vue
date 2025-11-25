<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  provider: string
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <img
    v-bind="$attrs"
    :alt="`${props.provider} logo`"
    :class="cn('size-3 dark:invert', props.class)"
    height="12"
    :src="`https://models.dev/logos/${props.provider}.svg`"
    width="12"
  >
</template>
