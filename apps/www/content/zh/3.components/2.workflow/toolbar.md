---
title: 工具栏
description: 一个用于 Vue Flow 节点的样式化工具栏组件，具有灵活的定位和自定义操作。
icon: lucide:dock
---

`Toolbar` 组件提供了一个定位工具栏，附加到 Vue Flow 画布中的节点。
它具有现代卡片样式，具有背景模糊和用于操作按钮和控件的 flexbox 布局。

::alert{type="info" icon="lucide:info"}
  The Toolbar component is designed to be used with the [Node](/components/workflow/node) component. See the [Workflow](/examples/workflow) demo for a full example.
::

## Install using CLI

::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add toolbar
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/toolbar.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

::code-group
  ```vue [Toolbar.vue] height=260 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { Position } from '@vue-flow/core'
  import { NodeToolbar } from '@vue-flow/node-toolbar'
  import { reactiveOmit } from '@vueuse/core'

  const props = withDefaults(
    defineProps<{
      class?: HTMLAttributes['class']
      position?: Position
    }>(),
    {
      position: Position.Bottom,
    },
  )

  const delegatedProps = reactiveOmit(props, 'class')
  </script>

  <template>
    <NodeToolbar
      data-slot="toolbar"
      v-bind="delegatedProps"
      :class="cn(
        'flex items-center gap-1 rounded-sm border bg-background p-1.5',
        props.class,
      )"
    >
      <slot />
    </NodeToolbar>
  </template>
  ```

  ```ts [index.ts]
  export { default as Toolbar } from './Toolbar.vue'
  ```
::

## Features

- Attaches to any Vue Flow node
- Bottom positioning by default
- Rounded card design with border
- Theme-aware background styling
- Flexbox layout with gap spacing
- Full TypeScript support
- Compatible with all Vue Flow NodeToolbar features

## Props

### `<Toolbar />`

::field-group
  ::field{name="class" type="string" defaultValue="''" optional}
  Additional CSS classes to apply to the toolbar.
  ::

  ::field{name="position" type="Position" defaultValue="bottom" optional}
  Position of the toolbar on the node.
  ::
::
