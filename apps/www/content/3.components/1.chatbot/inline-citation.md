---
title: Inline Citation
description:
icon: lucide:message-square-quote
---

The `InlineCitation` component provides a way to display citations inline with text content, similar to academic papers or research documents. It consists of a citation pill that shows detailed source information on hover, making it perfect for AI-generated content that needs to reference sources.

:::ComponentLoader{label="InlineCitation" componentName="InlineCitation"}
:::

## Install using CLI

:::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add inline-citation
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/inline-citation.json
  ```
  ::
:::

## Install Manually

Copy and paste the following files into the same folder.

:::code-group
```vue [InlineCitation.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span :class="cn('group inline items-center gap-1', props.class)">
    <slot />
  </span>
</template>
```

```vue [InlineCitationCard.vue]
<script setup lang="ts">
import { HoverCard } from '@repo/shadcn-vue/components/ui/hover-card'

const props = withDefaults(defineProps<{
  closeDelay?: number
  openDelay?: number
}>(), {
  closeDelay: 0,
  openDelay: 0,
})
</script>

<template>
  <HoverCard :close-delay="props.closeDelay" :open-delay="props.openDelay">
    <slot />
  </HoverCard>
</template>
```

```vue [InlineCitationCardBody.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { HoverCardContent } from '@repo/shadcn-vue/components/ui/hover-card'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <HoverCardContent :class="cn('relative w-80 p-0', props.class)">
    <slot />
  </HoverCardContent>
</template>
```

```vue [InlineCitationCardTrigger.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Badge } from '@repo/shadcn-vue/components/ui/badge'
import { HoverCardTrigger } from '@repo/shadcn-vue/components/ui/hover-card'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'

const props = defineProps<{
  sources: string[]
  class?: HTMLAttributes['class']
}>()

const displayText = computed(() => {
  const firstSource = props.sources[0]
  if (!firstSource)
    return 'unknown'

  try {
    const hostname = new URL(firstSource).hostname
    const additionalCount = props.sources.length - 1
    return additionalCount > 0 ? `${hostname} +${additionalCount}` : hostname
  }
  catch {
    return 'unknown'
  }
})
</script>

<template>
  <HoverCardTrigger as-child>
    <Badge :class="cn('ml-1 rounded-full', props.class)" variant="secondary">
      {{ displayText }}
    </Badge>
  </HoverCardTrigger>
</template>
```

```vue [InlineCitationCarousel.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Carousel } from '@repo/shadcn-vue/components/ui/carousel'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Carousel :class="cn('w-full', props.class)">
    <slot />
  </Carousel>
</template>
```

```vue [InlineCitationCarouselContent.vue]
<script setup lang="ts">
import { CarouselContent } from '@repo/shadcn-vue/components/ui/carousel'
</script>

<template>
  <CarouselContent>
    <slot />
  </CarouselContent>
</template>
```

```vue [InlineCitationCarouselHeader.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="cn('flex items-center justify-between gap-2 rounded-t-md bg-secondary p-2', props.class)"
  >
    <slot />
  </div>
</template>
```

```vue [InlineCitationCarouselIndex.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useCarousel } from '@repo/shadcn-vue/components/ui/carousel'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, nextTick, ref, watch } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { carouselApi } = useCarousel()
const current = ref(0)
const count = ref(0)

const displayText = computed(() => `${current.value}/${count.value}`)

function updateState() {
  if (!carouselApi.value)
    return

  count.value = carouselApi.value.scrollSnapList().length
  current.value = carouselApi.value.selectedScrollSnap() + 1
}

const stop = watch(carouselApi, (api) => {
  if (!api)
    return

  // Watch only once
  nextTick(() => stop())

  updateState()

  api.on('select', () => {
    updateState()
  })
})
</script>

<template>
  <div
    :class="cn('flex flex-1 items-center justify-end px-3 py-1 text-muted-foreground text-xs', props.class)"
  >
    <slot>{{ displayText }}</slot>
  </div>
</template>
```

```vue [InlineCitationCarouselItem.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CarouselItem } from '@repo/shadcn-vue/components/ui/carousel'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <CarouselItem :class="cn('w-full space-y-2 p-4 pl-8', props.class)">
    <slot />
  </CarouselItem>
</template>
```

```vue [InlineCitationCarouselNext.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useCarousel } from '@repo/shadcn-vue/components/ui/carousel'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ArrowRight } from 'lucide-vue-next'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { scrollNext } = useCarousel()
</script>

<template>
  <button
    :class="cn('shrink-0', props.class)"
    type="button"
    aria-label="Next"
    @click="scrollNext"
  >
    <ArrowRight class="size-4 text-muted-foreground" />
  </button>
</template>
```

```vue [InlineCitationCarouselPrev.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useCarousel } from '@repo/shadcn-vue/components/ui/carousel'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ArrowLeft } from 'lucide-vue-next'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { scrollPrev } = useCarousel()
</script>

<template>
  <button
    :class="cn('shrink-0', props.class)"
    type="button"
    aria-label="Previous"
    @click="scrollPrev"
  >
    <ArrowLeft class="size-4 text-muted-foreground" />
  </button>
