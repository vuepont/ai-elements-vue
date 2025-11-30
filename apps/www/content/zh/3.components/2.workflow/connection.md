---
title: 连接
description: 一个用于基于 Vue Flow 的画布的自定义连接线组件，具有动画贝塞尔曲线样式。
icon: lucide:arrow-right-left
---

`Connection` 组件为 Vue Flow 画布提供了一条样式化的连接线。
它渲染一条动画贝塞尔曲线，在目标端有一个圆形指示器，通过 CSS 变量使用一致的主题。

::alert{type="info" icon="lucide:info"}
  The Connection component is designed to be used with the [Canvas](/components/workflow/canvas) component. See the [Workflow](/examples/workflow) demo for a full example.
::

## Install using CLI

::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add connection
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/connection.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

::code-group
  ```vue [Connection.vue] height=260 collapse
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
