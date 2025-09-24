<script setup lang="ts">
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, Fragment, isVNode, onMounted, useAttrs, useSlots, watch } from 'vue'
import { useBranchContext } from './context'

interface Props {
  class?: string
}

const props = defineProps<Props>()
const attrs = useAttrs()
const slots = useSlots()

const { currentBranch, setTotalBranches } = useBranchContext()

const branchVNodes = computed(() => {
  const nodes = slots.default?.() ?? []

  const extractChildren = (node: any): any[] => {
    if (isVNode(node) && node.type === Fragment) {
      return Array.isArray(node.children) ? node.children : []
    }
    return [node]
  }

  const allNodes = nodes.flatMap(extractChildren)

  return allNodes.filter((node) => {
    if (!isVNode(node))
      return false
    return node.type && typeof node.type === 'object'
  })
})

// Keep total branches in sync with rendered children
const sync = () => setTotalBranches(branchVNodes.value.length)
onMounted(sync)
watch(branchVNodes, sync)

const baseClasses = computed(() => cn('grid gap-2 overflow-hidden [&>div]:pb-0', props.class))
</script>

<template>
  <template v-for="(node, index) in branchVNodes" :key="(node.key as any) ?? index">
    <div
      :class="cn(baseClasses, index === currentBranch ? 'block' : 'hidden')"
      v-bind="attrs"
    >
      <component :is="node" />
    </div>
  </template>
</template>
