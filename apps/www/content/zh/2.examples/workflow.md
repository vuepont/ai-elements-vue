---
title: 工作流
description: 一个使用 AI Elements Vue 构建工作流可视化的示例。
icon: lucide:workflow
---

一个使用 AI Elements Vue 构建工作流可视化的示例，包含交互式节点和动画连接，基于 [Vue Flow](https://vueflow.dev/) 构建。

:::ComponentLoader{label="Workflow" componentName="Workflow"}
:::

## 教程

让我们逐步了解如何使用 AI Elements Vue 构建工作流可视化。我们的示例将包括带有标题、内容和页脚的自定义节点，以及动画和临时边类型。

::steps
  ### 设置

  首先，通过运行以下命令创建一个新的 Vue.js 项目：

  :pm-x{command="create-vite@latest ai-workflow --template vue-ts"}

  ::alert{type="info" icon="lucide:book"}
    按照此[指南](https://www.shadcn-vue.com/docs/installation/vite.html)设置 **shadcn/vue** 和 **Tailwind**。
  ::

  运行以下命令安装 AI Elements：

  :pm-x{command="ai-elements-vue@latest"}

  现在，安装所需的依赖项：

  :pm-install{name="@vue-flow/core @vue-flow/background @vue-flow/controls @vue-flow/node-toolbar"}

  现在让我们逐步构建工作流：创建组件结构，定义节点和边，并配置画布。

  ### 导入组件

  在您的 `src/App.vue` 中导入必要的 AI Elements Vue 组件：

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

  ### 定义节点 ID

  创建一个常量对象来管理节点标识符。这使得在创建边时更容易引用节点：

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

  ### 创建模拟节点

  为工作流中的每个节点定义包含位置、类型和数据的节点数组：

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

  ### 创建模拟边

  定义节点之间的连接。使用 `animated` 表示活动路径，使用 `temporary` 表示条件或错误路径：

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

  ### 创建节点类型

  创建一个自定义节点组件：

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

  定义节点类型以使用自定义 Node 组件：

  ```ts [src/App.vue]
  const nodeTypes: NodeTypesObject = {
    workflow: markRaw(CustomNode),
  }
  ```

  ### 创建边类型

  将边类型名称映射到 Edge 组件：

  ```ts [src/App.vue]
  const edgeTypes: EdgeTypesObject = {
    animated: markRaw(Animated),
    temporary: markRaw(Temporary),
  }
  ```

  ### 创建模板

  最后，创建将 Canvas 与所有节点、边、控件和自定义 UI 面板组合在一起的模板：

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

### 主要特性

工作流可视化展示了几个强大的特性：

- **自定义节点组件**：每个节点使用复合组件（`NodeHeader`、`NodeTitle`、`NodeDescription`、`NodeContent`、`NodeFooter`）来实现一致的结构化布局。

- **节点工具栏**：`Toolbar` 组件将上下文操作（如编辑和删除按钮）附加到各个节点，在悬停或选择时出现。

- **句柄配置**：节点可以有源和/或目标句柄，控制哪些连接是可能的。

- **多种边类型**：`animated` 类型显示活动数据流，而 `temporary` 表示条件或错误路径。

- **自定义连接线**：`Connection` 组件在节点之间拖动新连接时提供样式化的贝塞尔曲线。

- **交互式控件**：`Controls` 组件添加了具有现代主题设计的缩放和适应视图按钮。

- **自定义 UI 面板**：`Panel` 组件允许您将自定义 UI 元素（如按钮、过滤器或图例）放置在画布上的任何位置。

- **自动布局**：`Canvas` 组件自动适应视图，并提供开箱即用的平移/缩放控件。

现在您有了一个可用的工作流可视化！可以自由探索动态工作流，将其连接到 AI 生成的过程流，或使用 Vue Flow 的内置功能扩展交互式编辑功能。