</template>
```

```vue [InlineCitationQuote.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <blockquote
    :class="cn('border-muted border-l-2 pl-3 text-muted-foreground text-sm italic', props.class)"
  >
    <slot />
  </blockquote>
</template>
```

```vue [InlineCitationSource.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  title?: string
  url?: string
  description?: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn('space-y-1', props.class)">
    <h4 v-if="title" class="truncate font-medium text-sm leading-tight">
      {{ title }}
    </h4>
    <p v-if="url" class="truncate break-all text-muted-foreground text-xs">
      {{ url }}
    </p>
    <p v-if="description" class="line-clamp-3 text-muted-foreground text-sm leading-relaxed">
      {{ description }}
    </p>
    <slot />
  </div>
</template>
```

```vue [InlineCitationText.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span :class="cn('transition-colors group-hover:bg-accent', props.class)">
    <slot />
  </span>
</template>
```

```ts [index.ts]
export { default as InlineCitation } from './InlineCitation.vue'
export { default as InlineCitationCard } from './InlineCitationCard.vue'
export { default as InlineCitationCardBody } from './InlineCitationCardBody.vue'
export { default as InlineCitationCardTrigger } from './InlineCitationCardTrigger.vue'
export { default as InlineCitationCarousel } from './InlineCitationCarousel.vue'
export { default as InlineCitationCarouselContent } from './InlineCitationCarouselContent.vue'
export { default as InlineCitationCarouselHeader } from './InlineCitationCarouselHeader.vue'
export { default as InlineCitationCarouselIndex } from './InlineCitationCarouselIndex.vue'
export { default as InlineCitationCarouselItem } from './InlineCitationCarouselItem.vue'
export { default as InlineCitationCarouselNext } from './InlineCitationCarouselNext.vue'
export { default as InlineCitationCarouselPrev } from './InlineCitationCarouselPrev.vue'
export { default as InlineCitationQuote } from './InlineCitationQuote.vue'
export { default as InlineCitationSource } from './InlineCitationSource.vue'
export { default as InlineCitationText } from './InlineCitationText.vue'
```
:::

## Usage

```vue
<script setup lang="ts">
import {
  InlineCitation,
  InlineCitationCard,
  InlineCitationCardBody,
  InlineCitationCardTrigger,
  InlineCitationCarousel,
  InlineCitationCarouselContent,
  InlineCitationCarouselHeader,
  InlineCitationCarouselIndex,
  InlineCitationCarouselItem,
  InlineCitationCarouselNext,
  InlineCitationCarouselPrev,
  InlineCitationSource,
  InlineCitationText,
} from '@/components/ai-elements/inline-citation'
</script>

<template>
  <InlineCitation>
    <InlineCitationText>{{ citation.text }}</InlineCitationText>
    <InlineCitationCard>
      <InlineCitationCardTrigger
        :sources="citation.sources.map((source) => source.url)"
      />
      <InlineCitationCardBody>
        <InlineCitationCarousel>
          <InlineCitationCarouselHeader>
            <InlineCitationCarouselPrev />
            <InlineCitationCarouselNext />
            <InlineCitationCarouselIndex />
          </InlineCitationCarouselHeader>
          <InlineCitationCarouselContent>
            <InlineCitationCarouselItem>
              <InlineCitationSource
                title="AI SDK"
                url="https://ai-sdk.dev"
                description="The AI Toolkit for TypeScript"
              />
            </InlineCitationCarouselItem>
          </InlineCitationCarouselContent>
        </InlineCitationCarousel>
      </InlineCitationCardBody>
    </InlineCitationCard>
  </InlineCitation>
</template>
```

## Features

- Hover interaction to reveal detailed citation information
- **Carousel navigation** for multiple citations with prev/next controls
- **Live index tracking** showing current slide position (e.g., "1/5")
- Support for source titles, URLs, and descriptions
- Optional quote blocks for relevant excerpts
- Composable architecture for flexible citation formats
- Accessible design with proper keyboard navigation
- Seamless integration with AI-generated content
- Clean visual design that doesn't disrupt reading flow
- Smart badge display showing source hostname and count

## Props

### `<InlineCitation />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<InlineCitationText />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<InlineCitationCard />`

:::field-group
  ::field{name="closeDelay" type="number" optional defaultValue="0"}
  Delay in milliseconds before the hover card closes.
  ::

  ::field{name="openDelay" type="number" optional defaultValue="0"}
  Delay in milliseconds before the hover card opens.
  ::
:::

### `<InlineCitationCardTrigger />`

:::field-group
  ::field{name="sources" type="string[]"}
  Array of source URLs. The first URL's hostname is displayed on the badge, with a count indicator if there are multiple sources.
  ::

  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<InlineCitationCardBody />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<InlineCitationCarousel />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<InlineCitationCarouselContent />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<InlineCitationCarouselItem />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<InlineCitationCarouselHeader />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<InlineCitationCarouselIndex />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<InlineCitationCarouselPrev />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<InlineCitationCarouselNext />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<InlineCitationSource />`

:::field-group
  ::field{name="title" type="string" optional}
  The title of the citation source.
  ::

  ::field{name="url" type="string" optional}
  The URL of the citation source.
  ::

  ::field{name="description" type="string" optional}
  A brief description of the citation source.
  ::

  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<InlineCitationQuote />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::
