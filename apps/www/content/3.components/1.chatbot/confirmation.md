---
title: Confirmation
description: An alert-based component for managing tool execution approval workflows with request, accept, and reject states.
icon: lucide:circle-check
---

The `Confirmation` component provides a flexible system for displaying tool approval requests and their outcomes. Perfect for showing users when AI tools require approval before execution, and displaying the approval status afterward.

:::ComponentLoader{label="Preview" componentName="Confirmation"}
:::

## Install using CLI

::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add confirmation
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/confirmation.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

:::code-group
```vue [Confirmation.vue] height=260 collapse
<script setup lang="ts">
import type { ToolUIPart } from 'ai'
import type { HTMLAttributes } from 'vue'
import type { ToolUIPartApproval } from './context'
import { Alert } from '@repo/shadcn-vue/components/ui/alert'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { provide, toRef } from 'vue'
import { ConfirmationKey } from './context'

const props = defineProps<{
  approval?: ToolUIPartApproval
  state: ToolUIPart['state']
  class?: HTMLAttributes['class']
}>()

provide(ConfirmationKey, {
  approval: toRef(props, 'approval'),
  state: toRef(props, 'state'),
})
</script>

<template>
  <Alert
    v-if="approval && state !== 'input-streaming' && state !== 'input-available'"
    :class="cn('flex flex-col gap-2', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </Alert>
</template>
```

```vue [ConfirmationTitle.vue] height=260 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { AlertDescription } from '@repo/shadcn-vue/components/ui/alert'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <AlertDescription
    :class="cn('inline', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </AlertDescription>
</template>
```

```vue [ConfirmationRequest.vue] height=260 collapse
<script setup lang="ts">
import { useConfirmationContext } from './context'

const { state } = useConfirmationContext()
</script>

<template>
  <template v-if="state === 'approval-requested'">
    <slot />
  </template>
</template>
```

```vue [ConfirmationAccepted.vue] height=260 collapse
<script setup lang="ts">
import { useConfirmationContext } from './context'

const { approval, state } = useConfirmationContext()
</script>

<template>
  <template
    v-if="
      approval?.approved
        && (state === 'approval-responded'
          || state === 'output-denied'
          || state === 'output-available')
    "
  >
    <slot />
  </template>
</template>
```

```vue [ConfirmationRejected.vue] height=260 collapse
<script setup lang="ts">
import { useConfirmationContext } from './context'

const { approval, state } = useConfirmationContext()
</script>

<template>
  <template
    v-if="
      approval?.approved === false
        && (state === 'approval-responded'
          || state === 'output-denied'
          || state === 'output-available')
    "
  >
    <slot />
  </template>
</template>
```

```vue [ConfirmationActions.vue] height=260 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useConfirmationContext } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { state } = useConfirmationContext()
</script>

<template>
  <div
    v-if="state === 'approval-requested'"
    :class="
      cn('flex items-center justify-end gap-2 self-end', props.class)
    "
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
```

```vue [ConfirmationAction.vue] height=260 collapse
<script setup lang="ts">
import { Button } from '@repo/shadcn-vue/components/ui/button'
</script>

<template>
  <Button class="h-8 px-3 text-sm" type="button" v-bind="$attrs">
    <slot />
  </Button>
</template>
```

```ts [context.ts] height=260 collapse
import type { ToolUIPart } from 'ai'
import type { InjectionKey, Ref } from 'vue'
import { inject } from 'vue'

export type ToolUIPartApproval
  = | {
    id: string
    approved?: never
    reason?: never
  }
  | {
    id: string
    approved: boolean
    reason?: string
  }
  | {
    id: string
    approved: true
    reason?: string
  }
  | {
    id: string
    approved: true
    reason?: string
  }
  | {
    id: string
    approved: false
    reason?: string
  }
  | undefined

export interface ConfirmationContextValue {
  approval: Ref<ToolUIPartApproval>
  state: Ref<ToolUIPart['state']>
}

export const ConfirmationKey: InjectionKey<ConfirmationContextValue>
  = Symbol('ConfirmationContext')

export function useConfirmationContext() {
  const context = inject<ConfirmationContextValue | null>(ConfirmationKey, null)
  if (!context)
    throw new Error('Confirmation components must be used within <Confirmation>')
  return context
}
```

```ts [index.ts]
export { default as Confirmation } from './Confirmation.vue'
export { default as ConfirmationAccepted } from './ConfirmationAccepted.vue'
export { default as ConfirmationAction } from './ConfirmationAction.vue'
export { default as ConfirmationActions } from './ConfirmationActions.vue'
export { default as ConfirmationRejected } from './ConfirmationRejected.vue'
export { default as ConfirmationRequest } from './ConfirmationRequest.vue'
export { default as ConfirmationTitle } from './ConfirmationTitle.vue'
```
:::

## Usage with AI SDK

Build a chat UI with tool approval workflow where dangerous tools require user confirmation before execution.

Add the following component to your frontend:

