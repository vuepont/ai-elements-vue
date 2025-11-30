---
title: 面板
description: 一个用于基于 Vue Flow 的画布的样式化面板组件，用于定位自定义 UI 元素。
icon: lucide:panel-top
---

`Panel` 组件为 Vue Flow 画布上的自定义 UI 元素提供了一个定位容器。
它包括现代卡片样式，具有背景模糊和灵活的定位选项。

::alert{type="info" icon="lucide:info"}
  The Panel component is designed to be used with the [Canvas](/components/workflow/canvas) component. See the [Workflow](/examples/workflow) demo for a full example.
::

## Install using CLI

::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add panel
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/panel.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

::code-group
  ```vue [Panel.vue] height=260 collapse
  <script setup lang="ts">
  import type { PanelPositionType } from '@vue-flow/core'
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { Panel as PanelPrimitive } from '@vue-flow/core'
  import { reactiveOmit } from '@vueuse/core'

  interface PanelProps {
    class?: HTMLAttributes['class']
    position?: PanelPositionType
  }

  const props = withDefaults(defineProps<PanelProps>(), {
    position: 'top-right',
  })

  const delegatedProps = reactiveOmit(props, 'class')
  </script>

  <template>
    <PanelPrimitive
      data-slot="panel"
      v-bind="delegatedProps"
      :class="cn('m-4 overflow-hidden rounded-md border bg-card p-1', props.class)"
    >
      <slot />
    </PanelPrimitive>
  </template>
  ```

  ```ts [index.ts]
  export { default as Panel } from './Panel.vue'
  ```
::

## Features

- Flexible positioning (top-left, top-right, bottom-left, bottom-right, top-center, bottom-center)
- Rounded pill design with backdrop blur
- Theme-aware card background
- Flexbox layout for easy content alignment
- Subtle drop shadow for depth
- Full TypeScript support
- Compatible with Vue Flow's panel system

## Props

### `<Panel />`

::field-group
  ::field{name="class" type="string" defaultValue="''" optional}
  Additional CSS classes to apply to the panel.
  ::

  ::field{name="position" type="PanelPositionType" defaultValue="top-right" optional}
  Position of the panel on the canvas.
  ::
::
