---
title: Controls
description: A styled controls component for Vue Flow-based canvases with zoom and fit view functionality.
icon: lucide:maximize-2
---

The `Controls` component provides interactive zoom and fit view controls for Vue Flow canvases.
It includes a modern, themed design with backdrop blur and card styling.

::alert{type="info" icon="lucide:info"}
  The Controls component is designed to be used with the [Canvas](/components/workflow/canvas) component. See the [Workflow](/examples/workflow) demo for a full example.
::

## Install using CLI

::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add controls
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/controls.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

::code-group
  ```vue [Controls.vue]
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
