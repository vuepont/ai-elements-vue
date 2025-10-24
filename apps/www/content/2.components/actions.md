---
title: Actions
description:
icon: lucide:message-square-more
---

The `Actions` component provides a flexible row of action buttons for AI responses with common actions like retry, like, dislike, copy, and share.

:::ComponentLoader{label="Actions" componentName="Actions"}
:::

## Install using CLI

::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add actions
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/actions.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

::code-group
  ```vue [Actions.vue]
  <script setup lang="ts">
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed, useAttrs } from 'vue'

  interface Props {
    class?: string
  }

  const props = defineProps<Props>()
  const attrs = useAttrs()

  const classes = computed(() => cn('flex items-center gap-1', props.class))
  </script>

  <template>
    <div :class="classes" v-bind="attrs">
      <slot />
    </div>
  </template>
  ```

  ```vue [Action.vue]
  <script setup lang="ts">
  import { Button } from '@repo/shadcn-vue/components/ui/button'
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/shadcn-vue/components/ui/tooltip'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed, useAttrs } from 'vue'

  interface Props {
    class?: string
    tooltip?: string
    label?: string
    variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
  }

  const props = withDefaults(defineProps<Props>(), {
    variant: 'ghost',
    size: 'sm',
  })

  const attrs = useAttrs()

  const classes = computed(() => cn('relative size-9 p-1.5 text-muted-foreground hover:text-foreground', props.class))
  </script>

  <template>
    <TooltipProvider v-if="props.tooltip">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            :class="classes"
            :size="props.size"
            :variant="props.variant"
            type="button"
            v-bind="attrs"
          >
            <slot />
            <span class="sr-only">{{ props.label || props.tooltip }}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{ props.tooltip }}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <Button
      v-else
      :class="classes"
      :size="props.size"
      :variant="props.variant"
      type="button"
      v-bind="attrs"
    >
      <slot />
      <span class="sr-only">{{ props.label || props.tooltip }}</span>
    </Button>
  </template>
  ```

  ```ts [index.ts]
  export { default as Action } from './Action.vue'
  export { default as Actions } from './Actions.vue'
  ```
::

## Usage

```vue
<script setup lang="ts">
import { ThumbsUp } from 'lucide-vue-next'
import { Action, Actions } from '@/components/ai-elements/actions'
</script>

<template>
  <Actions class="mt-2">
    <Action label="Like">
      <ThumbsUp class="size-4" />
    </Action>
  </Actions>
</template>
```

## Usage with AI SDK

Build a simple chat UI where the user can copy or regenerate the most recent message.

Add the following component to your frontend:

```vue filename="app/page.vue"
<script setup lang="ts">
import { Copy, RefreshCcw } from 'lucide-vue-next'
import { ref } from 'vue'
import { Action, Actions } from '@/components/ai-elements/actions'
import { Conversation, ConversationContent } from '@/components/ai-elements/conversation'
import { Message, MessageContent } from '@/components/ai-elements/message'
import { PromptInput, PromptInputSubmit, PromptInputTextarea } from '@/components/ai-elements/prompt-input'
import { Response } from '@/components/ai-elements/response'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const messages = ref<Message[]>([])
const input = ref('')

function handleSubmit() {
  if (input.value.trim()) {
    messages.value.push({
      id: Date.now().toString(),
      role: 'user',
      content: input.value,
    })
    input.value = ''
  }
}

function handleRetry() {
  // Regenerate the last assistant message
  console.log('Retry clicked')
}

function handleCopy(text: string) {
  navigator.clipboard.writeText(text)
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
    <div class="flex flex-col h-full">
      <Conversation>
        <ConversationContent>
          <Message
            v-for="message in messages"
            :key="message.id"
            :from="message.role"
            class="flex flex-col gap-2"
            :class="message.role === 'assistant' ? 'items-start' : 'items-end'"
          >
            <MessageContent>
              <Response>{{ message.content }}</Response>
            </MessageContent>
            <Actions v-if="message.role === 'assistant'" class="mt-2">
              <Action
                label="Retry"
                @click="handleRetry"
              >
                <RefreshCcw class="size-3" />
              </Action>
              <Action
                label="Copy"
                @click="handleCopy(message.content)"
              >
                <Copy class="size-3" />
              </Action>
            </Actions>
          </Message>
        </ConversationContent>
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
          :disabled="!input.trim()"
          class="absolute bottom-1 right-1"
        />
      </PromptInput>
    </div>
  </div>
</template>
```

## Features

- Row of composable action buttons with consistent styling
- Support for custom actions with tooltips
- State management for toggle actions (like, dislike, favorite)
- Keyboard accessible with proper ARIA labels
- Clipboard and Web Share API integration
- TypeScript support with proper type definitions
- Consistent with design system styling

## Examples

:::ComponentLoader{label="ActionsHover" componentName="ActionsHover"}
:::

## Props

### `<Actions />`

::field-group
  ::field{name="class" type="string"}
  Additional classes applied to the root element.
  ::
::

### `<Action />`

::field-group
  ::field{name="tooltip" type="string"}
  Optional tooltip text shown on hover.
  ::

  ::field{name="label" type="string"}
  Accessible label for screen readers. Also used as fallback if tooltip is not provided.
  ::

  ::field{name="variant" type="'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'"}
  The visual style variant of the button. Defaults to 'ghost'.
  ::

  ::field{name="size" type="'default' | 'sm' | 'lg' | 'icon'"}
  The size of the button. Defaults to 'sm'.
  ::

  ::field{name="class" type="string"}
  Additional classes applied to the button element.
  ::
::
