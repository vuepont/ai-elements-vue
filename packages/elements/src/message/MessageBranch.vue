<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import type { MessageBranchContextType } from './context'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { provide, readonly, ref } from 'vue'
import { MessageBranchKey } from './context'

interface Props {
  defaultBranch?: number
  class?: HTMLAttributes['class']
}
const props = withDefaults(defineProps<Props>(), {
  defaultBranch: 0,
})

const emits = defineEmits<{
  (e: 'branchChange', branchIndex: number): void
}>()

const currentBranch = ref<number>(props.defaultBranch)
const branches = ref<VNode[]>([])
const totalBranches = ref<number>(0)

function handleBranchChange(index: number) {
  currentBranch.value = index
  emits('branchChange', index)
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

function setBranches(count: number) {
  totalBranches.value = count
}

const contextValue: MessageBranchContextType = {
  currentBranch: readonly(currentBranch),
  totalBranches: readonly(totalBranches),
  goToPrevious,
  goToNext,
  branches,
  setBranches,
}

provide(MessageBranchKey, contextValue)
</script>

<template>
  <div
    :class="cn('grid w-full gap-2 [&>div]:pb-0', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
