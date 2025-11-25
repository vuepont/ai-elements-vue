---
title: Workflow
description: An example of how to use the AI Elements Vue to build a workflow visualization.
icon: lucide:workflow
---

An example of how to use the AI Elements Vue to build a workflow visualization with interactive nodes and animated connections, built with [Vue Flow](https://vueflow.dev/).

:::ComponentLoader{label="Workflow" componentName="Workflow"}
:::

## Tutorial

Let's walk through how to build a workflow visualization using AI Elements Vue. Our example will include custom nodes with headers, content, and footers, along with animated and temporary edge types.

::steps
  ### Setup

  First, set up a new Vue.js repo by running the following command:

  :pm-x{command="create-vite@latest ai-workflow --template vue-ts"}

  ::alert{type="info" icon="lucide:book"}
    Follow this [guide](https://www.shadcn-vue.com/docs/installation/vite.html) to setup **shadcn/vue** and **Tailwind**.
  ::

  Run the following command to install AI Elements:

  :pm-x{command="ai-elements-vue@latest"}

  Now, install the required dependencies:

  :pm-install{name="@vue-flow/core @vue-flow/background @vue-flow/controls @vue-flow/node-toolbar"}

  Now let's build the workflow step by step: create the component structure, define our nodes and edges, and configure the canvas.

  ### Import the components

  Import the necessary AI Elements Vue components in your `src/App.vue`:

  ```vue [src/App.vue]
  <script setup lang="ts">
  import type { EdgeTypesObject, NodeTypesObject } from '@vue-flow/core'
  import { markRaw } from 'vue'
  import { Canvas } from '@/components/ai-elements/canvas'
  import { Connection } from '@/components/ai-elements/connection'
  import { Controls } from '@/components/ai-elements/controls'
  import { Animated, Temporary } from '@/components/ai-elements/edge'
  import { Panel } from '@/components/ai-elements/panel'
  import CustomNode from '@/components/custom-node.vue'
  import { Button } from '@/components/ui/button'
  </script>
  ```

  ### Define node IDs

  Create a constant object to manage node identifiers. This makes it easier to reference nodes when creating edges:

  ```ts [src/App.vue]
  const nodeIds = {
    start: 'start',
    process1: 'process1',
    process2: 'process2',
    decision: 'decision',
    output1: 'output1',
    output2: 'output2',
  }
  ```

  ### Create mock nodes

  Define the nodes array with position, type, and data for each node in your workflow:

  ```ts [src/App.vue] height=200 collapse
  const nodes = [
    {
      id: nodeIds.start,
      type: 'workflow',
      position: { x: 0, y: 0 },
      data: {
        label: 'Start',
        description: 'Initialize workflow',
        handles: { target: false, source: true },
        content: 'Triggered by user action at 09:30 AM',
        footer: 'Status: Ready',
      },
    },
    {
      id: nodeIds.process1,
      type: 'workflow',
      position: { x: 500, y: 0 },
      data: {
        label: 'Process Data',
        description: 'Transform input',
        handles: { target: true, source: true },
        content: 'Validating 1,234 records and applying business rules',
        footer: 'Duration: ~2.5s',
      },
    },
    {
      id: nodeIds.decision,
      type: 'workflow',
      position: { x: 1000, y: 0 },
      data: {
        label: 'Decision Point',
        description: 'Route based on conditions',
        handles: { target: true, source: true },
        content: 'Evaluating: data.status === \'valid\' && data.score > 0.8',
        footer: 'Confidence: 94%',
      },
    },
    {
      id: nodeIds.output1,
      type: 'workflow',
      position: { x: 1500, y: -300 },
      data: {
        label: 'Success Path',
        description: 'Handle success case',
        handles: { target: true, source: true },
        content: '1,156 records passed validation (93.7%)',
        footer: 'Next: Send to production',
      },
    },
    {
      id: nodeIds.output2,
      type: 'workflow',
      position: { x: 1500, y: 300 },
      data: {
        label: 'Error Path',
        description: 'Handle error case',
        handles: { target: true, source: true },
        content: '78 records failed validation (6.3%)',
        footer: 'Next: Queue for review',
      },
    },
    {
      id: nodeIds.process2,
      type: 'workflow',
      position: { x: 2000, y: 0 },
      data: {
        label: 'Complete',
        description: 'Finalize workflow',
        handles: { target: true, source: false },
        content: 'All records processed and routed successfully',
        footer: 'Total time: 4.2s',
      },
    },
  ]
  ```

  ### Create mock edges

  Define the connections between nodes. Use `animated` for active paths and `temporary` for conditional or error paths:

  ```ts [src/App.vue] height=200 collapse
  const edges = [
    {
      id: 'edge1',
      source: nodeIds.start,
      target: nodeIds.process1,
      type: 'animated',
    },
    {
      id: 'edge2',
      source: nodeIds.process1,
      target: nodeIds.decision,
      type: 'animated',
    },
    {
      id: 'edge3',
      source: nodeIds.decision,
      target: nodeIds.output1,
      type: 'animated',
    },
    {
      id: 'edge4',
      source: nodeIds.decision,
      target: nodeIds.output2,
      type: 'temporary',
    },
    {
      id: 'edge5',
      source: nodeIds.output1,
      target: nodeIds.process2,
      type: 'animated',
    },
    {
      id: 'edge6',
      source: nodeIds.output2,
      target: nodeIds.process2,
      type: 'temporary',
    },
  ]
  ```

  ### Create the node types

  Create a custom node component:

  ```vue [src/components/custom-node.vue] height=200 collapse
  <script setup lang="ts">
  import type { NodeProps } from '@vue-flow/core'
  import { Node, NodeContent, NodeDescription, NodeFooter, NodeHeader, NodeTitle } from '@/components/ai-elements/node'

  const props = defineProps<NodeProps>()
  </script>

  <template>
    <Node :handles="props.data?.handles">
      <NodeHeader>
        <NodeTitle>{{ props.data?.label }}</NodeTitle>
        <NodeDescription>{{ props.data?.description }}</NodeDescription>
      </NodeHeader>

      <NodeContent>
        <p class="text-sm">
          {{ props.data?.content }}
        </p>
      </NodeContent>

      <NodeFooter>
        <p class="text-muted-foreground text-xs">
          {{ props.data?.footer }}
        </p>
      </NodeFooter>
    </Node>
  </template>
  ```

  Define the node types to use the custom Node component:

  ```ts [src/App.vue]
  const nodeTypes: NodeTypesObject = {
    workflow: markRaw(CustomNode),
  }
  ```

  ### Create the edge types

  Map the edge type names to the Edge components:

  ```ts [src/App.vue]
  const edgeTypes: EdgeTypesObject = {
    animated: markRaw(Animated),
    temporary: markRaw(Temporary),
  }
  ```

  ### Create the template

  Finally, create the template that combines the Canvas with all nodes, edges, controls, and custom UI panels:

  ```vue [src/App.vue]
  <template>
    <div class="h-screen w-screen">
      <Canvas :nodes="nodes" :edges="edges" :node-types="nodeTypes" :edge-types="edgeTypes">
        <template #connection-line="connectionLineProps">
          <Connection v-bind="connectionLineProps" />
        </template>

        <Controls />

        <Panel position="top-right">
          <Button size="sm" variant="secondary">
            Export
          </Button>
        </Panel>
      </Canvas>
    </div>
  </template>
  ```
::

### Key Features

The workflow visualization demonstrates several powerful features:

- **Custom Node Components**: Each node uses the compound components (`NodeHeader`, `NodeTitle`, `NodeDescription`, `NodeContent`, `NodeFooter`) for consistent, structured layouts.

- **Node Toolbars**: The `Toolbar` component attaches contextual actions (like Edit and Delete buttons) to individual nodes, appearing when hovering or selecting them.

- **Handle Configuration**: Nodes can have source and/or target handles, controlling which connections are possible.

- **Multiple Edge Types**: The `animated` type shows active data flow, while `temporary` indicates conditional or error paths.

- **Custom Connection Lines**: The `Connection` component provides styled bezier curves when dragging new connections between nodes.

- **Interactive Controls**: The `Controls` component adds zoom in/out and fit view buttons with a modern, themed design.

- **Custom UI Panels**: The `Panel` component allows you to position custom UI elements (like buttons, filters, or legends) anywhere on the canvas.

- **Automatic Layout**: The `Canvas` component auto-fits the view and provides pan/zoom controls out of the box.

You now have a working workflow visualization! Feel free to explore dynamic workflows by connecting this to AI-generated process flows, or extend it with interactive editing capabilities using Vue Flow's built-in features.
