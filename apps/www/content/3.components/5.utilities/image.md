---
title: Image
description: Displays AI-generated images from the AI SDK.
icon: lucide:image
---

The `Image` component displays AI-generated images from the AI SDK. It accepts a [`Experimental_GeneratedImage`](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-image#generateimage) object from the AI SDK's `generateImage` function and automatically renders it as an image.

:::ComponentLoader{label="Image" componentName="Image"}
:::

## Install using CLI

:::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add image
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/image.json
  ```
  ::
:::

## Install Manually

Copy and paste the following files into the same folder.

:::code-group
  ```vue [Image.vue]
  <script setup lang="ts">
  import type { Experimental_GeneratedImage } from 'ai'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed } from 'vue'

  interface Props extends Experimental_GeneratedImage {
    class?: string
    alt?: string
  }

  const props = defineProps<Props>()

  const classes = computed(() => cn(
    'h-auto max-w-full overflow-hidden rounded-md',
    props.class,
  ))

  const src = computed(() => `data:${props.mediaType};base64,${props.base64}`)
  </script>

  <template>
    <img
      :alt="props.alt"
      :class="classes"
      :src="src"
      v-bind="$attrs"
    >
  </template>
  ```

  ```ts [index.ts]
  export { default as Image } from './Image.vue'
  ```
:::

## Usage with AI SDK

Build a simple code generation tool using the [`experimental_useObject`](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-object) hook.

Add the following component to your frontend:

::::code-group
```vue [app/page.vue] height=500 collapse
<script setup lang="ts">
import { ref } from 'vue'

import { Image } from '@/components/ai-elements/image'
import { Loader } from '@/components/ai-elements/loader'
import { PromptInput, PromptInputSubmit, PromptInputTextarea } from '@/components/ai-elements/prompt-input'

const prompt = ref('A futuristic cityscape at sunset')
const imageData = ref<any>(null)
const isLoading = ref(false)

async function handleSubmit() {
  if (!prompt.value.trim())
    return

  const currentPrompt = prompt.value.trim()
  prompt.value = ''

  setIsLoading(true)

  try {
    const response = await fetch('/api/image', {
      method: 'POST',
      body: JSON.stringify({ prompt: currentPrompt }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    imageData.value = data
  }
  catch (error) {
    console.error('Error generating image:', error)
  }
  finally {
    setIsLoading(false)
  }
}

function setIsLoading(value: boolean) {
  isLoading.value = value
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
    <div class="flex flex-col h-full">
      <div class="flex-1 overflow-y-auto p-4">
        <div v-if="imageData" class="flex justify-center">
          <Image
            v-bind="imageData"
            alt="Generated image"
            class="h-[300px] aspect-square border rounded-lg"
          />
        </div>

        <Loader v-if="isLoading" />
      </div>

      <PromptInput
        class="mt-4 w-full max-w-2xl mx-auto relative"
        @submit="handleSubmit"
      >
        <PromptInputTextarea
          v-model="prompt"
          placeholder="Describe the image you want to generate..."
          class="pr-12"
        />
        <PromptInputSubmit
          :status="isLoading ? 'submitted' : 'ready'"
          :disabled="!prompt.trim()"
          class="absolute bottom-1 right-1"
        />
      </PromptInput>
    </div>
  </div>
</template>
```
::::

Add the following route to your backend:

::::code-group
```ts [server/api/image.ts]
import { openai } from '@ai-sdk/openai'
import { experimental_generateImage } from 'ai'

export default defineEventHandler(async (event) => {
  const { prompt } = await readBody<{ prompt: string }>(event)

  const { image } = await experimental_generateImage({
    model: openai.image('dall-e-3'),
    prompt,
    size: '1024x1024',
  })

  return {
    base64: image.base64,
    uint8Array: image.uint8Array,
    mediaType: image.mediaType,
  }
})
```
::::

## Features

- Accepts `Experimental_GeneratedImage` objects directly from the AI SDK
- Automatically creates proper data URLs from base64-encoded image data
- Supports all standard HTML image attributes
- Responsive by default with `max-w-full h-auto` styling
- Customizable with additional CSS classes
- Includes proper TypeScript types for AI SDK compatibility

## Props

### `<Image />`

:::field-group
  ::field{name="alt" type="string" optional}
  Alternative text for the image.
  ::

  ::field{name="class" type="string" optional}
  Additional CSS classes applied to the `<img>` element.
  ::

  ::field{name="[...props]" type="Experimental_GeneratedImage" optional}
  The image data to display, as returned by the AI SDK.
  ::
:::
