---
title: 来源
description:
icon: lucide:book-open
---

`Sources` 组件允许用户查看用于生成响应的来源或引用。

:::ComponentLoader{label="Preview" componentName="Sources"}
:::

## Install using CLI

::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add sources
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/sources.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

:::code-group
```vue [Source.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { BookIcon } from 'lucide-vue-next'

const props = defineProps<{
  href: string
  title: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <a
    :class="cn('flex items-center gap-2', props.class)"
    :href="props.href"
    rel="noreferrer"
    target="_blank"
  >
    <slot>
      <BookIcon class="h-4 w-4" />
      <span class="block font-medium">{{ props.title }}</span>
    </slot>
  </a>
</template>
```

```vue [Sources.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Collapsible } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Collapsible
    :class="cn('not-prose mb-4 text-primary text-xs', props.class)"
  >
    <slot />
  </Collapsible>
</template>
```

```vue [SourcesTrigger.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ChevronDownIcon } from 'lucide-vue-next'

const props = defineProps<{
  count: number
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <CollapsibleTrigger
    :class="cn('flex items-center gap-2', props.class)"
  >
    <slot>
      <p class="font-medium">
        Used {{ props.count }} sources
      </p>
      <ChevronDownIcon class="h-4 w-4" />
    </slot>
  </CollapsibleTrigger>
</template>
```

```vue [SourcesContent.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CollapsibleContent } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <CollapsibleContent
    :class="
      cn(
        'mt-3 flex w-fit flex-col gap-2',
        'data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
        props.class,
      )
    "
  >
    <slot />
  </CollapsibleContent>
</template>
```

```ts [index.ts]
export { default as Source } from './Source.vue'
export { default as Sources } from './Sources.vue'
export { default as SourcesContent } from './SourcesContent.vue'
export { default as SourcesTrigger } from './SourcesTrigger.vue'
```
:::

## Usage

```ts
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from '@/components/ai-elements/sources'
```

```vue
<Sources>
  <SourcesTrigger count="1" />
  <SourcesContent>
    <Source href="https://ai-sdk.dev" title="AI SDK" />
  </SourcesContent>
</Sources>
```

## Usage with AI SDK

Build a simple web search agent with Perplexity Sonar.

Add the following component to your frontend:

```vue [pages/index.vue]
<script setup lang="ts">
import { useChat } from '@ai-sdk/vue'
import { DefaultChatTransport } from 'ai'
import { ref } from 'vue'

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation'
import { Message, MessageContent } from '@/components/ai-elements/message'
import {
  Input,
  PromptInputSubmit,
  PromptInputTextarea,
} from '@/components/ai-elements/prompt-input'
import { Response } from '@/components/ai-elements/response'
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from '@/components/ai-elements/sources'

const input = ref('')

const { messages, sendMessage, status } = useChat({
  transport: new DefaultChatTransport({
    api: '/api/sources',
  }),
})

function handleSubmit() {
  if (input.value.trim()) {
    sendMessage({ text: input.value })
    input.value = ''
  }
}

function getSourceParts(message: any) {
  return message.parts.filter((part: any) => part.type === 'source-url')
}

function getTextParts(message: any) {
  return message.parts.filter((part: any) => part.type === 'text')
}
</script>

<template>
  <div
    class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]"
  >
    <div class="flex flex-col h-full">
      <div class="flex-1 overflow-auto mb-4">
        <Conversation>
          <ConversationContent>
            <div v-for="message in messages" :key="message.id">
              <Sources v-if="message.role === 'assistant'">
                <SourcesTrigger :count="getSourceParts(message).length" />
                <SourcesContent>
                  <template
                    v-for="(part, i) in getSourceParts(message)"
                    :key="`${message.id}-${i}`"
                  >
                    <Source :href="part.url" :title="part.url" />
                  </template>
                </SourcesContent>
              </Sources>

              <Message :from="message.role">
                <MessageContent>
                  <template
                    v-for="(part, i) in getTextParts(message)"
                    :key="`${message.id}-${i}`"
                  >
                    <Response>{{ part.text }}</Response>
                  </template>
                </MessageContent>
              </Message>
            </div>
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      </div>

      <Input
        class="mt-4 w-full max-w-2xl mx-auto relative"
        @submit.prevent="handleSubmit"
      >
        <PromptInputTextarea
          v-model="input"
          placeholder="Ask a question and search the..."
          class="pr-12"
        />
        <PromptInputSubmit
          :status="status === 'streaming' ? 'streaming' : 'ready'"
          :disabled="!input.trim()"
          class="absolute bottom-1 right-1"
        />
      </Input>
    </div>
  </div>
</template>
```

Add the following route to your backend:

```ts [server/api/chat/route.ts]
import type { UIMessage } from 'ai'
import { perplexity } from '@ai-sdk/perplexity'
import { convertToModelMessages, streamText } from 'ai'

export const maxDuration = 30

export default defineEventHandler(async (event) => {
  const body = await readBody<{ messages: UIMessage[] }>(event)

  const result = streamText({
    model: perplexity('sonar'),
    system:
      'You are a helpful assistant. Keep your responses short (< 100 words) unless you are asked for more details. ALWAYS USE SEARCH.',
    messages: convertToModelMessages(body.messages),
  })

  return result.toUIMessageStreamResponse({
    sendSources: true,
  })
})
```

## Features

- Collapsible component that allows a user to view the sources or citations used to generate a response
- Customizable trigger and content components
- Support for custom sources or citations
- Responsive design with mobile-friendly controls
- Clean, modern styling with customizable themes

## Examples

### Custom Rendering

:::ComponentLoader{label="Preview" componentName="SourcesCustomRendering"}
:::

## Props

### `<Source />`

:::field-group
  ::field{name="href" type="string" defaultValue="''"}
  The URL of the source.
  ::

  ::field{name="title" type="string" defaultValue="''"}
  The title of the source.
  ::

  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<Sources />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<SourcesTrigger />`

:::field-group
  ::field{name="count" type="number" defaultValue="0"}
  The number of sources or citations.
  ::

  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<SourcesContent />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::
