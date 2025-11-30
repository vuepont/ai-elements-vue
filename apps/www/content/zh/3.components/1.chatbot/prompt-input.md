---
title: 提示输入
description:
icon: lucide:send
---

`PromptInput` 组件允许用户向大型语言模型发送消息。它包括一个文本区域、一个提交按钮和一个用于选择模型的下拉菜单。

:::ComponentLoader{label="PromptInput" componentName="PromptInput"}
:::

## Install using CLI

::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add prompt-input
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/prompt-input.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

:::code-group
  ```vue [PromptInput.vue]
  <script setup lang="ts">
  import { computed, useAttrs } from 'vue'

  interface Props {
    class?: string
  }

  const props = defineProps<Props>()
  const attrs = useAttrs()

  const classes = computed(() => [
    'w-full divide-y overflow-hidden rounded-xl border bg-background shadow-sm',
    props.class,
  ])
  </script>

  <template>
    <form :class="classes" v-bind="attrs">
      <slot />
    </form>
  </template>
  ```

  ```vue [PromptInputTextarea.vue]
  <script setup lang="ts">
  import { computed, useAttrs } from 'vue'
  import { Textarea } from '@/components/ui/textarea'

  interface Props {
    class?: string
    placeholder?: string
  }

  const props = defineProps<Props>()
  const attrs = useAttrs()

  const placeholder = props.placeholder ?? 'What would you like to know?'

  const classes = computed(() => [
    'w-full resize-none rounded-none border-none p-3 shadow-none outline-none ring-0',
    'field-sizing-content max-h-[6lh] bg-transparent dark:bg-transparent',
    'focus-visible:ring-0',
    props.class,
  ])

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      if ((e as any).nativeEvent?.isComposing)
        return
      if (e.shiftKey)
        return
      e.preventDefault()
      const form = (e.target as HTMLTextAreaElement).form
      form?.requestSubmit()
    }
  }
  </script>

  <template>
    <Textarea
      :class="classes"
      name="message"
      :placeholder="placeholder"
      v-bind="attrs"
      @keydown="handleKeyDown"
    />
  </template>
  ```

  ```vue [PromptInputToolbar.vue]
  <script setup lang="ts">
  import { computed, useAttrs } from 'vue'

  interface Props {
    class?: string
  }

  const props = defineProps<Props>()
  const attrs = useAttrs()

  const classes = computed(() => ['flex items-center justify-between p-1', props.class])
  </script>

  <template>
    <div :class="classes" v-bind="attrs">
      <slot />
    </div>
  </template>
  ```

  ```vue [PromptInputTools.vue]
  <script setup lang="ts">
  import { computed, useAttrs } from 'vue'

  interface Props {
    class?: string
  }

  const props = defineProps<Props>()
  const attrs = useAttrs()

  const classes = computed(() => [
    'flex items-center gap-1',
    '[&_button:first-child]:rounded-bl-xl',
    props.class,
  ])
  </script>

  <template>
    <div :class="classes" v-bind="attrs">
      <slot />
    </div>
  </template>
  ```

  ```vue [PromptInputButton.vue]
  <script setup lang="ts">
  import { computed, useAttrs, useSlots } from 'vue'
  import { Button } from '@/components/ui/button'

  interface Props {
    class?: string
    variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'ghost',
  })

  const attrs = useAttrs()
  const slots = useSlots()

  const computedSize = computed(() => {
    if (props.size)
      return props.size
    const count = slots.default?.().length ?? 0
    return count > 1 ? 'default' : 'icon'
  })

  const classes = computed(() => [
    'shrink-0 gap-1.5 rounded-lg',
    props.variant === 'ghost' && 'text-muted-foreground',
    computedSize.value === 'default' && 'px-3',
    props.class,
  ])
  </script>

  <template>
    <Button
      :class="classes"
      :size="computedSize"
      :variant="props.variant"
      type="button"
      v-bind="attrs"
    >
      <slot />
    </Button>
  </template>
  ```

  ```vue [PromptInputSubmit.vue]
  <script setup lang="ts">
  import type { ChatStatus } from 'ai'
  import { Loader2, Send, Square, X } from 'lucide-vue-next'
  import { computed, useAttrs } from 'vue'
  import { Button } from '@/components/ui/button'

  interface Props {
    class?: string
    status?: ChatStatus
    variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'default',
    size: 'icon',
  })

  const attrs = useAttrs()

  const classes = computed(() => ['gap-1.5 rounded-lg', props.class])

  const icon = computed(() => {
    if (props.status === 'submitted')
      return Loader2
    if (props.status === 'streaming')
      return Square
    if (props.status === 'error')
      return X
    return Send
  })
  </script>

  <template>
    <Button :class="classes" :size="props.size" :variant="props.variant" type="submit" v-bind="attrs">
      <slot>
        <component :is="icon" class="size-4" />
      </slot>
    </Button>
  </template>
  ```

  ```ts [index.ts]
  export { default as PromptInput } from './PromptInput.vue'
  export { default as PromptInputButton } from './PromptInputButton.vue'
  export { default as PromptInputModelSelect } from './PromptInputModelSelect.vue'
  export { default as PromptInputModelSelectContent } from './PromptInputModelSelectContent.vue'
  export { default as PromptInputModelSelectItem } from './PromptInputModelSelectItem.vue'
  export { default as PromptInputModelSelectTrigger } from './PromptInputModelSelectTrigger.vue'
  export { default as PromptInputModelSelectValue } from './PromptInputModelSelectValue.vue'
  export { default as PromptInputSubmit } from './PromptInputSubmit.vue'
  export { default as PromptInputTextarea } from './PromptInputTextarea.vue'
  export { default as PromptInputToolbar } from './PromptInputToolbar.vue'
  export { default as PromptInputTools } from './PromptInputTools.vue'
  ```
