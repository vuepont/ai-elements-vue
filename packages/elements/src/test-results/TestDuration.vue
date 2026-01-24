<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useTestContext } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { duration } = useTestContext()
</script>

<template>
  <span
    v-if="duration !== undefined"
    :class="cn('ml-auto text-muted-foreground text-xs', props.class)"
    v-bind="$attrs"
  >
    <slot>{{ duration }}ms</slot>
  </span>
</template>
