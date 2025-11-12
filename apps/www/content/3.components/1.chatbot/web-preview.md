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
<!-- TODO: Add code snippets for manual installation -->

## Usage with AI SDK

Build a simple v0 clone using the [v0 Platform API](https://v0.dev/docs/api/platform).

Install the `v0-sdk` package:

```package-install
npm i v0-sdk
```

Add the following component to your frontend:
<!-- TOOD: Using Vue 3 example -->
```vue title="app.vue"
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

<!-- TOOD: Using Nuxt example -->

```ts title="server/api/v0.post.ts"
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
  ::
  ::field{name="onUrlChange" type="(url: string) => void"}
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
  Any other props are spread to the underlying shadcn/ui Button component.
  ::
::::

### `<WebPreviewUrl />`

::::field-group
  ::field{name="...props" type="typeof Input"}
  Any other props are spread to the underlying shadcn/ui Input component.
  ::
::::

### `<WebPreviewBody />`

::::field-group
  ::field{name="loading" type="React.ReactNode"}
  Optional loading indicator to display over the preview.
  ::
  ::field{name="...props" type="IframeHTMLAttributes"}
  Any other props are spread to the underlying iframe.
  ::
::::

### `<WebPreviewConsole />`

::::field-group
  ::field{name="logs" type='Array<{ level: "log" | "warn" | "error"; message: string; timestamp: Date }>'}
  Console log entries to display in the console panel.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Any other props are spread to the root div.
  ::
::::
