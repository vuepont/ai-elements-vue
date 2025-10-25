---
title: Task
description:
icon: lucide:book-check
---

The `Task` component provides a structured way to display task lists or workflow progress with collapsible details, status indicators, and progress tracking. It consists of a main `Task` container with `TaskTrigger` for the clickable header and `TaskContent` for the collapsible content area.

:::ComponentLoader{label="Preview" componentName="Task"}
:::

## Install using CLI

::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add task
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/task.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

:::code-group
```vue [Task.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  Collapsible,
} from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { provide, ref } from 'vue'

interface TaskProps {
  defaultOpen?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<TaskProps>(), {
  defaultOpen: true,
})

const isOpen = ref(props.defaultOpen)

function toggleOpen() {
  isOpen.value = !isOpen.value
}

provide('isOpen', isOpen)
provide('toggle', toggleOpen)
</script>

<template>
  <Collapsible :default-open="isOpen" :class="cn(props.class)" as-child v-bind="$attrs">
    <slot :is-open="isOpen" :toggle="toggleOpen" />
  </collapsible>
</template>
```

```vue [TaskTrigger.vue]
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  CollapsibleTrigger,
} from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ChevronDown, Search } from 'lucide-vue-next'

interface TaskTriggerProps {
  title: string
  class?: HTMLAttributes['class']
}

const props = defineProps<TaskTriggerProps>()
</script>

<template>
  <CollapsibleTrigger as-child :class="cn('group', props.class)">
    <slot>
      <div
        class="flex w-full cursor-pointer items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
      >
        <Search class="size-4" />
        <p class="text-sm">
          {{ props.title }}
        </p>
        <ChevronDown
          class="size-4 transition-transform group-data-[state=open]:rotate-180"
        />
      </div>
    </slot>
  </CollapsibleTrigger>
</template>
```

```vue [TaskContent.vue]
<script setup lang='ts'>
import type { HTMLAttributes } from 'vue'
import {
  CollapsibleContent,
} from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface TaskContentProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<TaskContentProps>()
</script>

<template>
  <CollapsibleContent
    :class="cn(
      'data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 text-popover-foreground outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
      props.class,
    )"
    v-bind="$attrs"
  >
    <div class="mt-4 space-y-2 border-l-2 border-muted pl-4">
      <slot />
    </div>
  </CollapsibleContent>
</template>
```

```vue [TaskItem.vue]
<script setup lang='ts'>
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface TaskItemProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<TaskItemProps>()
</script>

<template>
  <div :class="cn('text-sm text-muted-foreground', props.class)">
    <slot />
  </div>
</template>
```

```vue [TaskItemFile.vue]
<script setup lang='ts'>
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface TaskItemFileProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<TaskItemFileProps>()
</script>

<template>
  <div
    :class="cn('inline-flex items-center gap-1 rounded-md border bg-secondary px-1.5 py-0.5 text-foreground text-xs', props.class)"
  >
    <slot />
  </div>
</template>
```

```ts [index.ts]
export { default as Task } from './Task.vue'
export { default as TaskContent } from './TaskContent.vue'
export { default as TaskItem } from './TaskItem.vue'
export { default as TaskItemFile } from './TaskItemFile.vue'
export { default as TaskTrigger } from './TaskTrigger.vue'
```
:::

## Usage

```ts
import {
  Task,
  TaskContent,
  TaskItem,
  TaskItemFile,
  TaskTrigger,
} from '@/components/ai-elements/task'
```

```vue
<Task class="w-full">
  <TaskTrigger title="Found project files" />
  <TaskContent>
    <TaskItem>
      Read <TaskItemFile>index.md</TaskItemFile>
    </TaskItem>
  </TaskContent>
</Task>
```

## Usage with AI SDK

Build a mock async programming agent using `experimental_generateObject`.

Add the following component to your frontend:

