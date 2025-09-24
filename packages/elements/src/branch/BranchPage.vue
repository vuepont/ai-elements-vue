<script setup lang="ts">
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'
import { useBranchContext } from './context'

interface Props {
  class?: string
}

const props = defineProps<Props>()
const { currentBranch, totalBranches } = useBranchContext()

const classes = computed(() => cn('font-medium text-muted-foreground text-xs tabular-nums', props.class))
</script>

<template>
  <span :class="classes">
    {{ (currentBranch + 1) }} of {{ totalBranches }}
  </span>
</template>