:::

## Usage

```ts
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from '@/components/ai-elements/prompt-input'
```

```vue
<PromptInput @submit="() => {}" class="mt-4 relative">
  <PromptInputTextarea @input="() => {}" :value="''" />
  <PromptInputToolbar>
    <PromptInputSubmit
      class="absolute right-1 bottom-1"
      :disabled="false"
      status="ready"
    />
  </PromptInputToolbar>
</PromptInput>
```

## Usage with AI SDK

Built a fully functional chat app using `PromptInput`, [`Conversation`](/components/conversation) with a model picker:

Add the following component to your frontend:

```vue [pages/index.vue]
<script setup lang="ts">
import { useChat } from '@ai-sdk/vue'
import { Globe, Mic } from 'lucide-vue-next'
import { ref } from 'vue'
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation'
import { Message, MessageContent } from '@/components/ai-elements/message'
import {
  PromptInput,
  PromptInputButton,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input'
import { Response } from '@/components/ai-elements/response'

const models = [
  { id: 'gpt-4o', name: 'GPT-4o' },
  { id: 'claude-opus-4-20250514', name: 'Claude 4 Opus' },
]

const text = ref<string>('')
const model = ref<string>(models[0].id)
const { messages, status, sendMessage } = useChat()

function handleSubmit(e: Event) {
  e.preventDefault()
  if (!text.value)
    return
  sendMessage(
    { text: text.value },
    { body: { model: model.value } },
  )
  text.value = ''
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

      <PromptInput class="mt-4" @submit="handleSubmit">
        <PromptInputTextarea
          :value="text"
          @input="(e: any) => (text = e?.target?.value ?? '')"
        />
        <PromptInputToolbar>
          <PromptInputTools>
            <PromptInputButton>
              <Mic class="size-4" />
            </PromptInputButton>
            <PromptInputButton>
              <Globe class="size-4" />
              <span>Search</span>
            </PromptInputButton>
            <PromptInputModelSelect
              :value="model"
              @update:value="(v: string) => (model = v)"
            >
              <PromptInputModelSelectTrigger>
                <PromptInputModelSelectValue />
              </PromptInputModelSelectTrigger>
              <PromptInputModelSelectContent>
                <PromptInputModelSelectItem
                  v-for="m in models"
                  :key="m.id"
                  :value="m.id"
                >
                  {{ m.name }}
                </PromptInputModelSelectItem>
              </PromptInputModelSelectContent>
            </PromptInputModelSelect>
          </PromptInputTools>
          <PromptInputSubmit :disabled="!text" :status="status" />
        </PromptInputToolbar>
      </PromptInput>
    </div>
  </div>
</template>
```

