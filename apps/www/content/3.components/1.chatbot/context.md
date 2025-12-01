---
title: Context
description: A compound component system for displaying AI model context window usage, token consumption, and cost estimation.
icon: lucide:layers
---

The `Context` component provides a comprehensive view of AI model usage through a compound component system. It displays context window utilization, token consumption breakdown (input, output, reasoning, cache), and cost estimation in an interactive hover card interface.

:::ComponentLoader{label="Preview" componentName="Context"}
:::

## Install using CLI

:::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add context
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/context.json
  ```
  ::
:::

## Install Manually

Copy and paste the following files into the same folder.

:::code-group
```vue [Context.vue] height=260 collapse
<script setup lang="ts">
import type { LanguageModelUsage } from 'ai'
import type { ModelId } from './context'
import { HoverCard } from '@repo/shadcn-vue/components/ui/hover-card'
import { computed, provide } from 'vue'
import { ContextKey } from './context'

interface Props {
  usedTokens: number
  maxTokens: number
  usage?: LanguageModelUsage
  modelId?: ModelId
}

const props = defineProps<Props>()

provide(ContextKey, {
  usedTokens: computed(() => props.usedTokens),
  maxTokens: computed(() => props.maxTokens),
  usage: computed(() => props.usage),
  modelId: computed(() => props.modelId),
})
</script>

<template>
  <HoverCard :close-delay="0" :open-delay="0" v-bind="{ ...$attrs, ...props }">
    <slot />
  </HoverCard>
</template>
```

```vue [ContextIcon.vue] height=260 collapse
<script setup lang="ts">
import { computed } from 'vue'
import { useContextValue } from './context'

const ICON_RADIUS = 10
const ICON_VIEWBOX = 24
const ICON_CENTER = 12
const ICON_STROKE_WIDTH = 2

const { usedTokens, maxTokens } = useContextValue()

const circumference = 2 * Math.PI * ICON_RADIUS

const usedPercent = computed(() => {
  if (maxTokens.value === 0)
    return 0
  return usedTokens.value / maxTokens.value
})

const dashOffset = computed(() => {
  return circumference * (1 - usedPercent.value)
})

const svgStyle = {
  transformOrigin: 'center',
  transform: 'rotate(-90deg)',
}
</script>

<template>
  <svg
    aria-label="Model context usage"
    height="20"
    role="img"
    style="color: currentcolor"
    :viewBox="`0 0 ${ICON_VIEWBOX} ${ICON_VIEWBOX}`"
    width="20"
  >
    <circle
      :cx="ICON_CENTER"
      :cy="ICON_CENTER"
      fill="none"
      opacity="0.25"
      :r="ICON_RADIUS"
      stroke="currentColor"
      :stroke-width="ICON_STROKE_WIDTH"
    />
    <circle
      :cx="ICON_CENTER"
      :cy="ICON_CENTER"
      fill="none"
      opacity="0.7"
      :r="ICON_RADIUS"
      stroke="currentColor"
      :stroke-dasharray="`${circumference} ${circumference}`"
      :stroke-dashoffset="dashOffset"
      stroke-linecap="round"
      :stroke-width="ICON_STROKE_WIDTH"
      :style="svgStyle"
    />
  </svg>
</template>
```

```vue [ContextTrigger.vue] height=260 collapse
<script setup lang="ts">
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { HoverCardTrigger } from '@repo/shadcn-vue/components/ui/hover-card'
import { computed, useSlots } from 'vue'
import { useContextValue } from './context'
import ContextIcon from './ContextIcon.vue'

const { usedTokens, maxTokens } = useContextValue()
const slots = useSlots()

const renderedPercent = computed(() => {
  if (maxTokens.value === 0)
    return '0%'
  const usedPercent = usedTokens.value / maxTokens.value
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 1,
  }).format(usedPercent)
})
</script>

<template>
  <HoverCardTrigger as-child>
    <slot v-if="slots.default" />

    <Button v-else type="button" variant="ghost" v-bind="$attrs">
      <span class="font-medium text-muted-foreground">
        {{ renderedPercent }}
      </span>
      <ContextIcon />
    </Button>
  </HoverCardTrigger>
