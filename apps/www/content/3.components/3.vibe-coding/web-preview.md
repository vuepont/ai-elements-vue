---
title: Web Preview
description: A composable component for previewing the result of a generated UI, with support for live examples and code display.
icon: lucide:globe
---

The `WebPreview` component provides a flexible way to showcase the result of a generated UI component, along with its source code. It is designed for documentation and demo purposes, allowing users to interact with live examples and view the underlying implementation.

:::ComponentLoader{label="Web Preview" componentName="WebPreview"}
:::

## Install using CLI

:::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add web-preview
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/web-preview.json
  ```
  ::
:::

## Install Manually
:::code-group
```vue [WebPreview.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, ref } from 'vue'
import {
  provideWebPreviewContext,
} from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
  defaultUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultUrl: '',
})

const emit = defineEmits<{
  (e: 'update:url', value: string): void
  (e: 'urlChange', value: string): void
  (e: 'update:consoleOpen', value: boolean): void
  (e: 'consoleOpenChange', value: boolean): void
}>()

const url = ref(props.defaultUrl)
const consoleOpen = ref(false)

function setUrl(value: string) {
  url.value = value
  emit('update:url', value)
  emit('urlChange', value)
}

function setConsoleOpen(value: boolean) {
  consoleOpen.value = value
  emit('update:consoleOpen', value)
  emit('consoleOpenChange', value)
}

provideWebPreviewContext({
  url,
  setUrl,
  consoleOpen,
  setConsoleOpen,
})

const vBind = computed(() => {
  const { class: _, ...rest } = props
  return {
    class: cn('flex size-full flex-col rounded-lg border bg-card', props.class),
    ...rest,
  }
})
</script>

<template>
  <div v-bind="vBind">
    <slot />
  </div>
</template>
```

```vue [WebPreviewBody.vue] height=300 collapse
<script setup lang="ts">
import type { IframeHTMLAttributes, VNodeChild } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, useAttrs } from 'vue'
import { useWebPreviewContext } from './context'

interface Props extends /* @vue-ignore */ IframeHTMLAttributes {
  class?: IframeHTMLAttributes['class']
  src?: string
}

const props = defineProps<Props>()

defineSlots<{
  loading: () => VNodeChild
}>()

const attrs = useAttrs()
const { url } = useWebPreviewContext()

const frameSrc = computed(() => (props.src ?? url.value) || undefined)
</script>

<template>
  <div class="flex-1">
    <iframe
      :class="cn('size-full', props.class)"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
      :src="frameSrc"
      title="Preview"
      v-bind="attrs"
    />
    <slot name="loading" />
  </div>
</template>
```

```vue [WebPreviewConsole.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ChevronDownIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import { useWebPreviewContext } from './context'

type LogLevel = 'log' | 'warn' | 'error'

interface ConsoleLog {
  level: LogLevel
  message: string
  timestamp: Date
}

interface Props {
  class?: HTMLAttributes['class']
  logs?: ConsoleLog[]
}

const props = withDefaults(defineProps<Props>(), {
  logs: () => [],
})

const context = useWebPreviewContext()

const isConsoleOpen = computed(() => context.consoleOpen.value)

function levelClass(level: LogLevel) {
  if (level === 'error')
    return 'text-destructive'
  if (level === 'warn')
    return 'text-yellow-600'
  return 'text-foreground'
}
</script>

<template>
  <Collapsible
    :class="cn('border-t bg-muted/50 font-mono text-sm', props.class)"
    :open="isConsoleOpen"
    v-bind="$attrs"
    @update:open="context.setConsoleOpen"
  >
    <CollapsibleTrigger as-child>
      <Button
        class="flex w-full items-center justify-between p-4 text-left font-medium hover:bg-muted/50"
        type="button"
        variant="ghost"
      >
        Console
        <ChevronDownIcon
          :class="
            cn(
              'h-4 w-4 transition-transform duration-200',
              isConsoleOpen ? 'rotate-180' : 'rotate-0',
            )
          "
        />
      </Button>
    </CollapsibleTrigger>
    <CollapsibleContent
      class="px-4 pb-4 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 outline-none data-[state=closed]:animate-out data-[state=open]:animate-in"
    >
      <div class="max-h-48 space-y-1 overflow-y-auto">
        <p v-if="!props.logs.length" class="text-muted-foreground">
          No console output
        </p>
        <template v-else>
          <div
            v-for="(log, index) in props.logs"
            :key="`${log.timestamp.getTime?.() ?? index}-${index}`"
            :class="cn('text-xs', levelClass(log.level))"
          >
            <span class="text-muted-foreground">
              {{ log.timestamp.toLocaleTimeString() }}
            </span>
            {{ ' ' }}
            {{ log.message }}
          </div>
        </template>
        <slot />
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
```

```vue [WebPreviewNavigation.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    v-bind="{
      ...props,
      class: cn('flex items-center gap-1 border-b p-2', props.class),
    }"
  >
    <slot />
  </div>
</template>
```

```vue [WebPreviewNavigationButton.vue] height=300 collapse
<script setup lang="ts">
import type { ButtonVariants } from '@repo/shadcn-vue/components/ui/button'
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@repo/shadcn-vue/components/ui/tooltip'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  size?: ButtonVariants['size']
  variant?: ButtonVariants['variant']
  tooltip?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tooltip: '',
  disabled: false,
  size: 'sm',
  variant: 'ghost',
})
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button
          class="h-8 w-8 p-0 hover:text-foreground"
          type="button"
          v-bind="{ ...props, ...$attrs }"
        >
          <slot />
        </Button>
      </TooltipTrigger>
      <TooltipContent v-if="props.tooltip">
        <p>{{ props.tooltip }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
```

```vue [WebPreviewUrl.vue] height=300 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Input } from '@repo/shadcn-vue/components/ui/input'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ref, useAttrs, watch } from 'vue'
import { useWebPreviewContext } from './context'

