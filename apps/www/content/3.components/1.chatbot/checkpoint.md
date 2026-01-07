---
title: Checkpoint
description: A simple component for marking conversation history points and restoring the chat to a previous state.
icon: lucide:flag
---

The `Checkpoint` component provides a way to mark specific points in a conversation history and restore the chat to that state. Inspired by VSCode's Copilot checkpoint feature, it allows users to revert to an earlier conversation state while maintaining a clear visual separation between different conversation segments.

:::ComponentLoader{label="Preview" componentName="Checkpoint"}
:::

## Install using CLI

::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add checkpoint
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/checkpoint.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

:::code-group
```vue [Checkpoint.vue]
<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { Separator } from '@repo/shadcn-vue/components/ui/separator'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="cn('flex items-center gap-0.5 text-muted-foreground overflow-hidden', props.class)"
    v-bind="$attrs"
  >
    <slot />
    <Separator />
  </div>
</template>
```

```vue [CheckpointIcon.vue]
<script lang="ts" setup>
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { BookmarkIcon } from 'lucide-vue-next'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <slot v-if="$slots.default" />

  <BookmarkIcon
    v-else
    :class="cn('size-4 shrink-0', props.class)"
    v-bind="$attrs"
  />
</template>
```

```vue [CheckpointTrigger.vue] height=500 collapse
<script lang="ts" setup>
import type { ButtonVariants } from '@repo/shadcn-vue/components/ui/button'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@repo/shadcn-vue/components/ui/tooltip'

interface Props {
  tooltip?: string
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'ghost',
  size: 'sm',
})

const buttonProps = {
  variant: props.variant,
  size: props.size,
  type: 'button' as const,
}
</script>

<template>
  <TooltipProvider v-if="props.tooltip">
    <Tooltip>
      <TooltipTrigger as-child>
        <Button v-bind="{ ...buttonProps, ...$attrs }">
          <slot />
        </Button>
      </TooltipTrigger>
      <TooltipContent align="start" side="bottom">
        <p>{{ props.tooltip }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

  <Button v-else v-bind="{ ...buttonProps, ...$attrs }">
    <slot />
  </Button>
</template>
```

```ts [index.ts]
export { default as Checkpoint } from './Checkpoint.vue'
export { default as CheckpointIcon } from './CheckpointIcon.vue'
export { default as CheckpointTrigger } from './CheckpointTrigger.vue'
```
:::

## Features

- Simple flex layout with icon, trigger, and separator
- Visual separator line for clear conversation breaks
- Clickable restore button for reverting to checkpoint
- Customizable icon (defaults to BookmarkIcon)
- Keyboard accessible with proper ARIA labels
- Responsive design that adapts to different screen sizes
- Seamless light/dark theme integration

## Usage with AI SDK

Build a chat interface with conversation checkpoints that allow users to restore to previous states.

Add the following component to your frontend:

```vue [pages/index.vue] height=500 collapse
<script setup lang="ts">
import { useChat } from '@ai-sdk/vue'
import { nanoid } from 'nanoid'
import { computed, ref } from 'vue'
import {
  Checkpoint,
  CheckpointIcon,
  CheckpointTrigger,
} from '@/components/ai-elements/checkpoint'
import {
  Conversation,
  ConversationContent,
} from '@/components/ai-elements/conversation'
import {
  Message,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message'

interface CheckpointType {
  id: string
  messageIndex: number
  timestamp: Date
  messageCount: number
}

const { messages, setMessages } = useChat()
const checkpoints = ref<CheckpointType[]>([])

const messagesWithCheckpoints = computed(() => {
  return messages.value.map((message, index) => {
    const checkpoint = checkpoints.value.find(
      cp => cp.messageIndex === index
    )
    return { message, index, checkpoint }
  })
})

function createCheckpoint(messageIndex: number) {
  const checkpoint: CheckpointType = {
    id: nanoid(),
    messageIndex,
    timestamp: new Date(),
    messageCount: messageIndex + 1,
  }
  checkpoints.value.push(checkpoint)
}

function restoreToCheckpoint(messageIndex: number) {
  // Restore messages to checkpoint state (assuming setMessages API is the same)
  setMessages(messages.value.slice(0, messageIndex + 1))
  // Remove checkpoints after this point
  checkpoints.value = checkpoints.value.filter(
    cp => cp.messageIndex <= messageIndex
  )
}
</script>

<template>
  <div
    class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]"
  >
    <Conversation>
      <ConversationContent>
        <template
          v-for="{ message, checkpoint } in messagesWithCheckpoints"
          :key="message.id"
        >
          <Message :from="message.role">
            <MessageContent>
              <MessageResponse>{{ message.content }}</MessageResponse>
            </MessageContent>
          </Message>

          <Checkpoint v-if="checkpoint">
            <CheckpointIcon />
            <CheckpointTrigger
              @click="restoreToCheckpoint(checkpoint.messageIndex)"
            >
              Restore checkpoint
            </CheckpointTrigger>
          </Checkpoint>
        </template>
      </ConversationContent>
    </Conversation>
  </div>
</template>
```

## Use Cases

### Manual Checkpoints

Allow users to manually create checkpoints at important conversation points:

```vue
<Button @click="createCheckpoint(messages.length - 1)">
  Create Checkpoint
</Button>
```

### Automatic Checkpoints

Create checkpoints automatically after significant conversation milestones:

```tsx
watch(
  () => messages.value.length,
  (length) => {
    // Create checkpoint every 5 messages
    if (length > 0 && length % 5 === 0) {
      createCheckpoint(length - 1)
    }
  }
)
```

### Branching Conversations

Use checkpoints to enable conversation branching where users can explore different conversation paths:

```tsx
function restoreAndBranch(messageIndex: number) {
  // Save current branch
  const currentBranch = messages.value.slice(messageIndex + 1)
  saveBranch(currentBranch)

  // Restore to checkpoint
  restoreToCheckpoint(messageIndex)
}
```

## Props

### `<Checkpoint />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  The class name to apply to the component.
  ::
:::

### `<CheckpointIcon />`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  The class name to apply to the component.
  ::
:::

### `<CheckpointTrigger />`

:::field-group
  ::field{name="tooltip" type="string" defaultValue="''"}
  The tooltip text to display when the trigger is hovered.
  ::
  ::field{name="variant" type="string" defaultValue="'ghost'"}
  The variant of the button (e.g., 'ghost', 'outline', 'solid').
  ::
  ::field{name="size" type="string" defaultValue="'sm'"}
  The size of the button (e.g., 'sm', 'md', 'lg').
  ::
:::