</template>
```

```vue [ContextContent.vue] height=260 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { HoverCardContent } from '@repo/shadcn-vue/components/ui/hover-card'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <HoverCardContent
    :class="
      cn('min-w-60 divide-y overflow-hidden p-0', props.class)
    "
    v-bind="$attrs"
  >
    <slot />
  </HoverCardContent>
</template>
```

```vue [ContextContentHeader.vue] height=260 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Progress } from '@repo/shadcn-vue/components/ui/progress'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, useSlots } from 'vue'
import { useContextValue } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const PERCENT_MAX = 100

const { usedTokens, maxTokens } = useContextValue()
const slots = useSlots()

const formatter = new Intl.NumberFormat('en-US', { notation: 'compact' })

const usedPercent = computed(() => {
  if (maxTokens.value === 0)
    return 0
  return usedTokens.value / maxTokens.value
})
const displayPct = computed(() => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 1,
  }).format(usedPercent.value)
})
const used = computed(() => formatter.format(usedTokens.value))
const total = computed(() => formatter.format(maxTokens.value))
</script>

<template>
  <div :class="cn('w-full space-y-2 p-3', props.class)">
    <slot v-if="slots.default" />

    <template v-else>
      <div class="flex items-center justify-between gap-3 text-xs">
        <p>{{ displayPct }}</p>
        <p class="font-mono text-muted-foreground">
          {{ used }} / {{ total }}
        </p>
      </div>
      <div class="space-y-2">
        <Progress class="bg-muted" :model-value="usedPercent * PERCENT_MAX" />
      </div>
    </template>
  </div>
</template>
```

```vue [ContextContentBody.vue] height=260 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn('w-full p-3', props.class)" v-bind="$attrs">
    <slot />
  </div>
</template>
```

```vue [ContextContentFooter.vue] height=260 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { getUsage } from 'tokenlens'
import { computed, useSlots } from 'vue'
import { useContextValue } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { modelId, usage } = useContextValue()
const slots = useSlots()

const totalCost = computed(() => {
  if (!modelId.value)
    return 0

  const costUSD = getUsage({
    modelId: modelId.value,
    usage: {
      input: usage.value?.inputTokens ?? 0,
      output: usage.value?.outputTokens ?? 0,
    },
  }).costUSD?.totalUSD

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(costUSD ?? 0)
})
</script>

<template>
  <div
    :class="
      cn(
        'flex w-full items-center justify-between gap-3 bg-secondary p-3 text-xs',
        props.class,
      )
    "
  >
    <slot v-if="slots.default" />

    <template v-else>
      <span class="text-muted-foreground">Total cost</span>
      <span>{{ totalCost }}</span>
    </template>
  </div>
</template>
```

```vue [ContextInputUsage.vue] height=260 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { getUsage } from 'tokenlens'
import { computed, useSlots } from 'vue'
import { useContextValue } from './context'
import TokensWithCost from './TokensWithCost.vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { usage, modelId } = useContextValue()
const slots = useSlots()

const inputTokens = computed(() => usage.value?.inputTokens ?? 0)

const inputCostText = computed(() => {
  if (!modelId.value || !inputTokens.value)
    return undefined

  const inputCost = getUsage({
    modelId: modelId.value,
    usage: { input: inputTokens.value, output: 0 },
  }).costUSD?.totalUSD

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(inputCost ?? 0)
})
</script>

<template>
  <slot v-if="slots.default" />

  <div
    v-else-if="inputTokens > 0"
    :class="
      cn('flex items-center justify-between text-xs', props.class)
    "
    v-bind="$attrs"
  >
    <span class="text-muted-foreground">Input</span>
    <TokensWithCost :cost-text="inputCostText" :tokens="inputTokens" />
  </div>
</template>
```

```vue [ContextOutputUsage.vue] height=260 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { getUsage } from 'tokenlens'
import { computed, useSlots } from 'vue'
import { useContextValue } from './context'
import TokensWithCost from './TokensWithCost.vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { usage, modelId } = useContextValue()
const slots = useSlots()

const outputTokens = computed(() => usage.value?.outputTokens ?? 0)

const outputCostText = computed(() => {
  if (!modelId.value || !outputTokens.value)
    return undefined

  const outputCost = getUsage({
    modelId: modelId.value,
    usage: { input: 0, output: outputTokens.value },
  }).costUSD?.totalUSD

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(outputCost ?? 0)
})
</script>

