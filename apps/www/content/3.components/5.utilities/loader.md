---
title: Loader
description: A spinning loader component for indicating loading states in AI applications.
icon: lucide:loader
---

The `Loader` component provides a spinning animation to indicate loading states in your AI applications. It includes both a customizable wrapper component and the underlying icon for flexible usage.

:::ComponentLoader{label="Preview" componentName="Loader"}
:::

## Install using CLI

:::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add loader
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/loader.json
  ```
  ::
:::

## Install Manually

Copy and paste the following files into the same folder.

:::code-group
  ```vue [Loader.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import LoaderIcon from './LoaderIcon.vue'

  interface Props {
    size?: number
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    size: 16,
  })
  </script>

  <template>
    <div
      :class="cn('inline-flex animate-spin items-center justify-center', props.class)"
      aria-label="Loading"
      aria-live="polite"
      role="status"
      v-bind="$attrs"
    >
      <LoaderIcon :size="props.size" />
    </div>
  </template>
  ```

  ```ts [index.ts]
  export { default as Loader } from './Loader.vue'
  export { default as LoaderIcon } from './LoaderIcon.vue'
  ```
:::

## Usage with AI SDK

Build a simple chat app that displays a loader before it the response streans by using `status === "submitted"`.

Add the following component to your frontend:

```vue [pages/index.vue] height=500 collapse
<script lang="ts" setup>
import { useChat } from '@ai-sdk/vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ref } from 'vue'
import { Conversation, ConversationContent, ConversationScrollButton } from '@/components/ai-elements/conversation'
import { Loader } from '@/components/ai-elements/loader'
import { Message, MessageContent } from '@/components/ai-elements/message'
import { PromptInput, PromptInputSubmit, PromptInputTextarea } from '@/components/ai-elements/prompt-input'

const input = ref('')
const { messages, sendMessage, status } = useChat()

function handleSubmit(e: Event) {
  if (input.value.trim()) {
    sendMessage({ text: input.value })
    input.value = ''
  }
}
</script>

<template>
  <div
    class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]"
  >
    <div class="flex flex-col h-full">
      <Conversation>
        <ConversationContent>
          <Message v-for="message in messages" :key="message.id" :from="message.role">
            <MessageContent>
              <template v-for="(part, i) in message.parts" :key="`${message.id}-${i}`">
                <div v-if="part.type === 'text'">
                  {{ part.text }}
                </div>
              </template>
            </MessageContent>
          </Message>
          <Loader v-if="status === 'submitted'" />
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <PromptInput
        class="mt-4 w-full max-w-2xl mx-auto relative"
        @submit.prevent="handleSubmit"
      >
        <PromptInputTextarea
          v-model="input"
          placeholder="Say something..."
          class="pr-12"
        />
        <PromptInputSubmit
          :status="status === 'streaming' ? 'streaming' : 'ready'"
          :disabled="!input.trim()"
          class="absolute bottom-1 right-1"
        />
      </PromptInput>
    </div>
  </div>
</template>
```

Add the following route to your backend:

```ts [api/chat/route.ts]
import { convertToModelMessages, streamText, UIMessage } from 'ai'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { model, messages }: { messages: UIMessage[], model: string } = await req.json()

  const result = streamText({
    model: 'openai/gpt-4o',
    messages: convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
```

## Features

- Clean, modern spinning animation using CSS animations
- Configurable size with the `size` prop
- Customizable styling with CSS classes
- Built-in `animate-spin` animation with proper centering
- Exports both `AILoader` wrapper and `LoaderIcon` for flexible usage
- Supports all standard HTML div attributes
- TypeScript support with proper type definitions
- Optimized SVG icon with multiple opacity levels for smooth animation
- Uses `currentColor` for proper theme integration
- Responsive and accessible design

## Examples

### Different Sizes

:::ComponentLoader{label="Preview" componentName="LoaderSizes"}
:::

### Custom Styling

:::ComponentLoader{label="Preview" componentName="LoaderCustomStyling"}
:::

## Props

### `<Loader />`

:::field-group
  ::field{name="size" type="number" optional defaultValue="16"}
  The size (width and height) of the loader in pixels. Defaults to 16.
  ::

  ::field{name="class" type="string" optional defaultValue="''"}
  Additional CSS classes applied to the component.
  ::
:::
