---
title: Branch
description:
icon: lucide:git-branch
---

The `Branch` component manages multiple versions of AI messages, allowing users to navigate between different response branches. It provides a clean, modern interface with customizable themes and keyboard-accessible navigation buttons.

:::ComponentLoader{label="Branch" componentName="Branch"}
:::

## Install using CLI

:::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add branch
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/branch.json
  ```
  ::
:::

## Install Manually

Copy and paste the following files into the same folder.

:::code-group
  ```vue [Branch.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { BranchContext } from './context'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed, provide, ref } from 'vue'
  import { BranchContextKey } from './context'

  interface Props {
    class?: HTMLAttributes['class']
    defaultBranch?: number
    onBranchChange?: (index: number) => void
  }

  const props = withDefaults(defineProps<Props>(), {
    defaultBranch: 0,
  })

  const currentBranch = ref<number>(props.defaultBranch)
  const totalBranches = ref<number>(0)

  function handleBranchChange(index: number) {
    currentBranch.value = index
    props.onBranchChange?.(index)
  }

  function goToPrevious() {
    if (totalBranches.value === 0)
      return
    const next = currentBranch.value > 0 ? currentBranch.value - 1 : totalBranches.value - 1
    handleBranchChange(next)
  }

  function goToNext() {
    if (totalBranches.value === 0)
      return
    const next = currentBranch.value < totalBranches.value - 1 ? currentBranch.value + 1 : 0
    handleBranchChange(next)
  }

  function setTotalBranches(count: number) {
    totalBranches.value = count
  }

  const context: BranchContext = {
    currentBranch,
    totalBranches,
    goToPrevious,
    goToNext,
    setTotalBranches,
  }

  provide(BranchContextKey, context)

  const classes = computed(() => cn('grid w-full gap-2 [&>div]:pb-0', props.class))
  </script>

  <template>
    <div :class="classes">
      <slot />
    </div>
  </template>
  ```

  ```vue [BranchMessages.vue]
  <script setup lang="ts">
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed, Fragment, isVNode, onMounted, useAttrs, useSlots, watch } from 'vue'
  import { useBranchContext } from './context'

  interface Props {
    class?: string
  }

  const props = defineProps<Props>()
  const attrs = useAttrs()
  const slots = useSlots()

  const { currentBranch, setTotalBranches } = useBranchContext()

  const branchVNodes = computed(() => {
    const nodes = slots.default?.() ?? []

    const extractChildren = (node: any): any[] => {
      if (isVNode(node) && node.type === Fragment) {
        return Array.isArray(node.children) ? node.children : []
      }
      return [node]
    }

    const allNodes = nodes.flatMap(extractChildren)

    return allNodes.filter((node) => {
      if (!isVNode(node))
        return false
      return node.type && typeof node.type === 'object'
    })
  })

  // Keep total branches in sync with rendered children
  const sync = () => setTotalBranches(branchVNodes.value.length)
  onMounted(sync)
  watch(branchVNodes, sync)

  const baseClasses = computed(() => cn('grid gap-2 overflow-hidden [&>div]:pb-0', props.class))
  </script>

  <template>
    <template v-for="(node, index) in branchVNodes" :key="(node.key as any) ?? index">
      <div
        :class="cn(baseClasses, index === currentBranch ? 'block' : 'hidden')"
        v-bind="attrs"
      >
        <component :is="node" />
      </div>
    </template>
  </template>
  ```

  ```vue [BranchPrevious.vue]
  <script setup lang="ts">
  import { Button } from '@repo/shadcn-vue/components/ui/button'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { ChevronLeftIcon } from 'lucide-vue-next'
  import { computed, useAttrs } from 'vue'
  import { useBranchContext } from './context'

  interface Props {
    class?: string
  }

  const props = defineProps<Props>()
  const attrs = useAttrs()
  const { goToPrevious, totalBranches } = useBranchContext()

  const classes = computed(() => cn(
    'size-7 shrink-0 rounded-full text-muted-foreground transition-colors',
    'hover:bg-accent hover:text-foreground',
    'disabled:pointer-events-none disabled:opacity-50',
    props.class,
  ))
  </script>

  <template>
    <Button
      aria-label="Previous branch"
      :class="classes"
      :disabled="totalBranches <= 1"
      size="icon"
      type="button"
      variant="ghost"
      v-bind="attrs"
      @click="goToPrevious"
    >
      <slot>
        <ChevronLeftIcon :size="14" />
      </slot>
    </Button>
  </template>
  ```

  ```vue [BranchNext.vue]
  <script setup lang="ts">
  import { Button } from '@repo/shadcn-vue/components/ui/button'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { ChevronRightIcon } from 'lucide-vue-next'
  import { computed, useAttrs } from 'vue'
  import { useBranchContext } from './context'

  interface Props {
    class?: string
  }

  const props = defineProps<Props>()
  const attrs = useAttrs()
  const { goToNext, totalBranches } = useBranchContext()

  const classes = computed(() => cn(
    'size-7 shrink-0 rounded-full text-muted-foreground transition-colors',
    'hover:bg-accent hover:text-foreground',
    'disabled:pointer-events-none disabled:opacity-50',
    props.class,
  ))
  </script>

  <template>
    <Button
      aria-label="Next branch"
      :class="classes"
      :disabled="totalBranches <= 1"
      size="icon"
      type="button"
      variant="ghost"
      v-bind="attrs"
      @click="goToNext"
    >
      <slot>
        <ChevronRightIcon :size="14" />
      </slot>
    </Button>
  </template>
  ```

  ```vue [BranchPage.vue]
  <script setup lang="ts">
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed } from 'vue'
  import { useBranchContext } from './context'

  interface Props {
    class?: string
  }

  const props = defineProps<Props>()
  const { currentBranch, totalBranches } = useBranchContext()

  const classes = computed(() => cn('font-medium text-muted-foreground text-xs tabular-nums', props.class))
  </script>

  <template>
    <span :class="classes">
      {{ (currentBranch + 1) }} of {{ totalBranches }}
    </span>
  </template>
  ```

  ```vue [BranchSelector.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed, useAttrs } from 'vue'
  import { useBranchContext } from './context'

  interface Props {
    class?: HTMLAttributes['class']
    from: 'user' | 'assistant'
  }

  const props = defineProps<Props>()
  const attrs = useAttrs()
  const { totalBranches } = useBranchContext()

  const classes = computed(() => cn(
    'flex items-center gap-2 self-end px-10',
    props.from === 'assistant' ? 'justify-start' : 'justify-end',
    props.class,
  ))
  </script>

  <template>
    <div v-if="totalBranches > 1" :class="classes" v-bind="attrs">
      <slot />
    </div>
    <template v-else />
  </template>
  ```

  ```ts [context.ts]
  import type { InjectionKey, Ref } from 'vue'
  import { inject } from 'vue'

  export interface BranchContext {
    currentBranch: Ref<number>
    totalBranches: Ref<number>
    goToPrevious: () => void
    goToNext: () => void
    setTotalBranches: (count: number) => void
  }

  export const BranchContextKey: InjectionKey<BranchContext> = Symbol('BranchContext')

  export function useBranchContext(): BranchContext {
    const ctx = inject(BranchContextKey)
    if (!ctx) {
      throw new Error('Branch components must be used within Branch')
    }
    return ctx
  }
  ```

  ```ts [index.ts]
  export { default as Branch } from './Branch.vue'
  export { default as BranchMessages } from './BranchMessages.vue'
  export { default as BranchNext } from './BranchNext.vue'
  export { default as BranchPage } from './BranchPage.vue'
  export { default as BranchPrevious } from './BranchPrevious.vue'
  export { default as BranchSelector } from './BranchSelector.vue'
  ```
:::

## Usage

```vue
<script setup lang="ts">
import {
  Branch,
  BranchMessages,
  BranchNext,
  BranchPage,
  BranchPrevious,
  BranchSelector,
} from '@/components/ai-elements/branch'
import { Message, MessageContent } from '@/components/ai-elements/message'