<template>
  <slot v-if="slots.default" />
  <div
    v-else-if="outputTokens > 0"
    :class="
      cn('flex items-center justify-between text-xs', props.class)
    "
    v-bind="$attrs"
  >
    <span class="text-muted-foreground">Output</span>
    <TokensWithCost :cost-text="outputCostText" :tokens="outputTokens" />
  </div>
</template>
```

```vue [ContextReasoningUsage.vue] height=260 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { getUsage } from 'tokenlens'
import { computed, useSlots } from 'vue'
import { useContextValue } from './context'
import TokensWithCost from './TokensWithCost.vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { usage, modelId } = useContextValue()
const slots = useSlots()

const reasoningTokens = computed(() => usage.value?.reasoningTokens ?? 0)

const reasoningCostText = computed(() => {
  if (!modelId.value || !reasoningTokens.value)
    return undefined

  const reasoningCost = getUsage({
    modelId: modelId.value,
    usage: { reasoningTokens: reasoningTokens.value },
  }).costUSD?.totalUSD

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(reasoningCost ?? 0)
})
</script>

<template>
  <slot v-if="slots.default" />
  <div
    v-else-if="reasoningTokens > 0"
    :class="
      cn('flex items-center justify-between text-xs', props.class)
    "
    v-bind="$attrs"
  >
    <span class="text-muted-foreground">Reasoning</span>
    <TokensWithCost
      :cost-text="reasoningCostText"
      :tokens="reasoningTokens"
    />
  </div>
</template>
```

```vue [ContextCacheUsage.vue] height=260 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { getUsage } from 'tokenlens'
import { computed, useSlots } from 'vue'
import { useContextValue } from './context'
import TokensWithCost from './TokensWithCost.vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { usage, modelId } = useContextValue()
const slots = useSlots()

const cacheTokens = computed(() => usage.value?.cachedInputTokens ?? 0)

const cacheCostText = computed(() => {
  if (!modelId.value || !cacheTokens.value)
    return undefined

  const cacheCost = getUsage({
    modelId: modelId.value,
    usage: { cacheReads: cacheTokens.value, input: 0, output: 0 },
  }).costUSD?.totalUSD

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cacheCost ?? 0)
})
</script>

<template>
  <slot v-if="slots.default" />
  <div
    v-else-if="cacheTokens > 0"
    :class="
      cn('flex items-center justify-between text-xs', props.class)
    "
    v-bind="$attrs"
  >
    <span class="text-muted-foreground">Cache</span>
    <TokensWithCost :cost-text="cacheCostText" :tokens="cacheTokens" />
  </div>
</template>
```

```vue [TokensWithCost.vue] height=260 collapse
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  tokens?: number
  costText?: string
}>()

const formattedTokens = computed(() => {
  return props.tokens === undefined
    ? '—'
    : new Intl.NumberFormat('en-US', {
        notation: 'compact',
      }).format(props.tokens)
})
</script>

<template>
  <span>
    {{ formattedTokens }}
    <span v-if="costText" class="ml-2 text-muted-foreground">
      • {{ costText }}
    </span>
  </span>
</template>
```

```ts [context.ts]  height=260 collapse
import type { LanguageModelUsage } from 'ai'
import type { ComputedRef, InjectionKey } from 'vue'
import { inject } from 'vue'

export type ModelId = string

export interface ContextContextValue {
  usedTokens: ComputedRef<number>
  maxTokens: ComputedRef<number>
  usage: ComputedRef<LanguageModelUsage | undefined>
  modelId: ComputedRef<ModelId | undefined>
}

export const ContextKey: InjectionKey<ContextContextValue>
  = Symbol('ContextContext')

