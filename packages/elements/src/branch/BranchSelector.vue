<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, useAttrs } from 'vue'
import { useBranchContext } from './context'

interface Props {
  class?: HTMLAttributes['class']
  from: 'user' | 'assistant'
}

const props = defineProps<Props>()
const attrs = useAttrs()
const { totalBranches } = useBranchContext()

const classes = computed(() => cn(
  'flex items-center gap-2 self-end px-10',
  props.from === 'assistant' ? 'justify-start' : 'justify-end',
  props.class,
))
</script>

<template>
  <div v-if="totalBranches > 1" :class="classes" v-bind="attrs">
    <slot />
  </div>
  <template v-else />
</template>
