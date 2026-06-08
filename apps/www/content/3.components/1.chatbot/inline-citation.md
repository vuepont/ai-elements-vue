---
title: Inline Citation
description: A hoverable citation component that displays source information and quotes inline with text, perfect for AI-generated content with references.
icon: lucide:message-square-quote
---

The `InlineCitation` component provides a way to display citations inline with text content, similar to academic papers or research documents. It consists of a citation pill that shows detailed source information on hover, making it perfect for AI-generated content that needs to reference sources.

:::ComponentLoader{label="Preview" componentName="InlineCitation"}
:::

## Install using CLI

:::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add inline-citation
  ```
  ::
  ::div{label="shadcn-vue CLI"}

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

```vue [InlineCitationCarousel.vue] height=500 collapse
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

```vue [InlineCitationCarouselIndex.vue] height=500 collapse
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
import { ArrowRight } from '@lucide/vue'
import { useCarousel } from '@repo/shadcn-vue/components/ui/carousel'
import { cn } from '@repo/shadcn-vue/lib/utils'

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
import { ArrowLeft } from '@lucide/vue'
import { useCarousel } from '@repo/shadcn-vue/components/ui/carousel'
import { cn } from '@repo/shadcn-vue/lib/utils'

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

## Usage with AI SDK

Build citations for AI-generated content using [experimental_generateObject](https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-object).

Add the following component to your frontend:

```vue [pages/index.vue] height=500 collapse
<script setup lang="ts">
import { experimental_useObject as useObject } from '@ai-sdk/vue'
import { computed } from 'vue'
import { citationSchema } from '@/app/api/citation/route'
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
  InlineCitationQuote,
  InlineCitationSource,
} from '@/components/ai-elements/inline-citation'

import { Button } from '@/components/ui/button'

const { object, submit, isLoading } = useObject({
  api: '/api/citation',
  schema: citationSchema,
})

function handleSubmit(topic: string) {
  submit({ prompt: topic })
}

// Parse the content string to separate text from citation markers (e.g., [1])
const parsedContent = computed(() => {
  const content = object.value?.content
  if (!content)
    return []

  // Split by the citation pattern [number]
  const parts = content.split(/(\[\d+\])/)

  return parts.map((part) => {
    const citationMatch = part.match(/\[(\d+)\]/)

    if (citationMatch) {
      const citationNumber = citationMatch[1]
      // Find the corresponding citation data
      const citation = object.value?.citations?.find(
        (c: any) => String(c.number) === citationNumber
      )

      if (citation) {
        return {
          type: 'citation',
          data: citation,
          key: `citation-${citationNumber}`,
        }
      }
    }

    return {
      type: 'text',
      content: part,
      key: `text-${nanoid()}`
    }
  })
})

// Simple helper for unique keys if nanoid isn't available
function nanoid() {
  return Math.random().toString(36).substring(7)
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 space-y-6">
    <div class="flex gap-2 mb-6">
      <Button
        :disabled="isLoading"
        variant="outline"
        @click="handleSubmit('artificial intelligence')"
      >
        Generate AI Content
      </Button>
      <Button
        :disabled="isLoading"
        variant="outline"
        @click="handleSubmit('climate change')"
      >
        Generate Climate Content
      </Button>
    </div>

    <div v-if="isLoading && !object" class="text-muted-foreground">
      Generating content with citations...
    </div>

    <div v-if="object?.content" class="prose prose-sm max-w-none">
      <p class="leading-relaxed">
        <template v-for="(part, index) in parsedContent" :key="index">
          <span v-if="part.type === 'text'">{{ part.content }}</span>

          <InlineCitation v-else-if="part.type === 'citation' && part.data">
            <InlineCitationCard>
              <InlineCitationCardTrigger :sources="[part.data.url]" />
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
                        :title="part.data.title"
                        :url="part.data.url"
                        :description="part.data.description"
                      />
                      <InlineCitationQuote v-if="part.data.quote">
                        {{ part.data.quote }}
                      </InlineCitationQuote>
                    </InlineCitationCarouselItem>
                  </InlineCitationCarouselContent>
                </InlineCitationCarousel>
              </InlineCitationCardBody>
            </InlineCitationCard>
          </InlineCitation>
        </template>
      </p>
    </div>
  </div>
</template>
```

Add the following route to your backend:

```ts [server/api/citation.ts]
import { streamObject } from 'ai'
import { z } from 'zod'

export const citationSchema = z.object({
  content: z.string(),
  citations: z.array(
    z.object({
      number: z.string(),
      title: z.string(),
      url: z.string(),
      description: z.string().optional(),
      quote: z.string().optional(),
    })
  ),
})

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export default defineEventHandler(async (event) => {
  const body = await readBody<{ prompt: string }>(event)

  const result = streamObject({
    model: 'openai/gpt-4o',
    schema: citationSchema,
    prompt: `Generate a well-researched paragraph about ${body.prompt} with proper citations.

    Include:
    - A comprehensive paragraph with inline citations marked as [1], [2], etc.
    - 2-3 citations with realistic source information
    - Each citation should have a title, URL, and optional description/quote
    - Make the content informative and the sources credible

    Format citations as numbered references within the text.`,
  })

  return result.toTextStreamResponse()
})
```

Currently, there is no official support for inline citations with Streamdown or the Response component. This is because:

- There isn't any good markdown syntax for inline citations
- Language models don't naturally respond with inline citation syntax
- The AI SDK doesn't have built-in support for inline citations

### Potential Approaches

While these methods are hypothetical and not officially supported, there are two conceptual ways inline citations could work with Streamdown:

1. **Footnote conversion**: GitHub Flavored Markdown (GFM) handles footnotes using `[^1]` syntax. You could hypothetically remove the default footnote rendering and convert footnotes to inline citations instead.

2. **Custom HTML syntax**: You could add a system prompt instructing the model to use a special HTML syntax like `<citation />` and pass that as a custom component to Streamdown.

These approaches require custom implementation and are not currently supported out of the box. We will investigate official support for this use case in the future.

For now, the recommended approach is to use `experimental_useObject` (as shown in the usage example above) to generate structured citation data, then manually parse and render inline citations.

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
