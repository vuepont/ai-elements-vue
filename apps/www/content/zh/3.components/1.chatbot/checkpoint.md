---
title: 检查点
description: 一个简单的组件，用于标记对话历史点并将聊天恢复到之前的状态。
icon: lucide:flag
---

`Checkpoint` 组件提供了一种在对话历史中标记特定点并将聊天恢复到该状态的方法。受 VSCode 的 Copilot 检查点功能启发，它允许用户恢复到更早的对话状态，同时在不同对话段之间保持清晰的视觉分离。

:::ComponentLoader{label="Preview" componentName="Checkpoint"}
:::

## Install using CLI

::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add checkpoint
  ```
  ::
  ::div{label="shadcn-vue"}

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
    :class="cn('flex items-center gap-0.5 text-muted-foreground', props.class)"
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
import { useSlots } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const slots = useSlots()
</script>

<template>
  <slot v-if="slots.default" />

  <BookmarkIcon
    v-else
    :class="cn('size-4 shrink-0', props.class)"
    v-bind="$attrs"
  />
</template>
```

```vue [CheckpointTrigger.vue]
<script lang="ts" setup>
import type { ButtonVariants } from '@repo/shadcn-vue/components/ui/button'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import {
  Tooltip,
  TooltipContent,
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
  <Tooltip v-if="props.tooltip">
    <TooltipTrigger as-child>
      <Button v-bind="{ ...buttonProps, ...$attrs }">
        <slot />
      </Button>
    </TooltipTrigger>
    <TooltipContent align="start" side="bottom">
      <p>{{ props.tooltip }}</p>
    </TooltipContent>
  </Tooltip>

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

```vue [pages/index.vue]
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
