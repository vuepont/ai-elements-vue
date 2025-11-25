---
title: Message
description: A comprehensive suite of components for displaying chat messages, including message rendering, branching, actions, and markdown responses.
icon: lucide:message-circle
---

The `Message` component suite provides a complete set of tools for building chat interfaces. It includes components for displaying messages from users and AI assistants, managing multiple response branches, adding action buttons, and rendering markdown content.

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
import type { UIMessage } from 'ai'
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  from: UIMessage['role']
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="
      cn(
        'group flex w-full max-w-[80%] gap-2',
        props.from === 'user' ? 'is-user ml-auto justify-end' : 'is-assistant',
        props.class as string,
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
```

```vue [MessageContent.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="
      cn(
        'is-user:dark flex w-fit flex-col gap-2 overflow-hidden text-sm',
        'group-[.is-user]:ml-auto group-[.is-user]:rounded-lg group-[.is-user]:bg-secondary group-[.is-user]:px-4 group-[.is-user]:py-3 group-[.is-user]:text-foreground',
        'group-[.is-assistant]:text-foreground',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
```

```vue [MessageActions.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="cn('flex items-center gap-1', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
```

```vue [MessageAction.vue]
<script setup lang="ts">
import type { ButtonVariants } from '@repo/shadcn-vue/components/ui/button'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/shadcn-vue/components/ui/tooltip'

interface Props {
  tooltip?: string
  label?: string
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'ghost',
  size: 'icon-sm',
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
          <span class="sr-only">
            {{ props.label || props.tooltip }}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ props.tooltip }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

  <Button v-else v-bind="{ ...buttonProps, ...$attrs }">
    <slot />
    <span class="sr-only">{{ props.label || props.tooltip }}</span>
  </Button>
</template>
```

```vue [MessageBranch.vue]
<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import type { MessageBranchContextType } from './context'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { provide, readonly, ref } from 'vue'
import { MessageBranchKey } from './context'

interface Props {
  defaultBranch?: number
  class?: HTMLAttributes['class']
}
const props = withDefaults(defineProps<Props>(), {
  defaultBranch: 0,
})

const emits = defineEmits<{
  (e: 'branchChange', branchIndex: number): void
}>()

const currentBranch = ref<number>(props.defaultBranch)
const branches = ref<VNode[]>([])
const totalBranches = ref<number>(0)

function handleBranchChange(index: number) {
  currentBranch.value = index
  emits('branchChange', index)
}

function goToPrevious() {
  if (totalBranches.value === 0)
    return
  const next = currentBranch.value > 0 ? currentBranch.value - 1 : totalBranches.value - 1
  handleBranchChange(next)
}

function goToNext() {
  if (totalBranches.value === 0)
    return
  const next = currentBranch.value < totalBranches.value - 1 ? currentBranch.value + 1 : 0
  handleBranchChange(next)
}

function setBranches(count: number) {
  totalBranches.value = count
}

const contextValue: MessageBranchContextType = {
  currentBranch: readonly(currentBranch),
  totalBranches: readonly(totalBranches),
  goToPrevious,
  goToNext,
  branches,
  setBranches,
}

provide(MessageBranchKey, contextValue)
</script>

<template>
  <div
    :class="cn('grid w-full gap-2 [&>div]:pb-0', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
```

```vue [MessageBranchContent.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, Fragment, isVNode, onMounted, useAttrs, useSlots, watch } from 'vue'
import { useMessageBranchContext } from './context'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
const attrs = useAttrs()
const slots = useSlots()

const { currentBranch, setBranches } = useMessageBranchContext()

const branchVNodes = computed(() => {
  const nodes = slots.default?.() ?? []

  const extractChildren = (node: any): any[] => {
    if (isVNode(node) && node.type === Fragment) {
      return Array.isArray(node.children) ? node.children : []
    }
    return [node]
  }

  const allNodes = nodes.flatMap(extractChildren)

  return allNodes.filter((node) => {
    if (!isVNode(node))
      return false
    return node.type && typeof node.type === 'object'
  })
})

const sync = () => setBranches(branchVNodes.value.length)
onMounted(sync)
watch(branchVNodes, sync)

const baseClasses = computed(() => cn('grid gap-2 overflow-hidden [&>div]:pb-0', props.class))
</script>

<template>
  <template v-for="(node, index) in branchVNodes" :key="(node.key as any) ?? index">
    <div
      :class="cn(baseClasses, index === currentBranch ? 'block' : 'hidden')"
      v-bind="attrs"
    >
      <component :is="node" />
    </div>
  </template>
</template>
```

```vue [MessageBranchSelector.vue]
<script setup lang="ts">
import type { UIMessage } from 'ai'
import { ButtonGroup } from '@repo/shadcn-vue/components/ui/button-group'
import { useMessageBranchContext } from './context'

interface Props {
  from: UIMessage['role']
}
defineProps<Props>()

const { totalBranches } = useMessageBranchContext()
</script>

<template>
  <ButtonGroup
    v-if="totalBranches > 1"
    class="[&>*:not(:first-child)]:rounded-l-md [&>*:not(:last-child)]:rounded-r-md"
    orientation="horizontal"
    v-bind="$attrs"
  >
    <slot />
  </ButtonGroup>
</template>
```

```vue [MessageBranchPrevious.vue]
<script setup lang="ts">
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { ChevronLeftIcon } from 'lucide-vue-next'
import { useMessageBranchContext } from './context'

const { goToPrevious, totalBranches } = useMessageBranchContext()
</script>

<template>
  <Button
    aria-label="Previous branch"
    :disabled="totalBranches <= 1"
    size="icon-sm"
    type="button"
    variant="ghost"
    v-bind="$attrs"
    @click="goToPrevious"
  >
    <slot>
      <ChevronLeftIcon :size="14" />
    </slot>
  </Button>
</template>
```

```vue [MessageBranchNext.vue]
<script setup lang="ts">
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { ChevronRightIcon } from 'lucide-vue-next'
import { useMessageBranchContext } from './context'

const { goToNext, totalBranches } = useMessageBranchContext()
</script>

<template>
  <Button
    aria-label="Next branch"
    :disabled="totalBranches <= 1"
    size="icon-sm"
    type="button"
    variant="ghost"
    v-bind="$attrs"
    @click="goToNext"
  >
    <slot>
      <ChevronRightIcon :size="14" />
    </slot>
  </Button>
</template>
```

```vue [MessageBranchPage.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ButtonGroupText } from '@repo/shadcn-vue/components/ui/button-group'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useMessageBranchContext } from './context'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { currentBranch, totalBranches } = useMessageBranchContext()
</script>

<template>
  <ButtonGroupText
    :class="
      cn(
        'border-none bg-transparent text-muted-foreground shadow-none',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    {{ currentBranch + 1 }} of {{ totalBranches }}
  </ButtonGroupText>
</template>
```

```vue [MessageResponse.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { StreamMarkdown } from 'streamdown-vue'
import { computed, useSlots } from 'vue'

interface Props {
  content?: string
  class?: HTMLAttributes['class']
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
  <StreamMarkdown
    :shiki-theme="{
      light: 'github-light',
      dark: 'github-dark',
    }"
    :content="md"
    :class="
      cn(
        'size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
        props.class,
      )
    "
    v-bind="$attrs"
  />
</template>
```

```vue [MessageAttachments.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useSlots } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const slots = useSlots()
</script>

<template>
  <div
    v-if="slots.default"
    :class="
      cn(
        'ml-auto flex w-fit flex-wrap items-start gap-2',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
```

```vue [MessageAttachment.vue]
<script setup lang="ts">
import type { FileUIPart } from 'ai'
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/shadcn-vue/components/ui/tooltip'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { PaperclipIcon, XIcon } from 'lucide-vue-next'
import { computed } from 'vue'

interface Props {
  data: FileUIPart
  class?: HTMLAttributes['class']
}
const props = defineProps<Props>()

const emits = defineEmits<{
  (e: 'remove'): void
}>()

const filename = computed(() => props.data.filename || '')
const mediaType = computed(() =>
  props.data.mediaType?.startsWith('image/') && props.data.url ? 'image' : 'file',
)
const isImage = computed(() => mediaType.value === 'image')
const attachmentLabel = computed(() =>
  filename.value || (isImage.value ? 'Image' : 'Attachment'),
)
</script>

<template>
  <div
    :class="
      cn(
        'group relative size-24 overflow-hidden rounded-lg',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <template v-if="isImage">
      <img
        :src="props.data.url"
        :alt="filename || 'attachment'"
        class="size-full object-cover"
        height="100"
        width="100"
      >
      <Button
        aria-label="Remove attachment"
        class="absolute top-2 right-2 size-6 rounded-full bg-background/80 p-0 opacity-0 backdrop-blur-sm transition-opacity hover:bg-background group-hover:opacity-100 [&>svg]:size-3"
        type="button"
        variant="ghost"
        @click.stop="emits('remove')"
      >
        <XIcon />
        <span class="sr-only">Remove</span>
      </Button>
    </template>

    <template v-else>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger as-child>
            <div
              class="flex size-full shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground"
            >
              <PaperclipIcon class="size-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{{ attachmentLabel }}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Button
        aria-label="Remove attachment"
        class="size-6 shrink-0 rounded-full p-0 opacity-0 transition-opacity hover:bg-accent group-hover:opacity-100 [&>svg]:size-3"
        type="button"
        variant="ghost"
        @click.stop="emits('remove')"
      >
        <XIcon />
        <span class="sr-only">Remove</span>
      </Button>
    </template>
  </div>
</template>
```

```vue [MessageToolbar.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="
      cn(
        'mt-4 flex w-full items-center justify-between gap-4',
        props.class as string,
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
```

```ts [context.ts]
import type { InjectionKey, Ref, VNode } from 'vue'
import { inject } from 'vue'

export interface MessageBranchContextType<T = VNode[]> {
  currentBranch: Readonly<Ref<number>>
  totalBranches: Readonly<Ref<number>>
  goToPrevious: () => void
  goToNext: () => void
  branches: Ref<T>
  setBranches: (count: number) => void
}

export const MessageBranchKey: InjectionKey<MessageBranchContextType>
  = Symbol('MessageBranch')

export function useMessageBranchContext(): MessageBranchContextType {
  const ctx = inject(MessageBranchKey)
  if (!ctx) {
    throw new Error('Message Branch components must be used within Message Branch')
  }
  return ctx
}
```

```ts [index.ts]
export { default as Message } from './Message.vue'
export { default as MessageAction } from './MessageAction.vue'
export { default as MessageActions } from './MessageActions.vue'
export { default as MessageAttachment } from './MessageAttachment.vue'
export { default as MessageAttachments } from './MessageAttachments.vue'
export { default as MessageBranch } from './MessageBranch.vue'
export { default as MessageBranchContent } from './MessageBranchContent.vue'
export { default as MessageBranchNext } from './MessageBranchNext.vue'
export { default as MessageBranchPage } from './MessageBranchPage.vue'
export { default as MessageBranchPrevious } from './MessageBranchPrevious.vue'
export { default as MessageBranchSelector } from './MessageBranchSelector.vue'
export { default as MessageContent } from './MessageContent.vue'
export { default as MessageResponse } from './MessageResponse.vue'
export { default as MessageToolbar } from './MessageToolbar.vue'
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

Build a simple chat UI where the user can copy or regenerate the most recent message.

Add the following component to your frontend:

```vue [pages/index.vue]
<script setup lang="ts">
import { useChat } from '@ai-sdk/vue'
import { CopyIcon, RefreshCcwIcon } from 'lucide-vue-next'
import { ref } from 'vue'
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation'
import {
  Message,
  MessageAction,
  MessageActions,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message'
import {
  Input,
  PromptInputSubmit,
  PromptInputTextarea,
} from '@/components/ai-elements/prompt-input'

const input = ref('')

const { messages, sendMessage, status, regenerate } = useChat()

function handleSubmit() {
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
          <template
            v-for="(message, messageIndex) in messages"
            :key="message.id"
          >
            <template v-for="(part, i) in message.parts" :key="`${message.id}-${i}`">
              <template v-if="part.type === 'text'">
                <Message :from="message.role">
                  <MessageContent>
                    <MessageResponse :content="part.text" />
                  </MessageContent>
                </Message>

                <MessageActions
                  v-if="
                    message.role === 'assistant'
                      && messageIndex === messages.length - 1
                  "
                >
                  <MessageAction label="Retry" @click="regenerate()">
                    <RefreshCcwIcon class="size-3" />
                  </MessageAction>
                  <MessageAction
                    label="Copy"
                    @click="navigator.clipboard.writeText(part.text)"
                  >
                    <CopyIcon class="size-3" />
                  </MessageAction>
                </MessageActions>
              </template>
            </template>
          </template>
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

## Features

- Displays messages from both user and AI assistant with distinct styling and automatic alignment
- Minimalist flat design with user messages in secondary background and assistant messages full-width
- Response branching with navigation controls to switch between multiple AI response versions
- Markdown rendering with GFM support (tables, task lists, strikethrough), math equations, and smart streaming
- Action buttons for common operations (retry, like, dislike, copy, share) with tooltips and state management
- File attachments display with support for images and generic files with preview and remove functionality
- Code blocks with syntax highlighting and copy-to-clipboard functionality
- Keyboard accessible with proper ARIA labels
- Responsive design that adapts to different screen sizes
- Seamless light/dark theme integration

::alert{icon="lucide:info"}
  Branching is an advanced use case you can implement to suit your needs. While the AI SDK does not provide built-in branching support, you have full flexibility to design and manage multiple response paths.
::

## Props

### `<Message />`

::field-group
  ::field{name="from" type="UIMessage['role']" required}
  The role of the message sender ("user", "assistant", or "system").
  ::

  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the component.
  ::
::

### `<MessageContent />`

::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the component.
  ::
::

### `<MessageActions />`

::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the component.
  ::
::

### `<MessageAction />`

::field-group
  ::field{name="tooltip" type="string" defaultValue="''"}
  Optional tooltip text shown on hover.
  ::

  ::field{name="label" type="string" defaultValue="''"}
  Accessible label for screen readers. Also used as fallback if tooltip is not provided.
  ::

  ::field{name="variant" type="ButtonVariants['variant']" defaultValue="'ghost'"}
  Optional button variant.
  ::

  ::field{name="size" type="ButtonVariants['size']" defaultValue="'icon-sm'"}
  Optional button size.
  ::
::

### `<MessageBranch />`

::field-group
  ::field{name="defaultBranch" type="number" defaultValue="0"}
  The index of the branch to show by default.
  ::

  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the component.
  ::
::

### `<MessageBranchContent />`

::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the component.
  ::
::

### `<MessageBranchSelector />`

::field-group
  ::field{name="from" type="UIMessage['role']" required}
  The role of the message sender ("user", "assistant", or "system").
  ::
::

### `<MessageBranchPage />`

::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the component.
  ::
::

### `<MessageResponse />`

::field-group
  ::field{name="content" type="string" defaultValue="''"}
  The content of the message.
  ::

  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the component.
  ::

  ::field{name="streamdown-vue props"}
  Additional props from [Streamdown-vue](https://github.com/Saluana/streamdown-vue?tab=readme-ov-file#5-props-reference)
  ::
::

### `<MessageAttachments />`

::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the component.
  ::
::

**Example:**

```vue
<MessageAttachments class="mb-2">
  <MessageAttachment
    v-for="attachment in files"
    :key="attachment.url"
    :data="attachment"
  />
</MessageAttachments>
```

### `<MessageAttachment />`

::field-group
  ::field{name="data" type="FileUIPart" required}
  The file data to display. Must include url and mediaType.
  ::

  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the component.
  ::
::

**Example:**

```vue
<MessageAttachment
  data="{
    type: 'file',
    url: 'https://example.com/image.jpg',
    mediaType: 'image/jpeg',
    filename: 'image.jpg'
  }"
  @remove="() => console.log('Remove clicked')"
/>
```

### `<MessageToolbar />`

::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional classes applied to the component.
  ::
::

## Emits

### `<MessageBranch />`

::field-group
  ::field{name="branchChange" type="function" }
  Emitted when the branch changes.
  ::
::

### `<MessageAttachment />`

::field-group
  ::field{name="remove" type="function" }
  Emitted when the attachment is removed.
  ::
::
