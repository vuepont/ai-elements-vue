<script setup lang="ts">
import type { EdgeProps } from '@vue-flow/core'
import { BaseEdge, getSimpleBezierPath } from '@vue-flow/core'
import { computed } from 'vue'

const props = defineProps<EdgeProps>()

const path = computed(() => {
  const [edgePath] = getSimpleBezierPath({
    sourceX: props.sourceX,
    sourceY: props.sourceY,
    sourcePosition: props.sourcePosition,
    targetX: props.targetX,
    targetY: props.targetY,
    targetPosition: props.targetPosition,
  })
  return edgePath
})
</script>

<template>
  <BaseEdge
    :id="props.id"
    :path="path"
    class="stroke-1 stroke-ring"
    :style="{ strokeDasharray: '5, 5' }"
  />
</template>
