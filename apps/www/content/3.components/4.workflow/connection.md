---
title: Connection
description: A custom connection line component for Vue Flow-based canvases with animated bezier curve styling.
icon: lucide:arrow-right-left
---

The `Connection` component provides a styled connection line for Vue Flow canvases.
It renders an animated bezier curve with a circle indicator at the target end, using consistent theming through CSS variables.

::alert{type="info" icon="lucide:info"}
  The Connection component is designed to be used with the [Canvas](/components/workflow/canvas) component. See the [Workflow](/examples/workflow) demo for a full example.
::

## Install using CLI

::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add connection
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/connection.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

::code-group
  ```vue [Connection.vue] height=500 collapse
  <script setup lang="ts">
  import type { ConnectionLineProps } from '@vue-flow/core'
  import { computed } from 'vue'

  const props = defineProps<ConnectionLineProps>()

  const HALF = 0.5

  const pathD = computed(() => {
    const { sourceX, sourceY, targetX, targetY } = props
    const controlX1 = sourceX + (targetX - sourceX) * HALF
    const controlX2 = sourceX + (targetX - sourceX) * HALF
    return `M${sourceX},${sourceY} C ${controlX1},${sourceY} ${controlX2},${targetY} ${targetX},${targetY}`
  })
  </script>

  <template>
    <g>
      <path
        class="animated"
        fill="none"
        stroke="var(--color-ring)"
        :stroke-width="1"
        :d="pathD"
      />

      <circle
        :cx="targetX"
        :cy="targetY"
        fill="#fff"
        :r="3"
        stroke="var(--color-ring)"
        :stroke-width="1"
      />
    </g>
  </template>
  ```

  ```ts [index.ts]
  export { default as Connection } from './Connection.vue'
  ```
::

## Features

- Smooth bezier curve animation for connection lines
- Visual indicator circle at the target position
- Theme-aware styling using CSS variables
- Cubic bezier curve calculation for natural flow
- Lightweight implementation with minimal props
- Full TypeScript support with Vue Flow types
- Compatible with Vue Flow's connection system

## Props

### `<Connection />`

::field-group
  ::field{name="sourceX" type="number" optional}
  The x-coordinate of the connection start point.
  ::

  ::field{name="sourceY" type="number" optional}
  The y-coordinate of the connection start point.
  ::

  ::field{name="targetX" type="number" optional}
  The x-coordinate of the connection end point.
  ::

  ::field{name="targetY" type="number" optional}
  The y-coordinate of the connection end point.
  ::
::
