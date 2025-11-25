---
title: Tool
description: A collapsible component for displaying tool invocation details in AI chatbot interfaces.
icon: lucide:tool-case
---

The `Tool` component displays a collapsible interface for showing/hiding tool details. It is designed to take the `ToolUIPart` type from the AI SDK and display it in a collapsible interface.

:::ComponentLoader{label="Preview" componentName="Tool"}
:::

## Install using CLI

::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add tool
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/tool.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

:::code-group
```vue [Tool.vue] height=260 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Collapsible } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Collapsible
    :class="cn('not-prose mb-4 w-full rounded-md border', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </Collapsible>
</template>
```

```vue [ToolStatusBadge.vue] height=260 collapse
<!-- StatusBadge.vue -->
<script setup lang="ts">
import type { ToolUIPart } from 'ai'
import type { Component } from 'vue'
import { Badge } from '@repo/shadcn-vue/components/ui/badge'
import {
  CheckCircleIcon,
  CircleIcon,
  ClockIcon,
  XCircleIcon,
} from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  state: ToolUIPart['state']
}>()

const label = computed(() => {
  const labels: Record<ToolUIPart['state'], string> = {
    'input-streaming': 'Pending',
    'input-available': 'Running',
    'approval-requested': 'Awaiting Approval',
    'approval-responded': 'Responded',
    'output-available': 'Completed',
    'output-error': 'Error',
    'output-denied': 'Denied',
  }
  return labels[props.state]
})

const icon = computed<Component>(() => {
  const icons: Record<ToolUIPart['state'], Component> = {
    'input-streaming': CircleIcon,
    'input-available': ClockIcon,
    'approval-requested': ClockIcon,
    'approval-responded': CheckCircleIcon,
    'output-available': CheckCircleIcon,
    'output-error': XCircleIcon,
    'output-denied': XCircleIcon,
  }
  return icons[props.state]
})

const iconClass = computed(() => {
  const classes: Record<string, boolean> = {
    'size-4': true,
    'animate-pulse': props.state === 'input-available',
    'text-yellow-600': props.state === 'approval-requested',
    'text-blue-600': props.state === 'approval-responded',
    'text-green-600': props.state === 'output-available',
    'text-red-600': props.state === 'output-error',
    'text-orange-600': props.state === 'output-denied',
  }
  return classes
})
</script>

<template>
  <Badge class="gap-1.5 rounded-full text-xs" variant="secondary">
    <component :is="icon" :class="iconClass" />
    <span>{{ label }}</span>
  </Badge>
</template>
```

```vue [ToolHeader.vue] height=260 collapse
<script setup lang="ts">
import type { ToolUIPart } from 'ai'
import type { HTMLAttributes } from 'vue'
import { CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ChevronDownIcon, WrenchIcon } from 'lucide-vue-next'
import StatusBadge from './ToolStatusBadge.vue'

const props = defineProps<{
  title?: string
  type: ToolUIPart['type']
  state: ToolUIPart['state']
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <CollapsibleTrigger
    :class="
      cn(
        'flex w-full items-center justify-between gap-4 p-3',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <div class="flex items-center gap-2">
      <WrenchIcon class="size-4 text-muted-foreground" />
      <span class="font-medium text-sm">
        {{ props.title ?? props.type.split('-').slice(1).join(' ') }}
      </span>
      <StatusBadge :state="props.state" />
    </div>
    <ChevronDownIcon
      class="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180"
    />
  </CollapsibleTrigger>
</template>
```

```vue [ToolContent.vue] height=260 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CollapsibleContent } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <CollapsibleContent
    :class="
      cn(
        'data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 text-popover-foreground outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </CollapsibleContent>
</template>
```

```vue [ToolInput.vue] height=260 collapse
<script setup lang="ts">
import type { ToolUIPart } from 'ai'
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'
import { CodeBlock } from '../code-block'

const props = defineProps<{
  input: ToolUIPart['input']
  class?: HTMLAttributes['class']
}>()

const formattedInput = computed(() => {
  return JSON.stringify(props.input, null, 2)
})
</script>

<template>
  <div
    :class="cn('space-y-2 overflow-hidden p-4', props.class)"
    v-bind="$attrs"
  >
    <h4
      class="font-medium text-muted-foreground text-xs uppercase tracking-wide"
    >
      Parameters
    </h4>
    <div class="rounded-md bg-muted/50">
      <CodeBlock :code="formattedInput" language="json" />
    </div>
  </div>
</template>
```