export function useContextValue(): ContextContextValue {
  const context = inject<ContextContextValue>(ContextKey)
  if (!context) {
    throw new Error('Context components must be used within Context')
  }
  return context
}
```

```ts [index.ts]  height=260 collapse
export { default as Context } from './Context.vue'
export { default as ContextCacheUsage } from './ContextCacheUsage.vue'
export { default as ContextContent } from './ContextContent.vue'
export { default as ContextContentBody } from './ContextContentBody.vue'
export { default as ContextContentFooter } from './ContextContentFooter.vue'
export { default as ContextContentHeader } from './ContextContentHeader.vue'
export { default as ContextIcon } from './ContextIcon.vue'
export { default as ContextInputUsage } from './ContextInputUsage.vue'
export { default as ContextOutputUsage } from './ContextOutputUsage.vue'
export { default as ContextReasoningUsage } from './ContextReasoningUsage.vue'
export { default as ContextTrigger } from './ContextTrigger.vue'
export { default as TokensWithCost } from './TokensWithCost.vue'
```
:::

## Component Architecture

The Context component uses a compound component pattern with Vue's `provide/inject` API for data sharing:

1. **`<Context>`** - Root provider component that holds all context data
2. **`<ContextTrigger>`** - Interactive trigger element (default: button with percentage)
3. **`<ContextContent>`** - Hover card content container
4. **`<ContextContentHeader>`** - Header section with progress visualization
5. **`<ContextContentBody>`** - Body section for usage breakdowns
6. **`<ContextContentFooter>`** - Footer section for total cost
7. **Usage Components** - Individual token usage displays (Input, Output, Reasoning, Cache)

## Token Formatting

The component uses `Intl.NumberFormat` with compact notation for automatic formatting:

- Under 1,000: Shows exact count (e.g., "842")
- 1,000+: Shows with K suffix (e.g., "32K")
- 1,000,000+: Shows with M suffix (e.g., "1.5M")
- 1,000,000,000+: Shows with B suffix (e.g., "2.1B")

## Cost Calculation

When a `modelId` is provided, the component automatically calculates costs using the `tokenlens` library:

- **Input tokens**: Cost based on model's input pricing
- **Output tokens**: Cost based on model's output pricing
- **Reasoning tokens**: Special pricing for reasoning-capable models
- **Cached tokens**: Reduced pricing for cached input tokens
- **Total cost**: Sum of all token type costs

Costs are formatted using `Intl.NumberFormat` with USD currency.

## Styling

The component uses Tailwind CSS classes and follows your design system:

- Progress indicator uses `currentColor` for theme adaptation
- Hover card has customizable width and padding
- Footer has a secondary background for visual separation
- All text sizes use the `text-xs` class for consistency
- Muted foreground colors for secondary information

## Features

- **Compound Component Architecture:** Flexible composition of context display elements
- **Visual Progress Indicator:** Circular SVG progress ring showing context usage percentage
- **Token Breakdown:** Detailed view of input, output, reasoning, and cached tokens
- **Cost Estimation:** Real-time cost calculation using the tokenlens library
- **Intelligent Formatting:** Automatic token count formatting (K, M, B suffixes)
- **Interactive Hover Card:** Detailed information revealed on hover
- **Context Provider Pattern:** Clean data flow through Vue’s `provide/inject` API
- **TypeScript Support:** Full type definitions for all components
- **Accessible Design:** Proper ARIA labels and semantic HTML
- **Theme Integration:** Uses currentColor for automatic theme adaptation

## Props

### `<Context />`

:::field-group
  ::field{name="maxTokens" type="number" }
  The total context window size in tokens.
  ::

  ::field{name="usedTokens" type="number"}
  The number of tokens currently used.
  ::

  ::field{name="usage" type="LanguageModelUsage"}
  Detailed token usage breakdown from the AI SDK (input, output, reasoning, cached tokens).
  ::

  ::field{name="modelId" type="string"}
  Model identifier for cost calculation (e.g., "openai:gpt-4", "anthropic:claude-3-opus").
  ::
:::

### `<ContextContent />`

:::field-group
  ::field{name="class" type="string"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<ContextContentHeader />`

:::field-group
  ::field{name="class" type="string"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<ContextContentBody />`

:::field-group
  ::field{name="class" type="string"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<ContextContentFooter />`

:::field-group
  ::field{name="class" type="string"}
  Additional CSS classes to apply to the component.
  ::
:::

### Usage Components

All usage components (`ContextInputUsage`, `ContextOutputUsage`, `ContextReasoningUsage`, `ContextCacheUsage`) share the same props:

:::field-group
  ::field{name="class" type="string"}
  Additional CSS classes to apply to the component.
  ::
:::
