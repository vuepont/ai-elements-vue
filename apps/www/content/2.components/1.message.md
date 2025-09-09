---
title: Message
description:
icon: lucide:message-circle
---

The `Message` component displays a chat interface message from either a user or an AI. It includes an avatar, a name, and a message content.

:::ComponentLoader{label="Message" componentName="Message"}
:::

## Install using CLI

::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add message
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/message.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

::code-group
  ```vue [Message.vue]
  <script setup lang="ts">
  interface Props {
    from: 'user' | 'assistant'
    class?: string
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <div
      class="group flex w-full items-end justify-end gap-2 py-4 [&>div]:max-w-[80%]"
      :class="[
        props.from === 'user'
          ? 'is-user'
          : 'is-assistant flex-row-reverse justify-end',
        props.class,
      ]"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [MessageContent.vue]
  <script setup lang="ts">
  import { computed } from 'vue'

  interface Props {
    class?: string
  }

  const props = defineProps<Props>()

  const classes = computed(() => [
    'flex flex-col gap-2 overflow-hidden rounded-lg px-4 py-3 text-foreground text-sm',
    'group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground',
    'group-[.is-assistant]:bg-secondary group-[.is-assistant]:text-foreground',
    'is-user:dark',
    props.class,
  ])
  </script>

  <template>
    <div :class="classes">
      <slot />
    </div>
  </template>
  ```

  ```vue [MessageAvatar.vue]
  <script setup lang="ts">
  import { computed, useAttrs } from 'vue'
  import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

  interface Props {
    src: string
    name?: string
    class?: string
  }

  const props = defineProps<Props>()
  const attrs = useAttrs()

  const fallbackText = computed(() => props.name?.slice(0, 2) ?? 'ME')
  </script>

  <template>
    <Avatar class="size-8 ring-1 ring-border" :class="[props.class]" v-bind="attrs">
      <AvatarImage alt="" class="mt-0 mb-0" :src="props.src" />
      <AvatarFallback>{{ fallbackText }}</AvatarFallback>
    </Avatar>
  </template>
  ```

  ```ts [index.ts]
  export { default as Message } from './Message.vue'
  export { default as MessageAvatar } from './MessageAvatar.vue'
  export { default as MessageContent } from './MessageContent.vue'
  ```
::

## Usage

```ts
import { Message, MessageContent } from '@/components/ai-elements/message'
```

```vue
<Message from="user">
  <MessageContent>Hi there!</MessageContent>
</Message>
```

## Usage with AI SDK

Render messages in a list with `useChat`.

Add the following component to your frontend:

```vue [pages/index.vue]
<script setup lang="ts">
import { useChat } from '@ai-sdk/vue'
import { Message, MessageContent } from '@/components/ai-elements/message'
import { Response } from '@/components/ai-elements/response'

const { messages } = useChat()
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
    <div class="flex flex-col h-full">
      <Message
        v-for="m in messages"
        :key="m.id"
        :from="m.role"
      >
        <MessageContent>
          <Response v-for="(p, i) in m.parts" :key="i">
            {{ p.type === 'text' ? p.text : '' }}
          </Response>
        </MessageContent>
      </Message>
    </div>
  </div>
</template>
```

## Features

- Displays messages from both the user and AI assistant with distinct styling.
- Includes avatar images for message senders with fallback initials.
- Shows the sender's name through avatar fallbacks.
- Automatically aligns user and assistant messages on opposite sides.
- Uses different background colors for user and assistant messages.

## Notes

Always render the `AIMessageContent` first, then the `AIMessageAvatar`. The `AIMessage` component is a wrapper that determines the alignment of the message.

## Examples

### Render Markdown

We can use the [`Response`](/components/response) component to render markdown content.

:::ComponentLoader{label="MessageMarkdown" componentName="MessageMarkdown"}
:::

## Props

### `<Message />`

::field-group
  ::field{name="from" type="'user' | 'assistant'" required}
  The role of the message sender.
  ::

  ::field{name="class" type="string"}
  Additional classes applied to the root element.
  ::
::

### `<MessageContent />`

::field-group
  ::field{name="class" type="string"}
  Additional classes applied to the content container.
  ::
::

### `<MessageAvatar />`

::field-group
  ::field{name="src" type="string" required}
  The URL of the avatar image.
  ::

  ::field{name="name" type="string"}
  Used to compute the two-letter fallback when the image is missing.
  ::

  ::field{name="class" type="string"}
  Additional classes applied to the avatar root.
  ::
::
