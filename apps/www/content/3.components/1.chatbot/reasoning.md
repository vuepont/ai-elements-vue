---
title: Reasoning
description: A collapsible component that displays AI reasoning content, automatically opening during streaming and closing when finished.
icon: lucide:brain-circuit
---

The `Reasoning` component is a collapsible component that displays AI reasoning content, automatically opening during streaming and closing when finished.

:::ComponentLoader{label="Preview" componentName="Reasoning"}
:::

## Install using CLI

::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add reasoning
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/reasoning.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

:::code-group
```vue [Reasoning.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Collapsible } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useVModel } from '@vueuse/core'
import { computed, provide, ref, watch } from 'vue'
import { ReasoningKey } from './context'

interface Props {
  class?: HTMLAttributes['class']
  isStreaming?: boolean
  open?: boolean
  defaultOpen?: boolean
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  isStreaming: false,
  defaultOpen: true,
  duration: undefined,
})

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'update:duration', value: number): void
}>()

const isOpen = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: true,
})

const internalDuration = ref<number | undefined>(props.duration)

watch(() => props.duration, (newVal) => {
  internalDuration.value = newVal
})

function updateDuration(val: number) {
  internalDuration.value = val
  emit('update:duration', val)
}

const hasAutoClosed = ref(false)
const startTime = ref<number | null>(null)

const MS_IN_S = 1000
const AUTO_CLOSE_DELAY = 1000

watch(() => props.isStreaming, (streaming) => {
  if (streaming) {
    isOpen.value = true

    if (startTime.value === null) {
      startTime.value = Date.now()
    }
  }
  else if (startTime.value !== null) {
    const calculatedDuration = Math.ceil((Date.now() - startTime.value) / MS_IN_S)
    updateDuration(calculatedDuration)
    startTime.value = null
  }
})

watch([() => props.isStreaming, isOpen, () => props.defaultOpen, hasAutoClosed], (_, __, onCleanup) => {
  if (props.defaultOpen && !props.isStreaming && isOpen.value && !hasAutoClosed.value) {
    const timer = setTimeout(() => {
      isOpen.value = false
      hasAutoClosed.value = true
    }, AUTO_CLOSE_DELAY)

    onCleanup(() => clearTimeout(timer))
  }
}, { immediate: true })

provide(ReasoningKey, {
  isStreaming: computed(() => props.isStreaming),
  isOpen,
  setIsOpen: (val: boolean) => { isOpen.value = val },
  duration: computed(() => internalDuration.value),
})
</script>

<template>
  <Collapsible
    v-model:open="isOpen"
    :class="cn('not-prose mb-4', props.class)"
  >
    <slot />
  </Collapsible>
</template>
```

```vue [ReasoningTrigger.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { BrainIcon, ChevronDownIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import { Shimmer } from '../shimmer'
import { useReasoningContext } from './context'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { isStreaming, isOpen, duration } = useReasoningContext()

const thinkingMessage = computed(() => {
  if (isStreaming.value || duration.value === 0) {
    return 'thinking'
  }
  if (duration.value === undefined) {
    return 'default_done'
  }
  return 'duration_done'
})
</script>

<template>
  <CollapsibleTrigger
    :class="cn(
      'flex w-full items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground',
      props.class,
    )"
  >
    <slot>
      <BrainIcon class="size-4" />

      <template v-if="thinkingMessage === 'thinking'">
        <Shimmer :duration="1">
          Thinking...
        </Shimmer>
      </template>

      <template v-else-if="thinkingMessage === 'default_done'">
        <p>Thought for a few seconds</p>
      </template>

      <template v-else>
        <p>Thought for {{ duration }} seconds</p>
      </template>

      <ChevronDownIcon
        :class="cn(
          'size-4 transition-transform',
          isOpen ? 'rotate-180' : 'rotate-0',
        )"
      />
    </slot>
  </CollapsibleTrigger>
</template>
```

```vue [ReasoningContent.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CollapsibleContent } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { StreamMarkdown } from 'streamdown-vue'
import { computed, useSlots } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
  content: string
}

const props = defineProps<Props>()
const slots = useSlots()

const slotContent = computed<string | undefined>(() => {
  const nodes = slots.default?.() || []
  let text = ''
  for (const node of nodes) {
    if (typeof node.children === 'string')
      text += node.children
  }
  return text || undefined
})

const md = computed(() => (slotContent.value ?? props.content ?? '') as string)
</script>

<template>
  <CollapsibleContent
    :class="cn(
      'mt-4 text-sm',
      'data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2',
      'data-[state=open]:slide-in-from-top-2 text-muted-foreground',
      'outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
      props.class,
    )"
  >
    <StreamMarkdown :content="md" />
  </CollapsibleContent>
</template>
```

