---
title: Agent
description: A composable component for displaying AI agent configuration with model, instructions, tools, and output schema.
icon: lucide:bot
---

The `Agent` component displays an interface for showing AI agent configuration details. It's designed to represent a configured agent from the AI SDK, showing the agent's model, system instructions, available tools (with expandable input schemas), and output schema.

:::ComponentLoader{label="Preview" componentName="Agent"}
:::

## Install using CLI

:::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add agent
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/agent.json
  ```
  ::
:::

## Install Manually

Copy and paste the following files into the same folder.

:::code-group
  ```vue [Agent.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <div
      :class="cn('not-prose w-full rounded-md border', props.class)"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [AgentHeader.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { Badge } from '@repo/shadcn-vue/components/ui/badge'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { BotIcon } from 'lucide-vue-next'

  const props = defineProps<{
    name: string
    model?: string
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <div
      :class="
        cn(
          'flex w-full items-center justify-between gap-4 p-3',
          props.class,
        )
      "
      v-bind="$attrs"
    >
      <div class="flex items-center gap-2">
        <BotIcon class="size-4 text-muted-foreground" />
        <span class="font-medium text-sm">{{ props.name }}</span>
        <Badge
          v-if="props.model"
          class="font-mono text-xs"
          variant="secondary"
        >
          {{ props.model }}
        </Badge>
      </div>
    </div>
  </template>
  ```

  ```vue [AgentContent.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <div
      :class="cn('space-y-4 p-4 pt-0', props.class)"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [AgentInstructions.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <div
      :class="cn('space-y-2', props.class)"
      v-bind="$attrs"
    >
      <span class="font-medium text-muted-foreground text-sm">
        Instructions
      </span>
      <div class="rounded-md bg-muted/50 p-3 text-muted-foreground text-sm">
        <p>
          <slot />
        </p>
      </div>
    </div>
  </template>
  ```

  ```vue [AgentTools.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { Accordion } from '@repo/shadcn-vue/components/ui/accordion'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <div :class="cn('space-y-2', props.class)">
      <span class="font-medium text-muted-foreground text-sm">Tools</span>
      <Accordion
        class="rounded-md border"
        type="multiple"
        v-bind="$attrs"
      >
        <slot />
      </Accordion>
    </div>
  </template>
  ```

  ```vue [AgentTool.vue]
  <script setup lang="ts">
  import type { Tool } from 'ai'
  import type { HTMLAttributes } from 'vue'
  import { CodeBlock } from '@repo/elements/code-block'
  import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from '@repo/shadcn-vue/components/ui/accordion'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed } from 'vue'

  const props = defineProps<{
    tool: Tool
    value: string
    class?: HTMLAttributes['class']
  }>()

  const schema = computed(() => {
    return 'jsonSchema' in props.tool && props.tool.jsonSchema
      ? props.tool.jsonSchema
      : props.tool.inputSchema
  })

  const schemaString = computed(() => JSON.stringify(schema.value, null, 2))
  </script>

  <template>
    <AccordionItem
      :class="cn('border-b last:border-b-0', props.class)"
      :value="props.value"
      v-bind="$attrs"
    >
      <AccordionTrigger class="px-3 py-2 text-sm hover:no-underline">
        {{ props.tool.description ?? "No description" }}
      </AccordionTrigger>
      <AccordionContent class="px-3 pb-3">
        <div class="rounded-md bg-muted/50">
          <CodeBlock :code="schemaString" language="json" />
        </div>
      </AccordionContent>
    </AccordionItem>
  </template>
  ```

  ```vue [AgentOutput.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { CodeBlock } from '@repo/elements/code-block'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    schema: string
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <div
      :class="cn('space-y-2', props.class)"
      v-bind="$attrs"
    >
      <span class="font-medium text-muted-foreground text-sm">
        Output Schema
      </span>
      <div class="rounded-md bg-muted/50">
        <CodeBlock :code="props.schema" language="typescript" />
      </div>
    </div>
  </template>
  ```

  ```ts [index.ts]
  export { default as Agent } from './Agent.vue'
  export { default as AgentContent } from './AgentContent.vue'
  export { default as AgentHeader } from './AgentHeader.vue'
  export { default as AgentInstructions } from './AgentInstructions.vue'
  export { default as AgentOutput } from './AgentOutput.vue'
  export { default as AgentTool } from './AgentTool.vue'
  export { default as AgentTools } from './AgentTools.vue'
  ```
:::

## Usage with AI SDK

Display an agent's configuration alongside your chat interface. Tools are displayed in an accordion where clicking the description expands to show the input schema.

```vue title="app/page.vue"
<script setup lang="ts">
import { tool } from 'ai'
import { z } from 'zod'
import {
  Agent,
  AgentContent,
  AgentHeader,
  AgentInstructions,
  AgentOutput,
  AgentTool,
  AgentTools,
} from '@/components/ai-elements/agent'

const webSearch = tool({
  description: 'Search the web for information',
  inputSchema: z.object({
    query: z.string().describe('The search query'),
  }),
})

const readUrl = tool({
  description: 'Read and parse content from a URL',
  inputSchema: z.object({
    url: z.string().url().describe('The URL to read'),
  }),
})

const outputSchema = `z.object({
  sentiment: z.enum(['positive', 'negative', 'neutral']),
  score: z.number(),
  summary: z.string(),
})`
</script>

<template>
  <Agent>
    <AgentHeader name="Sentiment Analyzer" model="anthropic/claude-sonnet-4-5" />
    <AgentContent>
      <AgentInstructions>
        Analyze the sentiment of the provided text and return a structured
        analysis with sentiment classification, confidence score, and summary.
      </AgentInstructions>
      <AgentTools>
        <AgentTool :tool="webSearch" value="web_search" />
        <AgentTool :tool="readUrl" value="read_url" />
      </AgentTools>
      <AgentOutput :schema="outputSchema" />
    </AgentContent>
  </Agent>
</template>
```

## Features

- Model badge in header
- Instructions rendered as markdown
- Tools displayed as accordion items with expandable input schemas
- Output schema display with syntax highlighting
- Composable structure for flexible layouts
- Works with AI SDK `Tool` type

## Props

### `<Agent />`

:::field-group
  ::field{name="[...props]" type="HTMLAttributes"}
  Any props are spread to the root div.
  ::
:::

### `<AgentHeader />`

:::field-group
  ::field{name="name" type="string" required}
  The name of the agent.
  ::

  ::field{name="model" type="string"}
  The model identifier (e.g. "anthropic/claude-sonnet-4-5").
  ::

  ::field{name="...props" type="HTMLAttributes"}
  Any other props are spread to the container div.
  ::
:::

### `<AgentContent />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Any other props are spread to the container div.
  ::
:::

### `<AgentInstructions />`

:::field-group
  ::field{name="default" type="Slot"}
  The instruction text (children).
  ::

  ::field{name="...props" type="HTMLAttributes"}
  Any other props are spread to the container div.
  ::
:::

### `<AgentTools />`

:::field-group
  ::field{name="...props" type="AccordionProps"}
  Any other props are spread to the Accordion component.
  ::
:::

### `<AgentTool />`

:::field-group
  ::field{name="tool" type="Tool" required}
  The tool object from the AI SDK containing description and inputSchema.
  ::

  ::field{name="value" type="string" required}
  Unique identifier for the accordion item.
  ::

  ::field{name="...props" type="AccordionItemProps"}
  Any other props are spread to the AccordionItem component.
  ::
:::

### `<AgentOutput />`

:::field-group
  ::field{name="schema" type="string" required}
  The output schema as a string (displayed with syntax highlighting).
  ::

  ::field{name="...props" type="HTMLAttributes"}
  Any other props are spread to the container div.
  ::
:::
