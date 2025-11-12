---
title: Loader
description:
icon: lucide:loader
---

The `Loader`  component provides a spinning animation to indicate loading states in your AI applications. It includes both a customizable wrapper component and the underlying icon for flexible usage.

:::ComponentLoader{label="Preview" componentName="Loader"}
:::

## Install using CLI

:::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add loader
  ```
  ::
  ::div{label="shadcn-vue"}

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
import { cn } from '@repo/shadcn-vue/lib/utils'
import LoaderIcon from './LoaderIcon.vue'

interface Props {
    size?: number
    class?: string
}

const props = withDefaults(defineProps<Props>(), {
    size: 16,
})
</script>

<template>
    <div
      :class="cn('inline-flex animate-spin items-center justify-center', props.class)"
      v-bind="$attrs"
    >
      <LoaderIcon :size="props.size" />
    </div>
</template>
```

```vue [LoaderIcon.vue]
<script setup lang="ts">
interface Props {
  size?: number
}

withDefaults(defineProps<Props>(), {
  size: 16,
})
</script>

<template>
  <svg
    :height="size"
    stroke-linejoin="round"
    :style="{ color: 'currentcolor' }"
    viewBox="0 0 16 16"
    :width="size"
  >
    <title>Loader</title>
    <g clip-path="url(#clip0_2393_1490)">
      <path d="M8 0V4" stroke="currentColor" stroke-width="1.5" />
      <path d="M8 16V12" opacity="0.5" stroke="currentColor" stroke-width="1.5" />
      <path d="M3.29773 1.52783L5.64887 4.7639" opacity="0.9" stroke="currentColor" stroke-width="1.5" />
      <path d="M12.7023 1.52783L10.3511 4.7639" opacity="0.1" stroke="currentColor" stroke-width="1.5" />
      <path d="M12.7023 14.472L10.3511 11.236" opacity="0.4" stroke="currentColor" stroke-width="1.5" />
      <path d="M3.29773 14.472L5.64887 11.236" opacity="0.6" stroke="currentColor" stroke-width="1.5" />
      <path d="M15.6085 5.52783L11.8043 6.7639" opacity="0.2" stroke="currentColor" stroke-width="1.5" />
      <path d="M0.391602 10.472L4.19583 9.23598" opacity="0.7" stroke="currentColor" stroke-width="1.5" />
      <path d="M15.6085 10.4722L11.8043 9.2361" opacity="0.3" stroke="currentColor" stroke-width="1.5" />
      <path d="M0.391602 5.52783L4.19583 6.7639" opacity="0.8" stroke="currentColor" stroke-width="1.5" />
    </g>
    <defs>
      <clipPath id="clip0_2393_1490">
        <rect fill="white" height="16" width="16" />
      </clipPath>
    </defs>
  </svg>
</template>
  ```

  ```ts [index.ts]
  export { default as Loader } from './Loader.vue'
  ```
:::

## Usage

```vue
<script setup lang="ts">
import { Loader } from '@/components/ai-elements/loader'
</script>

<template>
  <Loader />
</template>
```

## Usage with AI SDK

Build a simple chat app that displays a loader before it the response streans by using `status === "submitted"`.

Add the following component to your frontend:

```vue [pages/index.vue]
<script lang="ts" setup>
import { useChat } from '@ai-sdk/vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ref } from 'vue'
import { Conversation, ConversationContent, ConversationScrollButton } from '@/components/ai-elements/conversation'
import { Loader } from '@/components/ai-elements/loader'
import { Message, MessageContent } from '@/components/ai-elements/message'
import { Input, PromptInputSubmit, PromptInputTextarea } from '@/components/ai-elements/prompt-input'

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

      <Input
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
      </Input>
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
