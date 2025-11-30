---
title: 图像
description:
icon: lucide:image
---

`Image` 组件显示来自 AI SDK 的 AI 生成图像。它接受来自 AI SDK 的 `generateImage` 函数的 [`Experimental_GeneratedImage`](https://ai-sdk.dev/docs/reference/ai-sdk-core/generate-image#generateimage) 对象，并自动将其渲染为图像。

:::ComponentLoader{label="Image" componentName="Image"}
:::

## Install using CLI

:::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add image
  ```
  ::
  ::div{label="shadcn-vue"}

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
  import { computed, useAttrs } from 'vue'

  interface Props extends Experimental_GeneratedImage {
    class?: string
    alt?: string
  }

  const props = defineProps<Props>()
  const attrs = useAttrs()

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
      v-bind="attrs"
    >
  </template>
  ```

  ```ts [index.ts]
  export { default as Image } from './Image.vue'
  ```
:::

## Usage

```vue
<script setup lang="ts">
import { Image } from '@/components/ai-elements/image'

const exampleImage = {
  base64: 'valid-base64-string',
  mediaType: 'image/jpeg',
  uint8Array: new Uint8Array([]),
}
</script>

<template>
  <Image
    v-bind="exampleImage"
    alt="Example generated image"
    class="h-[150px] aspect-square border"
  />
</template>
```

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
