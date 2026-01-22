---
title: Canvas
description: A Vue Flow-based canvas component for building interactive node-based interfaces.
icon: lucide:layout-grid
---

The `Canvas` component provides a Vue Flow-based canvas for building interactive node-based interfaces.
It comes pre-configured with sensible defaults for AI applications, including panning, zooming, and selection behaviors.

::alert{type="info" icon="lucide:info"}
  The Canvas component is designed to be used with the [Node](/components/workflow/node) and [Edge](/components/workflow/edge) components. See the [Workflow](/examples/workflow) demo for a full example.
::

## Install using CLI

::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add canvas
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/canvas.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

::code-group
  ```vue [Canvas.vue] height=500 collapse
  <script setup lang="ts">
  import type { FlowEmits, FlowProps, FlowSlots } from '@vue-flow/core'
  import { Background } from '@vue-flow/background'
  import { VueFlow } from '@vue-flow/core'
  import { useForwardPropsEmits } from 'reka-ui'
  import '@vue-flow/core/dist/style.css'
  import '@vue-flow/core/dist/theme-default.css'

  const props = withDefaults(defineProps<FlowProps>(), {
    deleteKeyCode: () => ['Backspace', 'Delete'],
    fitViewOnInit: true,
    panOnDrag: false,
    panOnScroll: true,
    selectNodesOnDrag: true,
    zoomOnDoubleClick: false,
  })

  const emits = defineEmits<FlowEmits>()
  const slots = defineSlots<FlowSlots>()
  const forwarded = useForwardPropsEmits(props, emits)
  </script>

  <template>
    <VueFlow data-slot="canvas" v-bind="forwarded">
      <Background />

      <template v-if="slots['connection-line']" #connection-line="connectionLineProps">
        <slot name="connection-line" v-bind="connectionLineProps" />
      </template>

      <template v-if="slots['zoom-pane']" #zoom-pane>
        <slot name="zoom-pane" />
      </template>

      <slot />
    </VueFlow>
  </template>
  ```

  ```ts [index.ts]
  export { default as Canvas } from './Canvas.vue'
  ```
::

## Features

- Pre-configured Vue Flow canvas with AI-optimized defaults
- Pan on scroll enabled for intuitive navigation
- Selection on drag for multi-node operations
- Customizable background color using CSS variables
- Delete key support (Backspace and Delete keys)
- Auto-fit view to show all nodes
- Disabled double-click zoom for better UX
- Disabled pan on drag to prevent accidental canvas movement
- Fully compatible with Vue Flow props and API

## Props

### `<Canvas />`

::field-group
  ::field{name="<slot />" type="FlowSlots" optional}
  Child components like Background, Controls, or MiniMap.
  ::

  ::field{name="props" type="FlowProps" optional}
  Any other Vue Flow props like nodes, edges, nodeTypes, edgeTypes, onNodesChange, etc.
  ::
::