```vue [pages/index.vue]
<script setup lang="ts">
import { experimental_useObject as useObject } from '@ai-sdk/vue'
import {
  SiCss,
  SiHtml5,
  SiJavascript,
  SiJson,
  SiMarkdown,
  SiTypescript,
  SiVue,
} from '@icons-pack/vue-simple-icons'
import {
  Task,
  TaskContent,
  TaskItem,
  TaskItemFile,
  TaskTrigger,
} from '@/components/ai-elements/task'
import { Button } from '@/components/ui/button'
import { tasksSchema } from '@/server/api/agent'

const iconMap = {
  vue: { component: SiVue, color: '#149ECA' },
  typescript: { component: SiTypescript, color: '#3178C6' },
  javascript: { component: SiJavascript, color: '#F7DF1E' },
  css: { component: SiCss, color: '#1572B6' },
  html: { component: SiHtml5, color: '#E34F26' },
  json: { component: SiJson, color: '#000000' },
  markdown: { component: SiMarkdown, color: '#000000' },
}

type IconKey = keyof typeof iconMap

const { object, submit, isLoading } = useObject({
  api: '/api/agent',
  schema: tasksSchema,
})

function handleSubmit(taskType: string) {
  submit({ prompt: taskType })
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
    <div class="flex flex-col h-full">
      <div class="flex gap-2 mb-6 flex-wrap">
        <Button
          :disabled="isLoading"
          variant="outline"
          @click="handleSubmit('Vue component development')"
        >
          Vue Development
        </Button>
      </div>

      <div class="flex-1 overflow-auto space-y-4">
        <div v-if="isLoading && !object" class="text-muted-foreground">
          Generating tasks...
        </div>

        <Task
          v-for="(task, taskIndex) in object?.tasks"
          :key="taskIndex"
          :default-open="taskIndex === 0"
        >
          <TaskTrigger :title="task.title || 'Loading...'" />
          <TaskContent>
            <TaskItem v-for="(item, itemIndex) in task.items" :key="itemIndex">
              <template v-if="item?.type === 'file' && item.file && iconMap[item.file.icon as IconKey]">
                <span class="inline-flex items-center gap-1">
                  {{ item.text }}
                  <TaskItemFile>
                    <component
                      :is="iconMap[item.file.icon as IconKey].component"
                      :color="item.file.color || iconMap[item.file.icon as IconKey].color"
                      class="size-4"
                    />
                    <span>{{ item.file.name }}</span>
                  </TaskItemFile>
                </span>
              </template>
              <template v-else>
                {{ item?.text || '' }}
              </template>
            </TaskItem>
          </TaskContent>
        </Task>
      </div>
    </div>
  </div>
</template>
```

Add the following route to your backend:

```ts [server/api/agent.ts]
import { streamObject } from 'ai'
import { z } from 'zod'

const taskItemSchema = z.object({
  type: z.enum(['text', 'file']),
  text: z.string(),
  file: z
    .object({
      name: z.string(),
      icon: z.string(),
      color: z.string().optional(),
    })
    .optional(),
})

const taskSchema = z.object({
  title: z.string(),
  items: z.array(taskItemSchema),
  status: z.enum(['pending', 'in_progress', 'completed']),
})

const tasksSchema = z.object({
  tasks: z.array(taskSchema),
})

export const maxDuration = 30

export default defineEventHandler(async (event) => {
  const body = await readBody<{ prompt: string }>(event)

  const result = streamObject({
    model: 'openai/gpt-4o',
    schema: tasksSchema,
    prompt: `You are an AI assistant that generates realistic development task workflows. Generate a set of tasks that would occur during ${body.prompt}.
            Each task should have:
            - A descriptive title
            - Multiple task items showing the progression
            - Some items should be plain text, others should reference files
            - Use realistic file names and appropriate file types
            - Status should progress from pending to in_progress to completed
            For file items, use these icon types: 'vue', 'typescript', 'javascript', 'css', 'html', 'json', 'markdown'
            Generate 3-4 tasks total, with 4-6 items each.`,
  })

  return result.toTextStreamResponse()
})
```

## Features

- Visual icons for pending, in-progress, completed, and error states
- Expandable content for task descriptions and additional information
- Built-in progress counter showing completed vs total tasks
- Optional progressive reveal of tasks with customizable timing
- Support for custom content within task items
- Full type safety with proper TypeScript definitions
- Keyboard navigation and screen reader support

## Props

### `<Task/>`

:::field-group
  ::field{name="defaultOpen" type="boolean" defaultValue="true"}
  Determine if the component item is visible or not.
  ::

  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<TaskTrigger/>`

:::field-group
  ::field{name="title" type="string" defaultValue="''"}
  The title of the task.
  ::

  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<TaskContent/>`
:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<TaskItem/>`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::

### `<TaskItemFile/>`

:::field-group
  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::
:::
