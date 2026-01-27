---
title: Node
description: A composable node component for Vue Flow-based canvases with Card-based styling.
icon: lucide:ungroup
---

The `Node` component provides a composable, Card-based node for Vue Flow canvases.
It includes support for connection handles, structured layouts, and consistent styling using shadcn/vue components.

::alert{type="info" icon="lucide:info"}
  The Node component is designed to be used with the [Canvas](/components/workflow/canvas) component. See the [Workflow](/examples/workflow) demo for a full example.
::

## Install using CLI

::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add node
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/node.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

::code-group
  ```vue [Node.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import Card from '@repo/shadcn-vue/components/ui/card/Card.vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { Handle, Position } from '@vue-flow/core'
  import { reactiveOmit } from '@vueuse/core'

  interface NodeHandles {
    target?: boolean
    source?: boolean
  }

  interface NodeProps {
    class?: HTMLAttributes['class']
    handles?: NodeHandles
  }

  const props = defineProps<NodeProps>()
  const delegatedProps = reactiveOmit(props, 'class')
  </script>

  <template>
    <Card
      v-bind="delegatedProps"
      :class="cn('node-container relative size-full h-auto w-sm gap-0 rounded-md p-0', props.class)"
    >
      <Handle v-if="props.handles?.target" :position="Position.Left" type="target" />
      <Handle v-if="props.handles?.source" :position="Position.Right" type="source" />
      <slot />
    </Card>
  </template>
  ```

  ```vue [NodeHeader.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import CardHeader from '@repo/shadcn-vue/components/ui/card/CardHeader.vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <CardHeader :class="cn('gap-0.5 rounded-t-md border-b bg-secondary p-3!', props.class)">
      <slot />
    </CardHeader>
  </template>
  ```

  ```vue [NodeTitle.vue]
  <script setup lang="ts">
  import CardTitle from '@repo/shadcn-vue/components/ui/card/CardTitle.vue'
  </script>

  <template>
    <CardTitle>
      <slot />
    </CardTitle>
  </template>
  ```

  ```vue [NodeDescription.vue]
  <script setup lang="ts">
  import CardDescription from '@repo/shadcn-vue/components/ui/card/CardDescription.vue'
  </script>

  <template>
    <CardDescription>
      <slot />
    </CardDescription>
  </template>
  ```

  ```vue [NodeAction.vue]
  <script setup lang="ts">
  import CardAction from '@repo/shadcn-vue/components/ui/card/CardAction.vue'
  </script>

  <template>
    <CardAction>
      <slot />
    </CardAction>
  </template>
  ```

  ```vue [NodeContent.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import CardContent from '@repo/shadcn-vue/components/ui/card/CardContent.vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <CardContent :class="cn('p-3', props.class)">
      <slot />
    </CardContent>
  </template>
  ```

  ```vue [NodeFooter.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import CardFooter from '@repo/shadcn-vue/components/ui/card/CardFooter.vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <CardFooter :class="cn('rounded-b-md border-t bg-secondary p-3!', props.class)">
      <slot />
    </CardFooter>
  </template>
  ```

  ```ts [index.ts]
  export { default as Node } from './Node.vue'
  export { default as NodeAction } from './NodeAction.vue'
  export { default as NodeContent } from './NodeContent.vue'
  export { default as NodeDescription } from './NodeDescription.vue'
  export { default as NodeFooter } from './NodeFooter.vue'
  export { default as NodeHeader } from './NodeHeader.vue'
  export { default as NodeTitle } from './NodeTitle.vue'
  ```
::

## Features

- Built on shadcn/vue Card components for consistent styling
- Automatic handle placement (left for target, right for source)
- Composable sub-components (Header, Title, Description, Action, Content, Footer)
- Semantic structure for organizing node information
- Pre-styled sections with borders and backgrounds
- Responsive sizing with fixed small width
- Full TypeScript support with proper type definitions
- Compatible with Vue Flow's node system

## Props

### `<Node />`

::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the node.
  ::

  ::field{name="handles" type="{ target: boolean; source: boolean; }" optional}
  Configuration for connection handles. Target renders on the left, source on the right.
  ::
::

### `<NodeHeader />`

::field{name="class" type="string" defaultValue="''"}
Additional CSS classes to apply to the header.
::

### `<NodeTitle />`

::field{name=""}
This component does not accept any props.
::

### `<NodeDescription />`

::field{name=""}
This component does not accept any props.
::

### `<NodeAction />`

::field{name=""}
This component does not accept any props.
::

### `<NodeContent />`

::field{name="class" type="string" defaultValue="''"}
Additional CSS classes to apply to the content.
::

### `<NodeFooter />`

::field{name="class" type="string" defaultValue="''"}
Additional CSS classes to apply to the footer.
::
