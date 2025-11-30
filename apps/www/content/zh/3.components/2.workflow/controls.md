---
title: 控件
description: 一个用于基于 Vue Flow 的画布的样式化控件组件，具有缩放和适应视图功能。
icon: lucide:maximize-2
---

`Controls` 组件为 Vue Flow 画布提供了交互式缩放和适应视图控件。
它包括一个现代的主题设计，具有背景模糊和卡片样式。

::alert{type="info" icon="lucide:info"}
  The Controls component is designed to be used with the [Canvas](/components/workflow/canvas) component. See the [Workflow](/examples/workflow) demo for a full example.
::

## Install using CLI

::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add controls
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/controls.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

::code-group
  ```vue [Controls.vue] height=260 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { Controls as ControlsPrimitive } from '@vue-flow/controls'
  import { reactiveOmit } from '@vueuse/core'
  import '@vue-flow/controls/dist/style.css'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()

  const delegatedProps = reactiveOmit(props, 'class')
  </script>

  <template>
    <ControlsPrimitive
      data-slot="controls"
      v-bind="delegatedProps"
      :class="cn(
        'gap-px overflow-hidden rounded-md border bg-card p-1 shadow-none!',
        '[&>button]:rounded-md [&>button]:border-none! [&>button]:bg-transparent! [&>button]:hover:bg-secondary!',
        props.class,
      )"
    />
  </template>
  ```

  ```ts [index.ts]
  export { default as Controls } from './Controls.vue'
  ```
::

## Features

- Zoom in/out controls
- Fit view button to center and scale content
- Rounded pill design with backdrop blur
- Theme-aware card background
- Subtle drop shadow for depth
- Full TypeScript support
- Compatible with all Vue Flow control features

## Props

### `<Controls />`

::field{name="class" type="string" defaultValue="''"}
Additional CSS classes to apply to the controls.
::