interface Props {
  class?: HTMLAttributes['class']
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Enter URL...',
})

const attrs = useAttrs()
const context = useWebPreviewContext()

const inputValue = ref(context.url.value)

watch(
  () => context.url.value,
  (value) => {
    inputValue.value = value
  },
  { immediate: true },
)

function handleKeydown() {
  context.setUrl(inputValue.value)
}
</script>

<template>
  <Input
    v-model="inputValue"
    data-testid="web-preview-url-input"
    :class="cn('h-8 flex-1 text-sm', props.class)"
    :placeholder="props.placeholder"
    v-bind="attrs"
    @keydown.enter="handleKeydown"
  />
</template>
```

```ts [context.ts] height=300 collapse
import type { InjectionKey, Ref } from 'vue'
import { inject, provide } from 'vue'

export interface WebPreviewContextValue {
  url: Ref<string>
  setUrl: (url: string) => void
  consoleOpen: Ref<boolean>
  setConsoleOpen: (open: boolean) => void
}

const WebPreviewContextKey: InjectionKey<WebPreviewContextValue> = Symbol('WebPreviewContext')

export function provideWebPreviewContext(value: WebPreviewContextValue) {
  provide(WebPreviewContextKey, value)
}

export function useWebPreviewContext() {
  const context = inject(WebPreviewContextKey, null)

  if (!context) {
    throw new Error('WebPreview components must be used within WebPreview')
  }

  return context
}
```

```ts [index.ts]
export { provideWebPreviewContext, useWebPreviewContext } from './context'
export { default as WebPreview } from './WebPreview.vue'
export { default as WebPreviewBody } from './WebPreviewBody.vue'
export { default as WebPreviewConsole } from './WebPreviewConsole.vue'
export { default as WebPreviewNavigation } from './WebPreviewNavigation.vue'
export { default as WebPreviewNavigationButton } from './WebPreviewNavigationButton.vue'
export { default as WebPreviewUrl } from './WebPreviewUrl.vue'
```
:::

## Usage with AI SDK

Build a simple v0 clone using the [v0 Platform API](https://v0.dev/docs/api/platform).

Install the `v0-sdk` package:

```package-install
npm i v0-sdk
```

Add the following component to your frontend:
```vue [app.vue] height=300 collapse
<script setup lang="ts">
import { Loader } from '@/components/ai-elements/loader'
import {
  Input,
  PromptInputSubmit,
  PromptInputTextarea,
} from '@/components/ai-elements/prompt-input'
import {
  WebPreview,
  WebPreviewBody,
  WebPreviewNavigation,
  WebPreviewUrl,
} from '@/components/ai-elements/web-preview'

const previewUrl = ref('')
const prompt = ref('')
const isGenerating = ref(false)

