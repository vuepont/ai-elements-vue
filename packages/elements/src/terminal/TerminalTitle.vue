<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { TerminalIcon } from 'lucide-vue-next'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="cn('flex items-center gap-2 text-sm text-zinc-400', props.class)"
    v-bind="$attrs"
  >
    <TerminalIcon class="size-4" />
    <slot>Terminal</slot>
  </div>
</template>
