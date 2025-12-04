---
title: Suggestion
description:
icon: lucide:lightbulb
---

The `Suggestion` component displays a horizontal row of clickable suggestions for user interaction.

:::ComponentLoader{label="Preview" componentName="Suggestion"}
:::

## Install using CLI

::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add suggestion
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/suggestion.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

:::code-group
```vue [Suggestions.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ScrollArea, ScrollBar } from '@repo/shadcn-vue/components/ui/scroll-area'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface SuggestionsProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<SuggestionsProps>()
</script>

<template>
  <ScrollArea class="w-full overflow-x-auto whitespace-nowrap" v-bind="$attrs">
    <div :class="cn('flex w-max flex-nowrap items-center gap-2', props.class)">
      <slot />
    </div>
    <ScrollBar class="hidden" orientation="horizontal" />
  </ScrollArea>
</template>
```

```vue [Suggestions.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface SuggestionProps {
  suggestion: string
  class?: HTMLAttributes['class']
  variant?: 'outline' | 'default' | 'destructive' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const props = withDefaults(defineProps<SuggestionProps>(), {
  variant: 'outline',
  size: 'sm',
})

const emit = defineEmits<{
  (e: 'click', suggestion: string): void
}>()

function handleClick() {
  emit('click', props.suggestion)
}
</script>

<template>
  <Button
    :class="cn('cursor-pointer rounded-full px-4', props.class)"
    :size="props.size"
    type="button"
    :variant="props.variant"
    v-bind="$attrs"
    @click="handleClick"
  >
    <slot>{{ props.suggestion }}</slot>
  </Button>
</template>
```

```ts [index.ts]
export { default as Suggestion } from './Suggestion.vue'
export { default as Suggestions } from './Suggestions.vue'
```
:::

## Usage

```ts
import { Suggestion, Suggestions } from '@/components/ai-elements/suggestion'
```

```vue
<Suggestions>
  <Suggestion suggestion="What are the latest trends in AI?" />
</Suggestions>
```

## Usage with AI SDK

Build a simple input with suggestions users can click to send a message to the LLM.

Add the following component to your frontend:

```vue [pages/index.vue]
<script setup lang="ts">
import { useChat } from '@ai-sdk/vue'
import { ref } from 'vue'
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation'
import { Message, MessageContent } from '@/components/ai-elements/message'
import { Response } from '@/components/ai-elements/response'

const input = ref('')
const { sendMessage, status } = useChat()

function handleSubmit() {
  if (input.value.trim()) {
    sendMessage({ text: input.value })
    setInput('')
  }
}

function handleSuggestionClick(suggestion: string) {
  sendMessage({ text: suggestion })
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
    <div class="flex flex-col h-full">
      <div class="flex flex-col gap-4">
        <Suggestions>
          <Suggestion
            v-for="suggestion in suggestions"
            :key="suggestion"
            :suggestion="suggestion"
            @click="handleSuggestionClick"
          />
        </Suggestions>

        <Input class="mt-4 w-full max-w-2xl mx-auto relative" @submit.prevent="handleSubmit">
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
  </div>
</template>
```

## Features

- Horizontal row of clickable suggestion buttons
- Customizable styling with variant and size options
- Flexible layout that wraps suggestions on smaller screens
- click event that emits the selected suggestion string
- Support for both individual suggestions and suggestion lists
- Clean, modern styling with hover effects
- Responsive design with mobile-friendly touch targets
- TypeScript support with proper type definitions

## Examples

### Usage with AI Input

:::ComponentLoader{label="Preview" componentName="SuggestionInput"}
:::

## Props

### `<Suggestion />`

:::field-group
  ::field{name="click" type="event: Event" defaultValue="''"}
  The suggestion string to display and emit on click.
  ::
:::

## Emits

### `<Suggestion />`

:::field-group
  ::field{name="click" type="string" defaultValue="''"}
  The click event that's emitted.
  ::
:::