Add the following route to your backend:

```ts [app/api/chat/route.ts]
import { convertToModelMessages, streamText, UIMessage } from 'ai'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { model, messages }: { messages: UIMessage[], model: string }
    = await req.json()

  const result = streamText({
    model,
    messages: convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
```

## Features

- Auto-resizing textarea that adjusts height based on content
- Automatic submit button icons based on status
- Support for keyboard shortcuts (Cmd/Ctrl + Enter to submit)
- Customizable min/max height for the textarea
- Flexible toolbar with support for custom actions and tools
- Built-in model selection dropdown
- Responsive design with mobile-friendly controls
- Clean, modern styling with customizable themes
- Form-based submission handling

## Props

### `<PromptInput />`

:::field-group
  ::field{name="class" type="string"}
  Additional classes applied to the root form.
  ::
:::

### `<PromptInputTextarea />`

:::field-group
  ::field{name="placeholder" type="string" defaultValue="'What would you like to know?'"}
  Placeholder text for the textarea.
  ::
  ::field{name="class" type="string"}
  Additional classes applied to the underlying textarea.
  ::
:::

### `<PromptInputToolbar />`

:::field-group
  ::field{name="class" type="string"}
  Additional classes applied to the toolbar.
  ::
:::

### `<PromptInputTools />`

:::field-group
  ::field{name="class" type="string"}
  Additional classes applied to the tools container.
  ::
:::

### `<PromptInputButton />`

:::field-group
  ::field{name="variant" type="'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'" defaultValue="'ghost'"}
  Visual style of the button.
  ::
  ::field{name="size" type="'default' | 'sm' | 'lg' | 'icon'" defaultValue="auto"}
  Button size. Defaults to 'icon' when a single child is provided, otherwise 'default'.
  ::
  ::field{name="class" type="string"}
  Additional classes applied to the button.
  ::
:::

### `<PromptInputSubmit />`

:::field-group
  ::field{name="status" type="ChatStatus"}
  Current chat status; controls the icon (submitted, streaming, error, ready).
  ::
  ::field{name="variant" type="'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'" defaultValue="'default'"}
  Visual style of the submit button.
  ::
  ::field{name="size" type="'default' | 'sm' | 'lg' | 'icon'" defaultValue="'icon'"}
  Size of the submit button.
  ::
  ::field{name="class" type="string"}
  Additional classes applied to the submit button.
  ::
:::

### `<PromptInputModelSelect />`

Pass-through wrapper for the shadcn Select component. No component props are defined; all attributes and v-model bindings are forwarded to the underlying Select.

### `<PromptInputModelSelectTrigger />`

:::field-group
  ::field{name="class" type="string"}
  Additional classes applied to the trigger.
  ::
:::

### `<PromptInputModelSelectContent />`

:::field-group
  ::field{name="class" type="string"}
  Additional classes applied to the content panel.
  ::
:::

### `<PromptInputModelSelectValue />`

:::field-group
  ::field{name="class" type="string"}
  Additional classes applied to the value display.
  ::
:::

### `<PromptInputModelSelectItem />`

:::field-group
  ::field{name="value" type="string | number" required}
  Item value.
  ::
  ::field{name="class" type="string"}
  Additional classes applied to the item.
  ::
:::
