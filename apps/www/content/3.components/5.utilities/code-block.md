---
title: Code Block
description: Provides syntax highlighting, line numbers, and copy to clipboard functionality for code blocks.
icon: lucide:code
---

The `CodeBlock` component provides syntax highlighting, line numbers, and copy to clipboard functionality for code blocks.

:::ComponentLoader{label="Preview" componentName="CodeBlock"}
:::

## Install using CLI

::::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add code-block
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/code-block.json
  ```
  ::
::::

## Install Manually

Copy and paste the following files into the same folder.

::::code-group
  ```vue [CodeBlock.vue] height=500 collapse
  <script setup lang="ts">
  import type { BundledLanguage } from 'shiki'
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { reactiveOmit } from '@vueuse/core'
  import { computed, onBeforeUnmount, provide, ref, watch } from 'vue'
  import { CodeBlockKey } from './context'
  import { highlightCode } from './utils'

  const props = withDefaults(
    defineProps<{
      code: string
      language: BundledLanguage
      showLineNumbers?: boolean
      class?: HTMLAttributes['class']
    }>(),
    {
      showLineNumbers: false,
    },
  )

  const delegatedProps = reactiveOmit(props, 'code', 'language', 'showLineNumbers', 'class')

  const html = ref('')
  const darkHtml = ref('')

  provide(CodeBlockKey, {
    code: computed(() => props.code),
  })

  let requestId = 0
  let isUnmounted = false

  watch(
    () => [props.code, props.language, props.showLineNumbers] as const,
    async ([code, language, showLineNumbers]) => {
      requestId += 1
      const currentId = requestId

      try {
        const [light, dark] = await highlightCode(code, language, showLineNumbers)

        if (currentId === requestId && !isUnmounted) {
          html.value = light
          darkHtml.value = dark
        }
      }
      catch (error) {
        console.error('[CodeBlock] highlight failed', error)
      }
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    isUnmounted = true
  })
  </script>

  <template>
    <div
      data-slot="code-block"
      v-bind="delegatedProps"
      :class="cn('group relative w-full overflow-hidden rounded-md border bg-background text-foreground', props.class)"
    >
      <div class="relative">
        <div
          class="overflow-hidden dark:hidden [&>pre]:m-0 [&>pre]:bg-background! [&>pre]:p-4 [&>pre]:text-foreground! [&>pre]:text-sm [&_code]:font-mono [&_code]:text-sm"
          v-html="html"
        />
        <div
          class="hidden overflow-hidden dark:block [&>pre]:m-0 [&>pre]:bg-background! [&>pre]:p-4 [&>pre]:text-foreground! [&>pre]:text-sm [&_code]:font-mono [&_code]:text-sm"
          v-html="darkHtml"
        />
        <div v-if="$slots.default" class="absolute top-2 right-2 flex items-center gap-2">
          <slot />
        </div>
      </div>
    </div>
  </template>
  ```

  ```vue [CodeBlockCopyButton.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { Button } from '@repo/shadcn-vue/components/ui/button'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { reactiveOmit } from '@vueuse/core'
  import { CheckIcon, CopyIcon } from 'lucide-vue-next'
  import { computed, inject, onBeforeUnmount, ref } from 'vue'
  import { CodeBlockKey } from './context'

  const props = withDefaults(
    defineProps<{
      timeout?: number
      class?: HTMLAttributes['class']
    }>(),
    {
      timeout: 2000,
    },
  )

  const emit = defineEmits<{
    (event: 'copy'): void
    (event: 'error', error: Error): void
  }>()

  const delegatedProps = reactiveOmit(props, 'timeout', 'class')

  const context = inject(CodeBlockKey)

  if (!context)
    throw new Error('CodeBlockCopyButton must be used within a <CodeBlock />')

  const { code } = context

  const isCopied = ref(false)
  let resetTimer: ReturnType<typeof setTimeout> | undefined

  const icon = computed(() => (isCopied.value ? CheckIcon : CopyIcon))

  async function copyToClipboard() {
    if (typeof window === 'undefined' || !navigator?.clipboard?.writeText) {
      const error = new Error('Clipboard API not available')
      emit('error', error)
      return
    }

    try {
      await navigator.clipboard.writeText(code.value)
      isCopied.value = true
      emit('copy')

      if (resetTimer) {
        clearTimeout(resetTimer)
      }

      resetTimer = setTimeout(() => {
        isCopied.value = false
      }, props.timeout)
    }
    catch (error) {
      emit('error', error instanceof Error ? error : new Error('Copy failed'))
    }
  }

  onBeforeUnmount(() => {
    if (resetTimer) {
      clearTimeout(resetTimer)
    }
  })
  </script>

  <template>
    <Button
      data-slot="code-block-copy-button"
      v-bind="delegatedProps"
      :class="cn('shrink-0', props.class)"
      size="icon"
      variant="ghost"
      @click="copyToClipboard"
    >
      <slot>
        <component :is="icon" :size="14" />
      </slot>
    </Button>
  </template>
  ```

  ```ts [context.ts]
  import type { ComputedRef, InjectionKey } from 'vue'

  export interface CodeBlockContext {
    code: ComputedRef<string>
  }

  export const CodeBlockKey: InjectionKey<CodeBlockContext> = Symbol('CodeBlock')
  ```

  ```ts [utils.ts] height=500 collapse
  import type { Element } from 'hast'
  import type { BundledLanguage, ShikiTransformer } from 'shiki'
  import { codeToHtml } from 'shiki'

  const lineNumberTransformer: ShikiTransformer = {
    name: 'line-numbers',
    line(node: Element, line: number) {
      node.children.unshift({
        type: 'element',
        tagName: 'span',
        properties: {
          className: [
            'inline-block',
            'min-w-10',
            'mr-4',
            'text-right',
            'select-none',
            'text-muted-foreground',
          ],
        },
        children: [{ type: 'text', value: String(line) }],
      })
    },
  }

  export async function highlightCode(
    code: string,
    language: BundledLanguage,
    showLineNumbers = false,
  ) {
    const transformers: ShikiTransformer[] = showLineNumbers
      ? [lineNumberTransformer]
      : []

    return await Promise.all([
      codeToHtml(code, {
        lang: language,
        theme: 'one-light',
        transformers,
      }),
      codeToHtml(code, {
        lang: language,
        theme: 'one-dark-pro',
        transformers,
      }),
    ])
  }
  ```

  ```ts [index.ts]
  export { default as CodeBlock } from './CodeBlock.vue'
  export { default as CodeBlockCopyButton } from './CodeBlockCopyButton.vue'
  ```
::::

## Usage with AI SDK

Build a simple code generation tool using the [`experimental_useObject`](https://sdk.vercel.ai/docs/reference/ai-sdk-ui/use-object) hook.

Add the following component to your frontend:

::::code-group
```vue [app/page.vue] height=500 collapse
<script setup lang="ts">
import { useObject } from '@ai-sdk/vue'
import { ref } from 'vue'
import { z } from 'zod'
import { CodeBlock, CodeBlockCopyButton } from '@/components/ai-elements/code-block'
import { PromptInput, PromptInputSubmit, PromptInputTextarea } from '@/components/ai-elements/prompt-input'

const codeBlockSchema = z.object({
  language: z.string(),
  filename: z.string(),
  code: z.string(),
})

const input = ref('')
const { object, submit, isLoading } = useObject({
  api: '/api/codegen',
  schema: codeBlockSchema,
})

function handleSubmit(e: Event) {
  e.preventDefault()
  if (input.value.trim()) {
    submit(input.value)
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
    <div class="flex flex-col h-full">
      <div class="flex-1 overflow-auto mb-4">
        <CodeBlock
          v-if="object?.code && object?.language"
          :code="object.code"
          :language="object.language"
          :show-line-numbers="true"
        >
          <CodeBlockCopyButton />
        </CodeBlock>
      </div>

      <PromptInput
        class="mt-4 w-full max-w-2xl mx-auto relative"
        @submit="handleSubmit"
      >
        <PromptInputTextarea
          v-model="input"
          placeholder="Generate a Vue todolist component"
          class="pr-12"
        />
        <PromptInputSubmit
          :status="isLoading ? 'streaming' : 'ready'"
          :disabled="!input.trim()"
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
```ts [server/api/codegen.post.ts]
import { openai } from '@ai-sdk/openai'
import { streamObject } from 'ai'
import { z } from 'zod'

const codeBlockSchema = z.object({
  language: z.string(),
  filename: z.string(),
  code: z.string(),
})

export default defineEventHandler(async (event) => {
  const { prompt } = await readBody(event)

  const result = streamObject({
    model: openai('gpt-4o'),
    schema: codeBlockSchema,
    prompt:
      `You are a helpful coding assitant. Only generate code, no markdown formatting or backticks, or text.${
        prompt}`,
  })

  return result.toTextStreamResponse()
})
```
::::

## Features

* Syntax highlighting with Shiki
* Line numbers (optional)
* Copy to clipboard functionality
* Automatic light/dark theme switching
* Customizable styles
* Accessible design

## Examples

### Dark Mode

To use the `CodeBlock` component in dark mode, you can wrap it in a `div` with the `dark` class.

:::ComponentLoader{label="Preview" componentName="CodeBlockDark"}
:::

## Props

### `<CodeBlock />`

::::field-group
  ::field{name="code" type="string" required}
  The code content to display.
  ::

  ::field{name="language" type="BundledLanguage" required}
  The programming language for syntax highlighting.
  ::

  ::field{name="showLineNumbers" type="boolean" default="false"}
  Whether to show line numbers.
  ::

  ::field{name="class" type="string"}
  Additional CSS classes to apply to the root container.
  ::
::::

### `<CodeBlockCopyButton />`

::::field-group
  ::field{name="timeout" type="number" default="2000"}
  How long to show the copied state (ms).
  ::

  ::field{name="class" type="string"}
  Additional CSS classes to apply to the button.
  ::

  ::field{name="@copy" type="() => void"}
  Callback fired after a successful copy.
  ::

  ::field{name="@error" type="(error: Error) => void"}
  Callback fired if copying fails.
  ::
::::
