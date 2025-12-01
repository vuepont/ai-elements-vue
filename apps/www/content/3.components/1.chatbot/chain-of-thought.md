---
title: Chain of Thought
description:
icon: lucide:brain
---

The `ChainOfThought` component provides a visual representation of an AI's reasoning process, showing step-by-step thinking with support for search results, images, and progress indicators. It helps users understand how AI arrives at conclusions.

:::ComponentLoader{label="Preview" componentName="ChainOfThought"}
:::

## Install using CLI

:::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add chain-of-thought
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/chain-of-thought.json
  ```
  ::
:::

## Install Manually

Copy and paste the following files into the same folder.

:::code-group
```vue [ChainOfThought.vue]
<script setup lang="ts">
import type { HTMLAttributes, Ref } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useVModel } from '@vueuse/core'
import { provide } from 'vue'
import { ChainOfThoughtContextKey } from './context'

interface ChainOfThoughtProps {
  modelValue?: boolean
  defaultOpen?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(
  defineProps<ChainOfThoughtProps>(),
  {
    defaultOpen: false,
    modelValue: undefined,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const isOpen = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultOpen,
  passive: true,
})

provide(ChainOfThoughtContextKey, isOpen as Ref<boolean>)
</script>

<template>
  <div
    :class="cn('not-prose max-w-prose space-y-4', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
```

```vue [ChainOfThoughtHeader.vue]
<script setup lang="ts">
import type { HtmlHTMLAttributes } from 'vue'
import {
  Collapsible,
  CollapsibleTrigger,
} from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { BrainIcon, ChevronDownIcon } from 'lucide-vue-next'
import { useChainOfThought } from './context'

const props = defineProps<{
  class?: HtmlHTMLAttributes['class']
}>()

const { isOpen, setIsOpen } = useChainOfThought()
</script>

<template>
  <Collapsible :open="isOpen" @update:open="setIsOpen">
    <CollapsibleTrigger
      :class="
        cn(
          'flex w-full items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground',
          props.class,
        )
      "
      v-bind="$attrs"
    >
      <BrainIcon class="size-4" />
      <span class="flex-1 text-left">
        <slot>Chain of Thought</slot>
      </span>
      <ChevronDownIcon
        :class="
          cn(
            'size-4 transition-transform',
            isOpen ? 'rotate-180' : 'rotate-0',
          )
        "
      />
    </CollapsibleTrigger>
  </Collapsible>
</template>
```

```vue [ChainOfThoughtStep.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = withDefaults(
  defineProps<{
    label: string
    description?: string
    status?: 'complete' | 'active' | 'pending'
    class?: HTMLAttributes['class']
  }>(),
  {
    status: 'complete',
    description: undefined,
  },
)

const statusStyles = {
  complete: 'text-muted-foreground',
  active: 'text-foreground',
  pending: 'text-muted-foreground/50',
}
</script>

<template>
  <div
    :class="
      cn(
        'flex gap-2 text-sm',
        statusStyles[props.status],
        'fade-in-0 slide-in-from-top-2 animate-in',
        props.class as string,
      )
    "
    v-bind="$attrs"
  >
    <div class="relative mt-0.5">
      <slot name="icon" />
      <div
        class="-mx-px absolute top-7 bottom-0 left-1/2 w-px bg-border"
      />
    </div>
    <div class="flex-1 space-y-2">
      <div>{{ props.label }}</div>
      <div
        v-if="props.description"
        class="text-muted-foreground text-xs"
      >
        {{ props.description }}
      </div>
      <slot />
    </div>
  </div>
</template>
```

```vue [ChainOfThoughtSearchResults.vue]
<script setup lang="ts">
import type { HtmlHTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HtmlHTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="cn('flex items-center gap-2', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
```

```vue [ChainOfThoughtSearchResult.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Badge } from '@repo/shadcn-vue/components/ui/badge'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Badge
    :class="
      cn(
        'gap-1 px-2 py-0.5 font-normal text-xs',
        props.class,
      )
    "
    variant="secondary"
    v-bind="$attrs"
  >
    <slot />
  </Badge>
</template>
```

```vue [ChainOfThoughtContent.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  Collapsible,
  CollapsibleContent,
} from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useChainOfThought } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { isOpen } = useChainOfThought()
</script>

<template>
  <Collapsible :open="isOpen">
    <CollapsibleContent
      :class="
        cn(
          'mt-2 space-y-3',
          'data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 text-popover-foreground outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
          props.class,
        )
      "
      v-bind="$attrs"
    >
      <slot />
    </CollapsibleContent>
  </Collapsible>
</template>
```

```vue [ChainOfThoughtImage.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  caption?: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="cn('mt-2 space-y-2', props.class)"
    v-bind="$attrs"
  >
    <div
      class="relative flex max-h-[22rem] items-center justify-center overflow-hidden rounded-lg bg-muted p-3"
    >
      <slot />
    </div>
    <p v-if="caption" class="text-muted-foreground text-xs">
      {{ props.caption }}
    </p>
  </div>
</template>
```


```ts [context.ts]
import type { InjectionKey, Ref } from 'vue'
import { inject } from 'vue'

export const ChainOfThoughtContextKey: InjectionKey<Ref<boolean>> = Symbol(
  'ChainOfThoughtContext',
)

export function useChainOfThought() {
  const isOpen = inject(ChainOfThoughtContextKey)

  if (!isOpen) {
    throw new Error(
      'useChainOfThought must be used within a <ChainOfThought> component',
    )
  }

  const setIsOpen = (open: boolean) => {
    isOpen.value = open
  }

  return { isOpen, setIsOpen }
}
```

```ts [index.ts]
export { default as ChainOfThought } from './ChainOfThought.vue'
export { default as ChainOfThoughtContent } from './ChainOfThoughtContent.vue'
export { default as ChainOfThoughtHeader } from './ChainOfThoughtHeader.vue'
export { default as ChainOfThoughtImage } from './ChainOfThoughtImage.vue'
export { default as ChainOfThoughtSearchResult } from './ChainOfThoughtSearchResult.vue'
export { default as ChainOfThoughtSearchResults } from './ChainOfThoughtSearchResults.vue'
export { default as ChainOfThoughtStep } from './ChainOfThoughtStep.vue'
```
:::

## Usage

```ts
import {
  ChainOfThought,
  ChainOfThoughtContent,
  ChainOfThoughtHeader,
  ChainOfThoughtImage,
  ChainOfThoughtSearchResult,
  ChainOfThoughtSearchResults,
  ChainOfThoughtStep,
} from '@/components/ai-elements/chain-of-thought'
```

```vue
<ChainOfThought defaultOpen>
  <ChainOfThoughtHeader />
  <ChainOfThoughtContent>
    <ChainOfThoughtStep
      label="Searching for information"
      status="complete"
    >
     <template #icon>
          <ImageIcon class="size-4" />
        </template>
      <ChainOfThoughtSearchResults>
        <ChainOfThoughtSearchResult>
          Result 1
        </ChainOfThoughtSearchResult>
      </ChainOfThoughtSearchResults>
    </ChainOfThoughtStep>
  </ChainOfThoughtContent>
</ChainOfThought>
```

## Features

- Collapsible interface with smooth animations powered by Radix UI
- Step-by-step visualization of AI reasoning process
- Support for different step statuses (complete, active, pending)
- Built-in search results display with badge styling
- Image support with captions for visual content
- Custom icons for different step types
- Context-aware components using React Context API
- Fully typed with TypeScript
- Accessible with keyboard navigation support
- Responsive design that adapts to different screen sizes
- Smooth fade and slide animations for content transitions
- Composable architecture for flexible customization

## Props

### `<ChainOfThought />`

:::field-group
  ::field{name="defaultOpen" type="boolean" }
  Whether the chain of thought is open by default.
  ::

  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<ChainOfThoughtHeader />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<ChainOfThoughtStep />`

:::field-group
  ::field{name="label" type="string" }
  The main text label for the step.
  ::

  ::field{name="description" type="string" optional}
  Optional description text shown below the label.
  ::

  ::field{name="status" type="'complete' | 'active' | 'pending'" optional defaultValue="'complete'"}
  Visual status of the step. Defaults to "complete".
  ::

    ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<ChainOfThoughtSearchResults />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<ChainOfThoughtSearchResult />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<ChainOfThoughtContent />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<ChainOfThoughtImage />`

:::field-group
  ::field{name="caption" type="string" optional}
  Optional caption text displayed below the image.
  ::

  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::
