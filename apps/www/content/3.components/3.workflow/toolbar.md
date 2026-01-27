---
title: Toolbar
description: A styled toolbar component for Vue Flow nodes with flexible positioning and custom actions.
icon: lucide:dock
---

The `Toolbar` component provides a positioned toolbar that attaches to nodes in Vue Flow canvases.
It features modern card styling with backdrop blur and flexbox layout for action buttons and controls.

::alert{type="info" icon="lucide:info"}
  The Toolbar component is designed to be used with the [Node](/components/workflow/node) component. See the [Workflow](/examples/workflow) demo for a full example.
::

## Install using CLI

::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add toolbar
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/toolbar.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

::code-group
  ```vue [Toolbar.vue] height=500 collapse
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
