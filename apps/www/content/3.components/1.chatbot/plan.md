---
title: Plan
description: A collapsible plan component for displaying AI-generated execution plans with streaming support and shimmer animations.
icon: lucide:map
---

The `Plan` component provides a flexible system for displaying AI-generated execution plans with collapsible content. Perfect for showing multi-step workflows, task breakdowns, and implementation strategies with support for streaming content and loading states.

:::ComponentLoader{label="Preview" componentName="Plan"}
:::

## Install using CLI

::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add plan
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/plan.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

:::code-group
```vue [Plan.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Card } from '@repo/shadcn-vue/components/ui/card'
import { Collapsible } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'
import { providePlan } from './context'

interface PlanProps {
  isStreaming?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(
  defineProps<PlanProps>(),
  {
    isStreaming: false,
  },
)

providePlan({
  isStreaming: computed(() => props.isStreaming),
})
</script>

<template>
  <Collapsible as-child data-slot="plan" v-bind="props">
    <Card :class="cn('shadow-none', props.class)">
      <slot />
    </Card>
  </Collapsible>
</template>
```

```vue [PlanHeader.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CardHeader } from '@repo/shadcn-vue/components/ui/card'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <CardHeader
    :class="cn('flex flex-row items-start justify-between', props.class)"
    data-slot="plan-header"
  >
    <slot />
  </CardHeader>
</template>
```

```vue [PlanTitle.vue]
<script setup lang="ts">
import { CardTitle } from '@repo/shadcn-vue/components/ui/card'
import { Shimmer } from '../shimmer'
import { usePlan } from './context'

const { isStreaming } = usePlan()
</script>

<template>
  <CardTitle data-slot="plan-title" v-bind="$attrs">
    <Shimmer v-if="isStreaming">
      <slot />
    </Shimmer>
    <slot v-else />
  </CardTitle>
</template>
```

```vue [PlanDescription.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CardDescription } from '@repo/shadcn-vue/components/ui/card'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { Shimmer } from '../shimmer'
import { usePlan } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { isStreaming } = usePlan()
</script>

<template>
  <CardDescription
    :class="cn('text-balance', props.class)"
    data-slot="plan-description"
  >
    <Shimmer v-if="isStreaming">
      <slot />
    </Shimmer>
    <slot v-else />
  </CardDescription>
</template>
```

```vue [PlanAction.vue]
<script setup lang="ts">
import { CardAction } from '@repo/shadcn-vue/components/ui/card'
</script>

<template>
  <CardAction data-slot="plan-action">
    <slot />
  </CardAction>
</template>
```

```vue [PlanContent.vue]
<script setup lang="ts">
import { CardContent } from '@repo/shadcn-vue/components/ui/card'
import { CollapsibleContent } from '@repo/shadcn-vue/components/ui/collapsible'
</script>

<template>
  <CollapsibleContent as-child>
    <CardContent data-slot="plan-content">
      <slot />
    </CardContent>
  </CollapsibleContent>
</template>
```

```vue [PlanFooter.vue]
<script setup lang="ts">
import { CardFooter } from '@repo/shadcn-vue/components/ui/card'
</script>

<template>
  <CardFooter data-slot="plan-footer">
    <slot />
  </CardFooter>
</template>
```

```vue [PlanTrigger.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ChevronsUpDownIcon } from 'lucide-vue-next'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <CollapsibleTrigger as-child>
    <Button
      :class="cn('size-8', props.class)"
      data-slot="plan-trigger"
      size="icon"
      variant="ghost"
    >
      <ChevronsUpDownIcon class="size-4" />
      <span class="sr-only">Toggle plan</span>
    </Button>
  </CollapsibleTrigger>
</template>
```

```ts [context.ts]
import type { ComputedRef, InjectionKey } from 'vue'
import { inject, provide } from 'vue'

export interface PlanContextValue {
  isStreaming: ComputedRef<boolean>
}

export const PlanKey: InjectionKey<PlanContextValue> = Symbol('PlanContext')

export function providePlan(value: PlanContextValue) {
  provide(PlanKey, value)
}

export function usePlan() {
  const context = inject(PlanKey)
  if (!context) {
    throw new Error('Plan components must be used within a Plan component')
  }
  return context
}
```

```ts [index.ts]
export { default as Plan } from './Plan.vue'
export { default as PlanAction } from './PlanAction.vue'
export { default as PlanContent } from './PlanContent.vue'
export { default as PlanDescription } from './PlanDescription.vue'
export { default as PlanFooter } from './PlanFooter.vue'
export { default as PlanHeader } from './PlanHeader.vue'
export { default as PlanTitle } from './PlanTitle.vue'
export { default as PlanTrigger } from './PlanTrigger.vue'
```
:::

## Features

- Collapsible content with smooth animations
- Streaming support with shimmer loading states
- Built on shadcn-vue Card and Collapsible components
- TypeScript support with comprehensive type definitions
- Customizable styling with Tailwind CSS
- Responsive design with mobile-friendly interactions
- Keyboard navigation and accessibility support
- Theme-aware with automatic dark mode support
- Context-based state management for streaming

## Props

### `<Plan />`

:::field-group
  ::field{name="isStreaming" type="boolean" defaultValue="false"}
  Whether content is currently streaming. Enables shimmer animations on title and description. Defaults to false.
  ::

  ::field{name="defaultOpen" type="boolean" defaultValue="false"}
  Whether the plan is expanded by default.
  ::

  ::field{name="class" type="string"}
  Additional classes applied to the component.
  ::
:::

### `<PlanHeader />`

:::field-group
  ::field{name="class" type="string"}
  Additional classes applied to the component.
  ::
:::

### `<PlanDescription />`

:::field-group
  ::field{name="class" type="string"}
  Additional classes applied to the component.
  ::
:::

### `<PlanTrigger />`

:::field-group
  ::field{name="class" type="string"}
  Additional classes applied to the component.
  ::
:::
:::