```vue [pages/index.vue] height=260 collapse
<script setup lang="ts">
import type { ToolUIPart } from 'ai'
import { useChat } from '@ai-sdk/vue'
import { DefaultChatTransport } from 'ai'
import { CheckIcon, XIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import {
  Confirmation,
  ConfirmationAccepted,
  ConfirmationAction,
  ConfirmationActions,
  ConfirmationRejected,
  ConfirmationRequest,
  ConfirmationTitle,
} from '@/components/ai-elements/confirmation'
import { MessageResponse } from '@/components/ai-elements/message'
import { Button } from '@/components/ui/button'

interface DeleteFileInput {
  filePath: string
  confirm: boolean
}

type DeleteFileToolUIPart = ToolUIPart<{
  delete_file: {
    input: DeleteFileInput
    output: { success: boolean, message: string }
  }
}>

const { messages, sendMessage, status, respondToConfirmationRequest } = useChat({
  transport: new DefaultChatTransport({
    api: '/api/chat',
  }),
})

function handleDeleteFile() {
  sendMessage({ text: 'Delete the file at /tmp/example.txt' })
}

const latestMessage = computed(() => {
  if (!messages.value || messages.value.length === 0) {
    return undefined
  }
  return messages.value[messages.value.length - 1]
})

const deleteTool = computed(() => {
  return latestMessage.value?.parts?.find(
    part => part.type === 'tool-delete_file'
  ) as DeleteFileToolUIPart | undefined
})
</script>

<template>
  <div
    class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]"
  >
    <div class="flex flex-col h-full space-y-4">
      <Button
        :disabled="status !== 'ready'"
        @click="handleDeleteFile"
      >
        Delete Example File
      </Button>

      <Confirmation
        v-if="deleteTool?.approval"
        :approval="deleteTool.approval"
        :state="deleteTool.state"
      >
        <ConfirmationTitle>
          <ConfirmationRequest>
            This tool wants to delete: <code>{{ deleteTool.input?.filePath }}</code>
            <br>
            Do you approve this action?
          </ConfirmationRequest>
          <ConfirmationAccepted>
            <CheckIcon class="size-4" />
            <span>You approved this tool execution</span>
          </ConfirmationAccepted>
          <ConfirmationRejected>
            <XIcon class="size-4" />
            <span>You rejected this tool execution</span>
          </ConfirmationRejected>
        </ConfirmationTitle>
        <ConfirmationActions>
          <ConfirmationAction
            variant="outline"
            @click="
              respondToConfirmationRequest({
                approvalId: deleteTool!.approval!.id,
                approved: false,
              })
            "
          >
            Reject
          </ConfirmationAction>
          <ConfirmationAction
            variant="default"
            @click="
              respondToConfirmationRequest({
                approvalId: deleteTool!.approval!.id,
                approved: true,
              })
            "
          >
            Approve
          </ConfirmationAction>
        </ConfirmationActions>
      </Confirmation>

      <MessageResponse
        v-if="deleteTool?.output"
        :content="
          deleteTool.output.success
            ? deleteTool.output.message
            : `Error: ${deleteTool.output.message}`
        "
      />
    </div>
  </div>
</template>
```

Add the following route to your backend:

```ts [api/chat/route.ts] height=260 collapse
import { convertToModelMessages, streamText, UIMessage } from 'ai'
import { z } from 'zod'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export default defineEventHandler(async (event) => {
  const body = await readBody<{ messages: UIMessage[] }>(event)

  const result = streamText({
    model: 'openai/gpt-4o',
    messages: convertToModelMessages(body.messages),
    tools: {
      delete_file: {
        description: 'Delete a file from the file system',
        parameters: z.object({
          filePath: z.string().describe('The path to the file to delete'),
          confirm: z
            .boolean()
            .default(false)
            .describe('Confirmation that the user wants to delete the file'),
        }),
        requireApproval: true, // Enables approval workflow
        execute: async ({ filePath, confirm }) => {
          if (!confirm) {
            return {
              success: false,
              message: 'Deletion not confirmed',
            }
          }

          // Simulate a file deletion delay
          await new Promise(resolve => setTimeout(resolve, 500))

          return {
            success: true,
            message: `Successfully deleted ${filePath}`,
          }
        },
      },
    },
  })

  // Stream back to the UI
  return result.toAIStreamResponse()
})
```

## Features

- Context-based state management for approval workflow
- Conditional rendering based on approval state
- Support for approval-requested, approval-responded, output-denied, and output-available states
- Built on shadcn/ui Alert and Button components
- TypeScript support with comprehensive type definitions
- Customizable styling with Tailwind CSS
- Keyboard navigation and accessibility support
- Theme-aware with automatic dark mode support

## Examples

### Approval Request State

Shows the approval request with action buttons when state is `approval-requested`.

:::ComponentLoader{label="Preview" componentName="ConfirmationRequest"}
:::

### Approved State

Shows the accepted status when user approves and state is `approval-responded` or `output-available`.

:::ComponentLoader{label="Preview" componentName="ConfirmationAccepted"}
:::

### Rejected State

Shows the rejected status when user rejects and state is `output-denied`.

:::ComponentLoader{label="Preview" componentName="ConfirmationRejected"}
:::

## Props

### `<Confirmation />`

:::field-group
  ::field{name="approval" type="ToolUIPart['approval']"}
  The approval object containing the approval ID and status. If not provided or undefined, the component will not render.
  ::

  ::field{name="state" ype="ToolUIPart['state']"}
  The current state of the tool (input-streaming, input-available, approval-requested, approval-responded, output-denied, or output-available). Will not render for input-streaming or input-available states.
  ::

  ::field{name="class" type="string"}
  Additional classes applied to the component.
  ::
:::

### `<ConfirmationTitle />`

:::field-group
  ::field{name="class" type="string"}
  Additional classes applied to the component.
  ::
:::

### `<ConfirmationActions />`

:::field-group
  ::field{name="class" type="string"}
  Additional classes applied to the component.
  ::
:::
