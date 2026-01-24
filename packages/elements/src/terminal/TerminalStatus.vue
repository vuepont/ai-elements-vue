<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Shimmer } from '@repo/elements/shimmer'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useTerminalContext } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { isStreaming } = useTerminalContext('TerminalStatus')
</script>

<template>
  <div
    v-if="isStreaming"
    :class="cn('flex items-center gap-2 text-xs text-zinc-400', props.class)"
    v-bind="$attrs"
  >
    <slot>
      <Shimmer class="w-16" />
    </slot>
  </div>
</template>
