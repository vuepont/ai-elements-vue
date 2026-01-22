<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { GitCommitIcon } from 'lucide-vue-next'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <span :class="cn('font-mono text-xs', props.class)" v-bind="$attrs">
    <GitCommitIcon class="mr-1 inline-block size-3" />
    <slot />
  </span>
</template>
