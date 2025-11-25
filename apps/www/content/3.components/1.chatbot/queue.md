---
title: Queue
description:
icon: lucide:list-check
---

The `Queue` component provides a flexible system for displaying lists of messages, todos, attachments, and collapsible sections. Perfect for showing AI workflow progress, pending tasks, message history, or any structured list of items in your application.

:::ComponentLoader{label="Preview" componentName="Queue"}
:::

## Install using CLI

::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add queue
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/queue.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

:::code-group
```vue [Queue.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="
      cn(
        'flex flex-col gap-2 rounded-xl border border-border bg-background px-3 pt-2 pb-2 shadow-xs',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
```

```vue [QueueSection.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Collapsible } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface QueueSectionProps {
  defaultOpen?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(
  defineProps<QueueSectionProps>(),
  {
    defaultOpen: true,
  },
)
</script>

<template>
  <Collapsible
    :class="cn(props.class)"
    :default-open="props.defaultOpen"
  >
    <slot />
  </Collapsible>
</template>
```

```vue [QueueSectionTrigger.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <CollapsibleTrigger as-child>
    <button
      :class="
        cn(
          'group flex w-full items-center justify-between rounded-md bg-sidebar px-3 py-2 text-left font-medium text-muted-foreground text-sm transition-colors hover:bg-muted',
          props.class,
        )
      "
      type="button"
    >
      <slot />
    </button>
  </CollapsibleTrigger>
</template>
```

```vue [QueueSectionLabel.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ChevronDownIcon } from 'lucide-vue-next'

interface QueueSectionLabelProps {
  count?: number
  label: string
  class?: HTMLAttributes['class']
}

const props = defineProps<QueueSectionLabelProps>()
</script>

<template>
  <span :class="cn('flex items-center gap-2', props.class)">
    <ChevronDownIcon
      class="group-data-[state=closed]:-rotate-90 size-4 transition-transform"
    />
    <slot name="icon" />
    <span>
      {{ props.count }}
      {{ props.label }}
    </span>
  </span>
</template>
```

```vue [QueueSectionContent.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CollapsibleContent } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <CollapsibleContent :class="cn(props.class)">
    <slot />
  </CollapsibleContent>
</template>
```

```vue [QueueList.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ScrollArea } from '@repo/shadcn-vue/components/ui/scroll-area'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ScrollArea
    :class="cn('-mb-1 mt-2', props.class)"
    v-bind="$attrs"
  >
    <div class="max-h-40 pr-4">
      <ul>
        <slot />
      </ul>
    </div>
  </ScrollArea>
</template>
```

```vue [QueueItem.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <li
    :class="
      cn(
        'group flex flex-col gap-1 rounded-md px-3 py-1 text-sm transition-colors hover:bg-muted',
        props.class,
      )
    "
  >
    <slot />
  </li>
</template>
```

```vue [QueueItemIndicator.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface QueueItemIndicatorProps {
  completed?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(
  defineProps<QueueItemIndicatorProps>(),
  {
    completed: false,
  },
)
</script>

<template>
  <span
    :class="
      cn(
        'mt-0.5 inline-block size-2.5 rounded-full border',
        props.completed
          ? 'border-muted-foreground/20 bg-muted-foreground/10'
          : 'border-muted-foreground/50',
        props.class,
      )
    "
  />
</template>
```

```vue [QueueItemContent.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface QueueItemContentProps {
  completed?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(
  defineProps<QueueItemContentProps>(),
  {
    completed: false,
  },
)
</script>

<template>
  <span
    :class="
      cn(
        'line-clamp-1 grow break-words',
        props.completed
          ? 'text-muted-foreground/50 line-through'
          : 'text-muted-foreground',
        props.class,
      )
    "
  >
    <slot />
  </span>
</template>
```

```vue [QueueItemDescription.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface QueueItemDescriptionProps {
  completed?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(
  defineProps<QueueItemDescriptionProps>(),
  {
    completed: false,
  },
)
</script>

<template>
  <div
    :class="
      cn(
        'ml-6 text-xs',
        props.completed
          ? 'text-muted-foreground/40 line-through'
          : 'text-muted-foreground',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
```

```vue [QueueItemActions.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn('flex gap-1', props.class)">
    <slot />
  </div>
</template>
```

```vue [QueueItemAction.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Button
    :class="
      cn(
        'size-auto rounded p-1 text-muted-foreground opacity-0 transition-opacity hover:bg-muted-foreground/10 hover:text-foreground group-hover:opacity-100',
        props.class,
      )
    "
    size="icon"
    type="button"
    variant="ghost"
  >
    <slot />
  </Button>
</template>
```

```vue [QueueItemAttachment.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn('mt-1 flex flex-wrap gap-2', props.class)">
    <slot />
  </div>
</template>
```