async function handleSubmit(e: Event) {
  e.preventDefault()
  if (!prompt.value.trim())
    return
  prompt.value = ''

  isGenerating.value = true
  try {
    const response = await fetch('/api/v0', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompt.value }),
    })

    const data = await response.json()
    previewUrl.value = data.demo || '/'
    console.log('Generation finished:', data)
  }
  catch (error) {
    console.error('Generation failed:', error)
  }
  finally {
    isGenerating.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
    <div class="flex flex-col h-full">
      <div class="flex-1 mb-4">
        <div v-if="isGenerating" class="flex flex-col items-center justify-center h-full">
          <Loader />
          <p v-if="isGenerating" class="mt-4 text-muted-foreground">
            Generating app, this may take a few seconds...
          </p>
        </div>
        <WebPreview v-else-if="previewUrl" :default-url="previewUrl">
          <WebPreviewNavigation>
            <WebPreviewUrl />
          </WebPreviewNavigation>
          <WebPreviewBody :src="previewUrl" />
        </WebPreview>
        <div v-else class="flex items-center justify-center h-full text-muted-foreground">
          Your generated app will appear here
        </div>
      </div>

      <Input
        class="w-full max-w-2xl mx-auto relative"
        @submit="handleSubmit"
      >
        <PromptInputTextarea
          :value="prompt"
          placeholder="Describe the app you want to build..."
          class="pr-12 min-h-[60px]"
          @change="(e: any) => (prompt = e?.target?.value ?? '')"
        >
          <PromptInputSubmit
            :status="isGenerating ? 'streaming' : 'ready'"
            :disabled="!prompt.trim()"
            class="absolute bottom-1 right-1"
          />
        </PromptInputTextarea>
      </Input>
    </div>
  </div>
</template>
```

Add the following route to your backend:

```ts [server/api/v0.post.ts] height=300 collapse
import type { ChatsCreateResponse } from 'v0-sdk'
import { defineEventHandler, readBody } from 'h3'
import { v0 } from 'v0-sdk'

export default defineEventHandler(async (event) => {
  const { prompt }: { prompt: string } = await readBody(event)
  const result = await v0.chats.create({
    system: 'You are an expert coder',
    message: prompt,
    modelConfiguration: {
      modelId: 'v0-1.5-sm',
      imageGenerations: false,
      thinking: false,
    },
  }) as ChatsCreateResponse

  return {
    demo: result.demo,
    webUrl: result.webUrl,
  }
})
```

## Features

- Live preview of UI components
- Composable architecture with dedicated sub-components
- Responsive design modes (Desktop, Tablet, Mobile)
- Navigation controls with back/forward functionality
- URL input and example selector
- Full screen mode support
- Console logging with timestamps
- Context-based state management
- Consistent styling with the design system
- Easy integration into documentation pages

## Props

### `<WebPreview />`
::::field-group
  ::field{name="defaultUrl" type="string" defaultValue="''"}
  The initial URL to load in the preview.
  ::field{name="@urlChange" type="(url: string) => void"}
  Callback fired when the URL changes.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Any other props are spread to the root div.
  ::
::::

### `<WebPreviewNavigation />`

::::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Any other props are spread to the navigation container.
  ::
::::

### `<WebPreviewNavigationButton />`

::::field-group
  ::field{name="tooltip" type="string"}
  Tooltip text to display on hover.
  ::
  ::field{name="...props" type="typeof Button"}
  Any other props are spread to the underlying [shadcn-vue/ui Button](https://www.shadcn-vue.com/docs/components/button.html) component.
  ::
::::

### `<WebPreviewUrl />`

::::field-group
  ::field{name="...props" type="typeof Input"}
  Any other props are spread to the underlying [shadcn-vue/ui Input](https://www.shadcn-vue.com/docs/components/input.html) component.
  ::
::::

### `<WebPreviewBody />`

::::field-group
  ::field{name="loading" type="Slot"}
  Optional loading indicator to display over the preview.
  ::
  ::field{name="...props" type="IframeHTMLAttributes"}
  Any other props are spread to the underlying [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe).
  ::
::::

### `<WebPreviewConsole />`

::::field-group
  ::field{name="logs" type='Array<LogItem>'}
  Console log entries to display in the console panel.
    ```ts [LogItem]
    type LogItem = { level: "log" | "warn" | "error"; message: string; timestamp: Date }
    ```
    ```ts [Example]
    [
      {
        "level": "log",
        "message": "Page loaded successfully",
        "timestamp": "2025-01-01T00:00:00.000Z"
      }
    ]
    ```
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Any other props are spread to the root div.
  ::
::::