```vue [ToolOutput.vue] height=260 collapse
<script setup lang="ts">
import type { ToolUIPart } from 'ai'
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'
import CodeBlock from './CodeBlock.vue'

const props = defineProps<{
  output: ToolUIPart['output']
  errorText: ToolUIPart['errorText']
  class?: HTMLAttributes['class']
}>()

const showOutput = computed(() => props.output || props.errorText)

const isObjectOutput = computed(
  () => typeof props.output === 'object' && props.output !== null,
)
const isStringOutput = computed(() => typeof props.output === 'string')

const formattedOutput = computed(() => {
  if (isObjectOutput.value) {
    return JSON.stringify(props.output, null, 2)
  }
  return props.output as string
})
</script>

<template>
  <div
    v-if="showOutput"
    :class="cn('space-y-2 p-4', props.class)"
    v-bind="$attrs"
  >
    <h4
      class="font-medium text-muted-foreground text-xs uppercase tracking-wide"
    >
      {{ props.errorText ? "Error" : "Result" }}
    </h4>
    <div
      :class="
        cn(
          'overflow-x-auto rounded-md text-xs [&_table]:w-full',
          props.errorText
            ? 'bg-destructive/10 text-destructive'
            : 'bg-muted/50 text-foreground',
        )
      "
    >
      <div v-if="errorText" class="p-3">
        {{ props.errorText }}
      </div>

      <CodeBlock
        v-else-if="isObjectOutput"
        :code="formattedOutput"
        language="json"
      />
      <CodeBlock
        v-else-if="isStringOutput"
        :code="formattedOutput"
        language="json"
      />
      <div v-else class="p-3">
        {{ props.output }}
      </div>
    </div>
  </div>
</template>
```

```ts [index.ts] height=260 collapse
export { default as Tool } from './Tool.vue'
export { default as ToolContent } from './ToolContent.vue'
export { default as ToolHeader } from './ToolHeader.vue'
export { default as ToolInput } from './ToolInput.vue'
export { default as ToolOutput } from './ToolOutput.vue'
```
:::

## Usage with AI SDK

Build a simple stateful weather app that renders the last message in a tool using [useChat](https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat).

Add the following component to your frontend:

```vue [pages/index.vue] height=260 collapse
<script setup lang="ts">
import type { ToolUIPart } from 'ai'
import { useChat } from '@ai-sdk/vue'
import { DefaultChatTransport } from 'ai'
import { computed, h } from 'vue'
import { MessageResponse } from '@/components/ai-elements/message'
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from '@/components/ai-elements/tool'
import { Button } from '@/components/ui/button'

interface WeatherToolInput {
  location: string
  units: 'celsius' | 'fahrenheit'
}

interface WeatherToolOutput {
  location: string
  temperature: string
  conditions: string
  humidity: string
  windSpeed: string
  lastUpdated: string
}

type WeatherToolUIPart = ToolUIPart<{
  fetch_weather_data: {
    input: WeatherToolInput
    output: WeatherToolOutput
  }
}>

const { messages, sendMessage, status } = useChat({
  transport: new DefaultChatTransport({
    api: '/api/weather',
  }),
})

function formatWeatherResult(result: WeatherToolOutput): string {
  if (!result)
    return ''
  return `**Weather for ${result.location}**

**Temperature:** ${result.temperature}
**Conditions:** ${result.conditions}
**Humidity:** ${result.humidity}
**Wind Speed:** ${result.windSpeed}

*Last updated: ${result.lastUpdated}*`
}

function handleWeatherClick() {
  sendMessage({ text: 'Get weather data for San Francisco in fahrenheit' })
}

const latestMessage = computed(() => {
  if (!messages.value || messages.value.length === 0) {
    return undefined
  }
  return messages.value[messages.value.length - 1]
})

const weatherTool = computed(() => {
  return latestMessage.value?.parts?.find(
    part => part.type === 'tool-fetch_weather_data'
  ) as WeatherToolUIPart | undefined
})

const weatherOutputVNode = computed(() => {
  if (!weatherTool.value?.output) {
    return null
  }
  const markdown = formatWeatherResult(weatherTool.value.output)
  return h(MessageResponse, { content: markdown })
})
</script>

<template>
  <div
    class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]"
  >
    <div class="flex flex-col h-full">
      <div class="space-y-4">
        <Button
          :disabled="status !== 'ready'"
          @click="handleWeatherClick"
        >
          Get Weather for San Francisco
        </Button>

        <Tool v-if="weatherTool" :default-open="true">
          <ToolHeader
            type="tool-fetch_weather_data"
            :state="weatherTool.state"
          />
          <ToolContent>
            <ToolInput :input="weatherTool.input" />
            <ToolOutput
              :output="weatherOutputVNode"
              :error-text="weatherTool.errorText"
            />
          </ToolContent>
        </Tool>
      </div>
    </div>
  </div>
</template>
```

