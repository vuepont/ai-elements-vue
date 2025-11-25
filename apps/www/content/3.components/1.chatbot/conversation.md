---
title: Conversation
description: Wraps messages and automatically scrolls to the bottom. Also includes a scroll button that appears when not at the bottom.
icon: lucide:message-square
---

The `Conversation` component wraps messages and automatically scrolls to the bottom. Also includes a scroll button that appears when not at the bottom.

:::ComponentLoader{label="Conversation" componentName="Conversation"}
:::

## Install using CLI

::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add conversation
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/conversation.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

:::code-group
```vue [Conversation.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { StickToBottom } from 'vue-stick-to-bottom'

interface Props {
  ariaLabel?: string
  class?: HTMLAttributes['class']
  initial?: boolean | 'instant' | { damping?: number, stiffness?: number, mass?: number }
  resize?: 'instant' | { damping?: number, stiffness?: number, mass?: number }
  damping?: number
  stiffness?: number
  mass?: number
  anchor?: 'auto' | 'none'
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: 'Conversation',
  initial: true,
  damping: 0.7,
  stiffness: 0.05,
  mass: 1.25,
  anchor: 'none',
})
</script>

<template>
  <StickToBottom
    :aria-label="props.ariaLabel"
    :class="cn('relative flex-1 overflow-y-hidden', props.class)"
    role="log"
    :initial="props.initial"
    :resize="props.resize"
    :damping="props.damping"
    :stiffness="props.stiffness"
    :mass="props.mass"
    :anchor="props.anchor"
  >
    <slot />
  </StickToBottom>
</template>
```

```vue [ConversationContent.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { computed } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const classes = computed(() => [
  'flex flex-col gap-8 p-4',
  props.class,
])
</script>

<template>
  <div :class="classes">
    <slot />
  </div>
</template>
```

```vue [ConversationEmptyState.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
  title?: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'No messages yet',
  description: 'Start a conversation to see messages here',
})
</script>

<template>
  <div
    :class="cn(
      'flex size-full flex-col items-center justify-center gap-3 p-8 text-center',
      props.class,
    )"
    v-bind="$attrs"
  >
    <slot>
      <div v-if="$slots.icon" class="text-muted-foreground">
        <slot name="icon" />
      </div>

      <div class="space-y-1">
        <h3 class="font-medium text-sm">
          {{ props.title }}
        </h3>
        <p v-if="props.description" class="text-muted-foreground text-sm">
          {{ props.description }}
        </p>
      </div>
    </slot>
  </div>
</template>
```

```vue [ConversationScrollButton.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ArrowDownIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import { useStickToBottomContext } from 'vue-stick-to-bottom'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const { isAtBottom, scrollToBottom } = useStickToBottomContext()
const showScrollButton = computed(() => !isAtBottom.value)

function handleClick() {
  scrollToBottom()
}
</script>

<template>
  <Button
    v-if="showScrollButton"
    :class="cn('absolute bottom-4 left-[50%] translate-x-[-50%] rounded-full', props.class)"
    size="icon"
    type="button"
    variant="outline"
    v-bind="$attrs"
    @click="handleClick"
  >
    <ArrowDownIcon class="size-4" />
  </Button>
</template>
```

```ts [index.ts]
export { default as Conversation } from './Conversation.vue'
export { default as ConversationContent } from './ConversationContent.vue'
export { default as ConversationEmptyState } from './ConversationEmptyState.vue'
export { default as ConversationScrollButton } from './ConversationScrollButton.vue'
```
:::

## Usage with AI SDK

Build a simple conversational UI with `Conversation` and [`PromptInput`](/components/prompt-input):

Add the following component to your frontend:

```vue [pages/index.vue] height=300 collapse
<script setup lang="ts">
import { useChat } from '@ai-sdk/vue'
import { ref } from 'vue'
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation'
import { Message, MessageContent } from '@/components/ai-elements/message'
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
} from '@/components/ai-elements/prompt-input'
import { Response } from '@/components/ai-elements/response'

const input = ref('')
const { messages, sendMessage, status } = useChat()

function handleSubmit(e: Event) {
  e.preventDefault()
  if (input.value.trim()) {
    sendMessage({ text: input.value })
    input.value = ''
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
    <div class="flex flex-col h-full">
      <Conversation>
        <ConversationContent>
          <Message v-for="m in messages" :key="m.id" :from="m.role">
            <MessageContent>
              <Response v-for="(p, i) in m.parts" :key="i">
                {{ p.type === 'text' ? p.text : '' }}
              </Response>
            </MessageContent>
          </Message>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <PromptInput class="mt-4 w-full max-w-2xl mx-auto relative" @submit="handleSubmit">
        <PromptInputTextarea
          :value="input"
          placeholder="Say something..."
          class="pr-12"
          @input="(e: any) => (input = e?.target?.value ?? '')"
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

```ts [server/api/chat/route.ts]
import { convertToModelMessages, streamText, UIMessage } from 'ai'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export default defineEventHandler(async (event) => {
  const { messages }: { messages: UIMessage[] } = await readBody(event)

  const result = streamText({
    model: 'openai/gpt-4o',
    messages: convertToModelMessages(messages)
  })

  return result.toAIStreamResponse(event)
})
```

## Features

- Automatic scrolling to the bottom when new messages are added
- Smooth scrolling behavior with configurable animation
- Scroll button that appears when not at the bottom
- Responsive design with customizable padding and spacing
- Flexible content layout with consistent message spacing
- Accessible with proper ARIA roles for screen readers
- Customizable styling through class prop
- Support for any number of child message components

## Props

### `<Conversation />`

:::field-group
  ::field{name="ariaLabel" type="string" defaultValue="'Conversation'"}
  Accessible label for the conversation container.
  ::

  ::field{name="class" type="string"}
  Additional classes applied to the container.
  ::

  ::field{name="initial" type="boolean | 'instant' | { damping?: number; stiffness?: number; mass?: number }" defaultValue="true"}
  Controls initial stick-to-bottom behavior and spring options.
  ::

  ::field{name="resize" type="'instant' | { damping?: number; stiffness?: number; mass?: number }"}
  Behavior when content resizes.
  ::

  ::field{name="damping" type="number" defaultValue="0.7"}
  Spring damping when scrolling to bottom.
  ::

  ::field{name="stiffness" type="number" defaultValue="0.05"}
  Spring stiffness when scrolling to bottom.
  ::

  ::field{name="mass" type="number" defaultValue="1.25"}
  Spring mass when scrolling to bottom.
  ::

  ::field{name="anchor" type="'auto' | 'none'" defaultValue="'none'"}
  Anchoring strategy for stick-to-bottom.
  ::
:::

### `<ConversationContent />`

:::field-group
  ::field{name="class" type="string"}
  Additional classes applied to the content wrapper.
  ::
:::

### `<ConversationEmptyState />`

:::field-group
  ::field{name="title" type="string" defaultValue="'No messages yet'"}
  The title text to display.
  ::

  ::field{name="description" type="string" defaultValue="'Start a conversation to see messages here'"}
  The description text to display.
  ::

  ::field{name="class" type="string"}
  Additional classes applied to the empty state wrapper.
  ::
:::

### `<ConversationScrollButton />`

:::field-group
  ::field{name="class" type="string"}
  Additional classes applied to the scroll button.
  ::
:::
