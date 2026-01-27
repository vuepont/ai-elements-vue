---
title: Sandbox
description: A collapsible container for displaying AI-generated code and output in chat interfaces.
icon: lucide:box
---

The `Sandbox` component provides a structured way to display AI-generated code alongside its execution output in chat conversations. It features a collapsible container with status indicators and tabbed navigation between code and output views. It's designed to be used with `CodeBlock` for displaying code and `StackTrace` for displaying errors.

:::ComponentLoader{label="Preview" componentName="Sandbox"}
:::

## Install using CLI

:::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add sandbox
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/sandbox.json
  ```
  ::
:::

## Install Manually

Copy and paste the following files into the same folder.

:::code-group
  ```vue [Sandbox.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { Collapsible } from '@repo/shadcn-vue/components/ui/collapsible'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  type CollapsibleProps = InstanceType<typeof Collapsible>['$props']

  interface Props extends /* @vue-ignore */ CollapsibleProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <Collapsible
      :class="cn(
        'not-prose group mb-4 w-full overflow-hidden rounded-md border',
        props.class,
      )"
      :default-open="true"
      v-bind="$attrs"
    >
      <slot />
    </Collapsible>
  </template>
  ```

  ```vue [SandboxHeader.vue]
  <script setup lang="ts">
  import type { ToolUIPart } from 'ai'
  import type { HTMLAttributes } from 'vue'
  import {
    CollapsibleTrigger,
  } from '@repo/shadcn-vue/components/ui/collapsible'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { ChevronDownIcon, CodeIcon } from 'lucide-vue-next'
  import { getStatusBadge } from '../tool/utils'

  type CollapsibleTriggerProps = InstanceType<typeof CollapsibleTrigger>['$props']

  interface Props extends /* @vue-ignore */ CollapsibleTriggerProps {
    title?: string
    state: ToolUIPart['state']
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <CollapsibleTrigger
      :class="cn(
        'flex w-full items-center justify-between gap-4 p-3',
        props.class,
      )"
      v-bind="$attrs"
    >
      <div class="flex items-center gap-2">
        <CodeIcon class="size-4 text-muted-foreground" />
        <span class="font-medium text-sm">{{ title }}</span>
        <component :is="getStatusBadge(state)" />
      </div>
      <ChevronDownIcon class="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
    </CollapsibleTrigger>
  </template>
  ```

  ```vue [SandboxContent.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { CollapsibleContent } from '@repo/shadcn-vue/components/ui/collapsible'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  type CollapsibleContentProps = InstanceType<typeof CollapsibleContent>['$props']

  interface Props extends /* @vue-ignore */ CollapsibleContentProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <CollapsibleContent
      :class="cn(
        'data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
        props.class,
      )"
      v-bind="$attrs"
    >
      <slot />
    </CollapsibleContent>
  </template>
  ```

  ```vue [SandboxTabs.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { Tabs } from '@repo/shadcn-vue/components/ui/tabs'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  type TabsProps = InstanceType<typeof Tabs>['$props']

  interface Props extends /* @vue-ignore */ TabsProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <Tabs :class="cn('w-full gap-0', props.class)" v-bind="$attrs">
      <slot />
    </Tabs>
  </template>
  ```

  ```vue [SandboxTabsBar.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <div
      :class="cn(
        'flex w-full items-center border-border border-t border-b',
        props.class,
      )"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [SandboxTabsList.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { TabsList } from '@repo/shadcn-vue/components/ui/tabs'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  type TabsListProps = InstanceType<typeof TabsList>['$props']

  interface Props extends /* @vue-ignore */ TabsListProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <TabsList
      :class="cn('h-auto rounded-none border-0 bg-transparent p-0', props.class)"
      v-bind="$attrs"
    >
      <slot />
    </TabsList>
  </template>
  ```

  ```vue [SandboxTabsTrigger.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { TabsTrigger } from '@repo/shadcn-vue/components/ui/tabs'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  type TabsTriggerProps = InstanceType<typeof TabsTrigger>['$props']

  interface Props extends /* @vue-ignore */ TabsTriggerProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <TabsTrigger
      :class="cn(
        'rounded-none border-0 border-transparent border-b-2 px-4 py-2 font-medium text-muted-foreground text-sm transition-colors data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none',
        props.class,
      )"
      :value="props.value"
      v-bind="$attrs"
    >
      <slot />
    </TabsTrigger>
  </template>
  ```

  ```vue [SandboxTabContent.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { TabsContent } from '@repo/shadcn-vue/components/ui/tabs'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  type TabsContentProps = InstanceType<typeof TabsContent>['$props']

  interface Props extends /* @vue-ignore */ TabsContentProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <TabsContent :class="cn('mt-0 text-sm', props.class)" :value="props.value" v-bind="$attrs">
      <slot />
    </TabsContent>
  </template>
  ```

  ```ts [index.ts]
  export { default as Sandbox } from './Sandbox.vue'
  export { default as SandboxContent } from './SandboxContent.vue'
  export { default as SandboxHeader } from './SandboxHeader.vue'
  export { default as SandboxTabContent } from './SandboxTabContent.vue'
  export { default as SandboxTabs } from './SandboxTabs.vue'
  export { default as SandboxTabsBar } from './SandboxTabsBar.vue'
  export { default as SandboxTabsList } from './SandboxTabsList.vue'
  export { default as SandboxTabsTrigger } from './SandboxTabsTrigger.vue'
  ```

:::

## Features

- Collapsible container with smooth animations
- Status badges showing execution state (Pending, Running, Completed, Error)
- Tabs for Code and Output views
- Syntax-highlighted code display
- Copy button for easy code sharing
- Works with AI SDK tool state patterns

## Usage with AI SDK

The Sandbox component integrates with the AI SDK's tool state to show code generation progress:

```vue
<script setup lang="ts">
import type { ToolUIPart } from 'ai'
import { CodeBlock } from '@repo/elements/code-block'
import {
  Sandbox,
  SandboxContent,
  SandboxHeader,
  SandboxTabContent,
  SandboxTabs,
  SandboxTabsBar,
  SandboxTabsList,
  SandboxTabsTrigger,
} from '@repo/elements/sandbox'

const props = defineProps<{
  toolPart: ToolUIPart
}>()

const code = props.toolPart.input?.code ?? ''
const output = props.toolPart.output?.logs ?? ''
</script>

<template>
  <Sandbox>
    <SandboxHeader
      :state="props.toolPart.state"
      :title="props.toolPart.input?.filename ?? 'code.tsx'"
    />
    <SandboxContent>
      <SandboxTabs default-value="code">
        <SandboxTabsBar>
          <SandboxTabsList>
            <SandboxTabsTrigger value="code">
              Code
            </SandboxTabsTrigger>
            <SandboxTabsTrigger value="output">
              Output
            </SandboxTabsTrigger>
          </SandboxTabsList>
        </SandboxTabsBar>
        <SandboxTabContent value="code">
          <CodeBlock :code="code" language="tsx" />
        </SandboxTabContent>
        <SandboxTabContent value="output">
          <CodeBlock :code="output" language="log" />
        </SandboxTabContent>
      </SandboxTabs>
    </SandboxContent>
  </Sandbox>
</template>
```

## Props

### `<Sandbox />`

:::field-group
  ::field{name="...props" type="CollapsibleProps"}
  Spread to the Collapsible component.
  ::
:::

### `<SandboxHeader />`

:::field-group
  ::field{name="title" type="string" default="undefined"}
  The title displayed in the header (e.g., filename).
  ::
  ::field{name="state" type='ToolUIPart["state"]' required}
  The current execution state, used to display the appropriate status badge.
  ::
  ::field{name="class" type="string"}
  Additional CSS classes for the header.
  ::
:::

### `<SandboxContent />`

:::field-group
  ::field{name="...props" type="CollapsibleContentProps"}
  Spread to the CollapsibleContent.
  ::
:::

### `<SandboxTabs />`

:::field-group
  ::field{name="...props" type="TabsProps"}
  Spread to the underlying Tabs component.
  ::
:::

### `<SandboxTabsBar />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the container div.
  ::
:::

### `<SandboxTabsList />`

:::field-group
  ::field{name="...props" type="TabsListProps"}
  Spread to the underlying TabsList component.
  ::
:::

### `<SandboxTabsTrigger />`

:::field-group
  ::field{name="...props" type="TabsTriggerProps"}
  Spread to the underlying TabsTrigger component.
  ::
:::

### `<SandboxTabContent />`

:::field-group
  ::field{name="...props" type="TabsContentProps"}
  Spread to the underlying TabsContent component.
  ::
:::
