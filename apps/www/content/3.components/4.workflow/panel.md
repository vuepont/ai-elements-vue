---
title: Panel
description: A styled panel component for Vue Flow-based canvases to position custom UI elements.
icon: lucide:panel-top
---

The `Panel` component provides a positioned container for custom UI elements on Vue Flow canvases.
It includes modern card styling with backdrop blur and flexible positioning options.

::alert{type="info" icon="lucide:info"}
  The Panel component is designed to be used with the [Canvas](/components/workflow/canvas) component. See the [Workflow](/examples/workflow) demo for a full example.
::

## Install using CLI

::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add panel
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/panel.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

::code-group
  ```vue [Panel.vue]
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