function handleBranchChange(index: number) {
  console.log('Branch changed:', index)
}
</script>

<template>
  <Branch :default-branch="0" :on-branch-change="handleBranchChange">
    <BranchMessages>
      <Message from="user">
        <MessageContent>Hello</MessageContent>
      </Message>
      <Message from="user">
        <MessageContent>Hi!</MessageContent>
      </Message>
    </BranchMessages>
    <BranchSelector from="user">
      <BranchPrevious />
      <BranchPage />
      <BranchNext />
    </BranchSelector>
  </Branch>
</template>
```

## Usage with AI SDK

::alert{type="note" icon="lucide:pencil"}
  Branching is an advanced use case that you can implement yourself to suit your
  application's needs. While the AI SDK does not provide built-in support for
  branching, you have full flexibility to design and manage multiple response
  paths as required.
::

## Features

- Context-based state management for multiple message branches
- Navigation controls for moving between branches (previous/next)
- Uses CSS to prevent re-rendering of branches when switching
- Branch counter showing current position (e.g., "1 of 3")
- Automatic branch tracking and synchronization
- Callbacks for branch change and navigation using `onBranchChange`
- Support for custom branch change callbacks
- Responsive design with mobile-friendly controls
- Clean, modern styling with customizable themes
- Keyboard-accessible navigation buttons

## Props

### `<Branch />`

:::field-group
  ::field{name="defaultBranch" type="number"}
  The index of the branch to show by default (default: 0).
  ::

  ::field{name="onBranchChange" type="(index: number) => void"}
  Callback fired when the branch changes.
  ::

  ::field{name="class" type="string"}
  Additional classes applied to the root element.
  ::
:::

### `<BranchMessages />`

:::field-group
  ::field{name="class" type="string"}
  Additional classes applied to the container element.
  ::
:::

### `<BranchSelector />`

:::field-group
  ::field{name="from" type="'user' | 'assistant'" required}
  Aligns the selector for user or assistant messages.
  ::

  ::field{name="class" type="string"}
  Additional classes applied to the container element.
  ::
:::

### `<BranchPrevious />`

:::field-group
  ::field{name="class" type="string"}
  Additional classes applied to the button element.
  ::
:::

### `<BranchNext />`

:::field-group
  ::field{name="class" type="string"}
  Additional classes applied to the button element.
  ::
:::

### `<BranchPage />`

:::field-group
  ::field{name="class" type="string"}
  Additional classes applied to the counter text element.
  ::
:::