```ts [context.ts] height=300 collapse
import type { InjectionKey, Ref } from 'vue'
import { inject, provide } from 'vue'

export interface ReasoningContextValue {
  isStreaming: Ref<boolean>
  isOpen: Ref<boolean>
  setIsOpen: (open: boolean) => void
  duration: Ref<number | undefined>
}

export const ReasoningKey: InjectionKey<ReasoningContextValue>
  = Symbol('ReasoningContext')

export function useReasoningContext() {
  const ctx = inject<ReasoningContextValue>(ReasoningKey)
  if (!ctx)
    throw new Error('Reasoning components must be used within <Reasoning>')
  return ctx
}
```

```ts [index.ts] height=300 collapse
export { default as Reasoning } from './Reasoning.vue'
export { default as ReasoningContent } from './ReasoningContent.vue'
export { default as ReasoningTrigger } from './ReasoningTrigger.vue'
```
:::

## Usage with AI SDK

Build a chatbot with reasoning using Deepseek R1.

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
import { Loader } from '@/components/ai-elements/loader'
import { Message, MessageContent, MessageResponse } from '@/components/ai-elements/message'
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
} from '@/components/ai-elements/prompt-input'
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning'

const input = ref('')

const { messages, sendMessage, status } = useChat()

function handleSubmit(e: Event) {
  e.preventDefault()

  if (!input.value.trim())
    return

  sendMessage({ text: input.value })
  input.value = ''
}

function isStreamingPart(msgIndex: number, partIndex: number) {
  const lastMsg = messages.value.at(-1)
  const msg = messages.value[msgIndex]

  if (!lastMsg || msg.id !== lastMsg.id)
    return false

  const isLastPart = partIndex === msg.parts.length - 1
  return status.value === 'streaming' && isLastPart
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
    <div class="flex flex-col h-full">
      <Conversation>
        <ConversationContent>
          <template v-for="(message, msgIndex) in messages" :key="message.id">
            <Message :from="message.role">
              <MessageContent>
                <template v-for="(part, partIndex) in message.parts" :key="partIndex">
                  <MessageResponse v-if="part.type === 'text'">
                    {{ part.text }}
                  </MessageResponse>

                  <Reasoning
                    v-else-if="part.type === 'reasoning'"
                    class="w-full"
                    :is-streaming="isStreamingPart(msgIndex, partIndex)"
                  >
                    <ReasoningTrigger />
                    <ReasoningContent :text="part.text" />
                  </Reasoning>
                </template>
              </MessageContent>
            </Message>
          </template>

          <Loader v-if="status === 'submitted'" />
        </ConversationContent>

        <ConversationScrollButton />
      </Conversation>

      <PromptInput
        class="mt-4 w-full max-w-2xl mx-auto relative"
        @submit="handleSubmit"
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

```ts [server/api/chat/route.ts] height=300 collapse
import { convertToModelMessages, streamText, UIMessage } from 'ai'

export const maxDuration = 30

export default defineEventHandler(async (event) => {
  const { model, messages }: { model: string, messages: UIMessage[] }
    = await readBody(event)

  const result = streamText({
    model: model || 'deepseek/deepseek-r1',
    messages: convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse({
    sendReasoning: true,
  })
})
```

## Features

- Automatically opens when streaming content and closes when finished
- Manual toggle control for user interaction
- Smooth animations and transitions powered by Radix UI
- Visual streaming indicator with pulsing animation
- Composable architecture with separate trigger and content components
- Built with accessibility in mind including keyboard navigation
- Responsive design that works across different screen sizes
- Seamlessly integrates with both light and dark themes
- Built on top of shadcn/ui Collapsible primitives
- TypeScript support with proper type definitions

## Props

### `<Reasoning />`

:::field-group
  ::field{name="isStreaming" type="boolean" defaultValue="false"}
  Whether the reasoning is currently streaming (auto-opens and closes the panel).
  ::

  <!-- ::field{name="defaultOpen" type="boolean"}
  Whether the reasoning is open by default.
  :: -->

  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<ReasoningTrigger />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<ReasoningContent />`

:::field-group
  ::field{name="content" type="string"}
  The content to display in the reasoning panel.
  ::

  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::
