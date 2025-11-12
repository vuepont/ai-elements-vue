<script setup lang="ts">
import type { EdgeProps, GraphNode, HandleElement } from '@vue-flow/core'
import { BaseEdge, getBezierPath, Position } from '@vue-flow/core'
import { computed } from 'vue'

const props = defineProps<EdgeProps>()

function getHandleCoordsByPosition(node: GraphNode, handlePosition: Position): readonly [number, number] {
  // Choose the handle type based on position - Left is for target, Right is for source
  const handleType: HandleElement['type'] = handlePosition === Position.Left ? 'target' : 'source'

  const handle = node.handleBounds?.[handleType]?.find(
    h => h.position === handlePosition,
  )

  if (!handle)
    return [0, 0] as const

  let offsetX = handle.width / 2
  let offsetY = handle.height / 2

  // this is a tiny detail to make the markerEnd of an edge visible.
  // The handle position that gets calculated has the origin top-left, so depending which side we are using, we add a little offset
  // when the handlePosition is Position.Right for example, we need to add an offset as big as the handle itself in order to get the correct position
  switch (handlePosition) {
    case Position.Left:
      offsetX = 0
      break
    case Position.Right:
      offsetX = handle.width
      break
    case Position.Top:
      offsetY = 0
      break
    case Position.Bottom:
      offsetY = handle.height
      break
    default:
      throw new Error(`Invalid handle position: ${handlePosition}`)
  }

  const x = node.computedPosition.x + handle.x + offsetX
  const y = node.computedPosition.y + handle.y + offsetY

  return [x, y] as const
}

function getEdgeParams(source: GraphNode, target: GraphNode) {
  const sourcePos = Position.Right
  const [sx, sy] = getHandleCoordsByPosition(source, sourcePos)
  const targetPos = Position.Left
  const [tx, ty] = getHandleCoordsByPosition(target, targetPos)
  return { sx, sy, tx, ty, sourcePos, targetPos }
}

const path = computed(() => {
  const sourceNode = props.sourceNode
  const targetNode = props.targetNode
  if (!sourceNode || !targetNode)
    return ''

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode,
  )

  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetX: tx,
    targetY: ty,
    targetPosition: targetPos,
  })
  return edgePath
})
</script>

<template>
  <g v-if="path">
    <BaseEdge
      :id="props.id"
      :marker-end="markerEnd"
      :path="path"
      :style="style"
    />
    <circle fill="var(--primary)" r="4">
      <animateMotion dur="2s" :path="path" repeatCount="indefinite" />
    </circle>
  </g>
</template>