```vue [QueueItemImage.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <img
    alt=""
    :class="cn('h-8 w-8 rounded border object-cover', props.class)"
    height="32"
    width="32"
    v-bind="$attrs"
  >
</template>
```

```vue [QueueItemFile.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { PaperclipIcon } from 'lucide-vue-next'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    :class="
      cn(
        'flex items-center gap-1 rounded border bg-muted px-2 py-1 text-xs',
        props.class,
      )
    "
  >
    <PaperclipIcon :size="12" />
    <span class="max-w-[100px] truncate">
      <slot />
    </span>
  </span>
</template>
```

```ts [index.ts]
export { default as Queue } from './Queue.vue'
export { default as QueueItem } from './QueueItem.vue'
export { default as QueueItemAction } from './QueueItemAction.vue'
export { default as QueueItemActions } from './QueueItemActions.vue'
export { default as QueueItemAttachment } from './QueueItemAttachment.vue'
export { default as QueueItemContent } from './QueueItemContent.vue'
export { default as QueueItemDescription } from './QueueItemDescription.vue'
export { default as QueueItemFile } from './QueueItemFile.vue'
export { default as QueueItemImage } from './QueueItemImage.vue'
export { default as QueueItemIndicator } from './QueueItemIndicator.vue'
export { default as QueueList } from './QueueList.vue'
export { default as QueueSection } from './QueueSection.vue'
export { default as QueueSectionContent } from './QueueSectionContent.vue'
export { default as QueueSectionLabel } from './QueueSectionLabel.vue'
export { default as QueueSectionTrigger } from './QueueSectionTrigger.vue'
```
:::

## Usage

```ts
import {
  Queue,
  QueueItem,
  QueueItemContent,
  QueueItemIndicator,
  QueueList,
  QueueSection,
  QueueSectionContent,
  QueueSectionLabel,
  QueueSectionTrigger,
} from '@/components/ai-elements/queue'
```

```vue
<Queue>
  <QueueSection>
    <QueueSectionTrigger>
      <QueueSectionLabel :count="3" label="Tasks" />
    </QueueSectionTrigger>
    <QueueSectionContent>
      <QueueList>
        <QueueItem>
          <QueueItemIndicator />
          <QueueItemContent>Analyze user requirements</QueueItemContent>
        </QueueItem>
      </QueueList>
    </QueueSectionContent>
  </QueueSection>
</Queue>
```

## Features

- Flexible component system with composable parts
- Collapsible sections with smooth animations
- Support for completed/pending state indicators
- Built-in scroll area for long lists
- Attachment display with images and file indicators
- Hover-revealed action buttons for queue items
- TypeScript support with comprehensive type definitions
- Customizable styling with Tailwind CSS
- Responsive design with mobile-friendly interactions
- Keyboard navigation and accessibility support
- Theme-aware with automatic dark mode support

## Examples

### With Custom Label Icon

:::ComponentLoader{label="Preview" componentName="QueueCustom"}
:::

### With PromptInput

:::ComponentLoader{label="Preview" componentName="QueuePromptInput"}
:::

## Props

### `<Queue />`

:::field-group
  ::field{name="class" type="string"}
  Additional classes applied to the component.
  ::
:::

### `<QueueSection />`

:::field-group
  ::field{name="defaultOpen" type="boolean" defaultValue="true"}
  Whether the section is open by default.
  ::
  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the component.
  ::
:::

### `<QueueSectionTrigger />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the component.
  ::
:::

### `<QueueSectionLabel />`

:::field-group
  ::field{name="label" type="string"}
  The label text to display.
  ::

  ::field{name="count" type="number"}
  The count to display before the label.
  ::

  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the label.
  ::
:::

### `<QueueSectionContent />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the component.
  ::
:::

### `<QueueList />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the component.
  ::
:::

### `<QueueItem />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the component.
  ::
:::

### `<QueueItemIndicator />`

:::field-group
  ::field{name="completed" type="boolean" defaultValue="false"}
  Whether the item is completed. Affects the indicator styling. Defaults to false.
  ::

  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the component.
  ::
:::

### `<QueueItemContent />`

:::field-group
  ::field{name="completed" type="boolean" defaultValue="false"}
  Whether the item is completed. Affects text styling with strikethrough and opacity. Defaults to false.
  ::

  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the component.
  ::
:::

### `<QueueItemDescription />`

:::field-group
  ::field{name="completed" type="boolean" defaultValue="false"}
  Whether the item is completed. Affects text styling. Defaults to false.
  ::

  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the component.
  ::
:::

### `<QueueItemActions />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the component.
  ::
:::

### `<QueueItemAction />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the component.
  ::
:::

### `<QueueItemAttachment />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the component.
  ::
:::

### `<QueueItemImage />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the component.
  ::
:::

### `<QueueItemFile />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the component.
  ::
:::