Add the following route to your backend:

```ts [server/api/agent.ts] height=260 collapse
import { convertToModelMessages, streamText, UIMessage } from 'ai'
import { defineEventHandler, readBody } from 'h3'
import { z } from 'zod'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as { messages: UIMessage[] }
  const { messages } = body

  const result = streamText({
    model: 'openai/gpt-4o',
    messages: convertToModelMessages(messages),
    tools: {
      fetch_weather_data: {
        description: 'Fetch weather information for a specific location',
        parameters: z.object({
          location: z.string().describe('The city or location to get weather for'),
          units: z.enum(['celsius', 'fahrenheit']).default('celsius').describe('Temperature units'),
        }),
        inputSchema: z.object({
          location: z.string(),
          units: z.enum(['celsius', 'fahrenheit']).default('celsius'),
        }),
        execute: async ({ location, units }) => {
          await new Promise(resolve => setTimeout(resolve, 1500))
          const temp = units === 'celsius'
            ? Math.floor(Math.random() * 35) + 5
            : Math.floor(Math.random() * 63) + 41

          return {
            location,
            temperature: `${temp}°${units === 'celsius' ? 'C' : 'F'}`,
            conditions: 'Sunny',
            humidity: '12%',
            windSpeed: `35 ${units === 'celsius' ? 'km/h' : 'mph'}`,
            lastUpdated: new Date().toLocaleString(),
          }
        },
      },
    },
  })

  return result.toUIMessageStreamResponse()
})
```

## Features

- Collapsible interface for showing/hiding tool details
- Visual status indicators with icons and badges
- Support for multiple tool execution states (pending, running, completed, error)
- Formatted parameter display with JSON syntax highlighting
- Result and error handling with appropriate styling
- Composable structure for flexible layouts
- Accessible keyboard navigation and screen reader support
- Consistent styling that matches your design system
- Auto-opens completed tools by default for better UX

## Examples

### Input Streaming (Pending)

Shows a tool in its initial state while parameters are being processed.

:::ComponentLoader{label="Preview" componentName="ToolInputStreaming"}
:::

### Input Available (Running)

Shows a tool that's actively executing with its parameters.

:::ComponentLoader{label="Preview" componentName="ToolInputAvailable"}
:::

### Input Streaming (Completed)

Shows a completed tool with successful results. Opens by default to show the results. In this instance, the output is a JSON object, so we can use the `CodeBlock` component to display it.

:::ComponentLoader{label="Preview" componentName="ToolOutputAvailable"}
:::

### Output Error

Shows a tool that encountered an error during execution. Opens by default to display the error.

:::ComponentLoader{label="Preview" componentName="ToolOutputError"}
:::

## Props

### `<Tool/>`

:::field-group
  ::field{name="class" type="string"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<ToolHeader/>`

:::field-group
  ::field{name="type" type="ToolUIPart['type']"}
  The type/name of the tool.
  ::

  ::field{name="state" type="ToolUIPart['state']"}
  The current state of the tool (input-streaming, input-available, output-available, or output-error).
  ::

  ::field{name="title" type="string"}
  The title of the task.
  ::

  ::field{name="class" type="string"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<ToolContent/>`

:::field-group
  ::field{name="class" type="string"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<ToolInput/>`

:::field-group
  ::field{name="input" type="ToolUIPart['input']"}
  The input parameters passed to the tool, displayed as formatted JSON.
  ::

  ::field{name="class" type="string"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<ToolOutput/>`

:::field-group
  ::field{name="output" type="ToolUIPart['output']"}
  The output/result of the tool execution.
  ::

  ::field{name="errorText" type="ToolUIPart['errorText']"}
  An error message if the tool execution failed.
  ::

  ::field{name="class" type="string"}
  Additional CSS classes to apply to the component.
  ::
:::
