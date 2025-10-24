---
title: Code Block
description:
icon: lucide:code
---

The `CodeBlock` component provides syntax highlighting and copy to clipboard functionality for code blocks. It uses Shiki for syntax highlighting and includes automatic light/dark theme switching.

## Install using CLI

:::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add code-block
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/code-block.json
  ```
  ::
:::

## Install Manually

Copy and paste the following files into the same folder.

:::code-group
  ```vue [CodeBlock.vue]
  <script setup lang="ts">
  import type { BuiltinTheme, BundledLanguage } from 'shiki'
  import { transformerCopyButton } from '@selemondev/shiki-transformer-copy-button'
  import CodeBlock from 'shiki-block-vue'

  interface Props {
    code: string
    lang: BundledLanguage
  }

  const props = withDefaults(defineProps<Props>(), {})

  const theme: { light: BuiltinTheme, dark: BuiltinTheme } = {
    light: 'vitesse-light',
    dark: 'vitesse-dark',
  }
  </script>

  <template>
    <CodeBlock
      :lang="props.lang"
      :code="props.code"
      :theme="theme"
      class="overflow-hidden"
      :transformers="[
        transformerCopyButton({
          duration: 3000,
          display: 'ready',
          successIcon: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='rgba(128,128,128,1)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'%3E%3Crect width='8' height='4' x='8' y='2' rx='1' ry='1'/%3E%3Cpath d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'/%3E%3Cpath d='m9 14 2 2 4-4'/%3E%3C/svg%3E`,
          copyIcon: `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='rgba(128,128,128,1)' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' viewBox='0 0 24 24'%3E%3Crect width='8' height='4' x='8' y='2' rx='1' ry='1'/%3E%3Cpath d='M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'/%3E%3Cpath d='m9 14 2 2 4-4'/%3E%3C/svg%3E`,
        }),
      ]"
    />
  </template>

  <style scoped>
  /* Dark Mode */
  @media (prefers-color-scheme: dark) {
    :deep(.shiki),
    :deep(.shiki span) {
      color: var(--shiki-dark) !important;
      background-color: var(--shiki-dark-bg) !important;
      /* Optional, if you also want font styles */
      font-style: var(--shiki-dark-font-style) !important;
      font-weight: var(--shiki-dark-font-weight) !important;
      text-decoration: var(--shiki-dark-text-decoration) !important;
    }
  }

  html.dark :deep(.shiki),
  html.dark :deep(.shiki span) {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
    font-style: var(--shiki-dark-font-style) !important;
    font-weight: var(--shiki-dark-font-weight) !important;
    text-decoration: var(--shiki-dark-text-decoration) !important;
  }

  :deep(.shiki--code--block) {
    width: 100%;
  }

  :deep(pre) {
    z-index: 1;
    padding: 24px;
    border-radius: 10px;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    position: relative;
    background-color: #F9F9F9 !important;
  }

  :deep(code) {
    display: block;
    line-height: 1.7;
    font-size: 15px;
  }
  </style>
  ```

  ```ts [index.ts]
  export { default as CodeBlock } from './CodeBlock.vue'
  ```
:::

## Usage

```vue
<script setup lang="ts">
import { CodeBlock } from '@/components/ai-elements/code-block'

const code = `<template>
  <div>
    <h1>Hello, {{ name }}!</h1>
    <p>This is an example Vue component.</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  name: string
}

defineProps<Props>()
<\/script>`
</script>

<template>
  <CodeBlock :code="code" lang="vue" />
</template>
```

## Features

- Syntax highlighting with Shiki
- Copy to clipboard functionality
- Automatic light/dark theme switching
- Support for all Shiki bundled languages
- Customizable themes (vitesse-light/vitesse-dark)
- Responsive design with horizontal scrolling
- Clean, modern styling
- Accessible design

## Props

### `<CodeBlock />`

:::field-group
  ::field{name="code" type="string" required}
  The code content to display.
  ::

  ::field{name="lang" type="BundledLanguage" required}
  The programming language for syntax highlighting. Supports all Shiki bundled languages.
  ::
:::
