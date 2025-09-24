<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { BranchContext } from './context'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, provide, ref } from 'vue'
import { BranchContextKey } from './context'

interface Props {
  class?: HTMLAttributes['class']
  defaultBranch?: number
  onBranchChange?: (index: number) => void
}

const props = withDefaults(defineProps<Props>(), {
  defaultBranch: 0,
})

const currentBranch = ref<number>(props.defaultBranch)
const totalBranches = ref<number>(0)

function handleBranchChange(index: number) {
  currentBranch.value = index
  props.onBranchChange?.(index)
}

function goToPrevious() {
  if (totalBranches.value === 0)
    return
  const next = currentBranch.value > 0 ? currentBranch.value - 1 : totalBranches.value - 1
  handleBranchChange(next)
}

function goToNext() {
  if (totalBranches.value === 0)
    return
  const next = currentBranch.value < totalBranches.value - 1 ? currentBranch.value + 1 : 0
  handleBranchChange(next)
}

function setTotalBranches(count: number) {
  totalBranches.value = count
}

const context: BranchContext = {
  currentBranch,
  totalBranches,
  goToPrevious,
  goToNext,
  setTotalBranches,
}

provide(BranchContextKey, context)

const classes = computed(() => cn('grid w-full gap-2 [&>div]:pb-0', props.class))
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
