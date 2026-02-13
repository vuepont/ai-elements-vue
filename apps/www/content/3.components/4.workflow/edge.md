---
title: Edge
description: Customizable edge components for Vue Flow canvases with animated and temporary states.
icon: lucide:link-2
---

The `Edge` component provides two pre-styled edge types for Vue Flow canvases: `Temporary` for dashed temporary connections and `Animated` for connections with animated indicators.

::alert{type="info" icon="lucide:info"}
  The Edge component is designed to be used with the [Canvas](/components/workflow/canvas) component. See the [Workflow](/examples/workflow) demo for a full example.
::

## Install using CLI

::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add edge
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/edge.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

::code-group
  ```vue [Temporary.vue] height=260 collapse
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
  ```

  ```vue [Animated.vue] height=500 collapse
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
  ```

  ```ts [index.ts]
  export { default as Animated } from './Animated.vue'
  export { default as Temporary } from './Temporary.vue'
  ```
::

## Features

- Two distinct edge types: Temporary and Animated
- Temporary edges use dashed lines with ring color
- Animated edges include a moving circle indicator
- Automatic handle position calculation
- Smart offset calculation based on handle type and position
- Uses Bezier curves for smooth, natural-looking connections
- Fully compatible with Vue Flow's edge system
- Type-safe implementation with TypeScript

## Edge Types

### `<Temporary />`

A dashed edge style for temporary or preview connections. Uses a simple Bezier path with a dashed stroke pattern.

### `<Animated />`

A solid edge with an animated circle that moves along the path. The animation repeats indefinitely with a 2-second duration, providing visual feedback for active connections.

## Props

Both `<Animated />` and `<Temporary />` components accept standard Vue Flow EdgeProps. The following are the most commonly used props:

::field-group
  ::field{name="id" type="string"}
  The unique identifier for the edge.
  ::

  ::field{name="source" type="string"}
  The ID of the source node.
  ::

  ::field{name="target" type="string"}
  The ID of the target node.
  ::

  ::field{name="sourceX" type="number"}
  The x-coordinate of the source connection point.
  ::

  ::field{name="sourceY" type="number"}
  The y-coordinate of the source connection point.
  ::

  ::field{name="targetX" type="number"}
  The x-coordinate of the target connection point.
  ::

  ::field{name="targetY" type="number"}
  The y-coordinate of the target connection point.
  ::

  ::field{name="sourcePosition" type="Position"}
  The position of the source handle.
  ::

  ::field{name="targetPosition" type="Position"}
  The position of the target handle.
  ::

  ::field{name="style" type="CSSProperties"}
  Custom CSS styles to apply to the edge.
  ::

  ::field{name="markerStart" type="string"}
  The marker ID for the start of the edge.
  ::

  ::field{name="markerEnd" type="string"}
  The marker ID for the end of the edge.
  ::
::
