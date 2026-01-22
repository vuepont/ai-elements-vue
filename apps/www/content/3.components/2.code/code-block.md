---
title: Code Block
description: Provides syntax highlighting, line numbers, and copy to clipboard functionality for code blocks.
icon: lucide:code
---

The `CodeBlock` component provides syntax highlighting, line numbers, and copy to clipboard functionality for code blocks. It's fully composable, allowing you to customize the header, actions, and content.

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
  import { computed, provide } from 'vue'
  import CodeBlockContainer from './CodeBlockContainer.vue'
  import CodeBlockContent from './CodeBlockContent.vue'
  import { CodeBlockKey } from './context'

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

  provide(CodeBlockKey, {
    code: computed(() => props.code),
  })
  </script>

  <template>
    <CodeBlockContainer :class="props.class" :language="props.language">
      <slot />
      <CodeBlockContent
        :code="props.code"
        :language="props.language"
        :show-line-numbers="props.showLineNumbers"
      />
    </CodeBlockContainer>
  </template>
  ```

  ```vue [CodeBlockContainer.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
    language: string
  }>()

  const style = {
    contentVisibility: 'auto',
    containIntrinsicSize: 'auto 200px',
  }
  </script>

  <template>
    <div
      :class="cn(
        'group relative w-full overflow-hidden rounded-md border bg-background text-foreground',
        props.class,
      )"
      :data-language="props.language"
      :style="style"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [CodeBlockContent.vue] height=500 collapse
  <script setup lang="ts">
  import type { BundledLanguage, ThemedToken } from 'shiki'
  import type { TokenizedCode } from './utils'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed, ref, watch } from 'vue'
  import { createRawTokens, highlightCode, isBold, isItalic, isUnderline } from './utils'

  const props = withDefaults(
    defineProps<{
      code: string
      language: BundledLanguage
      showLineNumbers?: boolean
    }>(),
    {
      showLineNumbers: false,
    },
  )

  const rawTokens = computed(() => createRawTokens(props.code))
  // Try to get cached result synchronously, otherwise use raw tokens
  const tokenized = ref<TokenizedCode>(highlightCode(props.code, props.language) ?? rawTokens.value)

  watch(
    () => [props.code, props.language],
    () => {
      // Reset to raw tokens or cached result
      tokenized.value = highlightCode(props.code, props.language) ?? rawTokens.value
      // Trigger async highlight
      highlightCode(props.code, props.language, (result) => {
        tokenized.value = result
      })
    },
    { immediate: true },
  )

  const preStyle = computed(() => ({
    backgroundColor: tokenized.value.bg,
    color: tokenized.value.fg,
  }))

  interface KeyedToken {
    token: ThemedToken
    key: string
  }
  interface KeyedLine {
    tokens: KeyedToken[]
    key: string
  }

  const keyedLines = computed<KeyedLine[]>(() =>
    tokenized.value.tokens.map((line, lineIdx) => ({
      key: `line-${lineIdx}`,
      tokens: line.map((token, tokenIdx) => ({
        token,
        key: `line-${lineIdx}-${tokenIdx}`,
      })),
    })),
  )

  const lineNumberClasses = cn(
    'block',
    'before:content-[counter(line)]',
    'before:inline-block',
    'before:[counter-increment:line]',
    'before:w-8',
    'before:mr-4',
    'before:text-right',
    'before:text-muted-foreground/50',
    'before:font-mono',
    'before:select-none',
  )
  </script>

  <template>
    <div class="relative overflow-auto">
      <pre
        :class="cn('dark:!bg-[var(--shiki-dark-bg)] dark:!text-[var(--shiki-dark)] m-0 p-4 text-sm')"
        :style="preStyle"
      ><code
          :class="cn(
            'font-mono text-sm',
            showLineNumbers && '[counter-increment:line_0] [counter-reset:line]',
          )"
        ><template v-for="line in keyedLines" :key="line.key"><!-- Line rendering component --><span :class="showLineNumbers ? lineNumberClasses : 'block'"><template v-if="line.tokens.length === 0">{{ '\n' }}</template><template v-else><!-- Token rendering component --><span
                  v-for="tokenObj in line.tokens"
                  :key="tokenObj.key"
                  class="dark:!bg-[var(--shiki-dark-bg)] dark:!text-[var(--shiki-dark)]"
                  :style="{
                    color: tokenObj.token.color,
                    backgroundColor: tokenObj.token.bgColor,
                    ...tokenObj.token.htmlStyle,
                    fontStyle: isItalic(tokenObj.token.fontStyle) ? 'italic' : undefined,
                    fontWeight: isBold(tokenObj.token.fontStyle) ? 'bold' : undefined,
                    textDecoration: isUnderline(tokenObj.token.fontStyle) ? 'underline' : undefined,
                  }"
      >{{ tokenObj.token.content }}</span></template></span></template></code></pre>
    </div>
  </template>
  ```

  ```vue [CodeBlockHeader.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <div
      :class="cn(
        'flex items-center justify-between bg-muted/80 px-3 py-2 text-muted-foreground text-xs',
        props.class,
      )"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [CodeBlockTitle.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <div :class="cn('flex items-center gap-2', props.class)" v-bind="$attrs">
      <slot />
    </div>
  </template>
  ```

  ```vue [CodeBlockFilename.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <span :class="cn('font-mono', props.class)" v-bind="$attrs">
      <slot />
    </span>
  </template>
  ```

  ```vue [CodeBlockActions.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <div :class="cn('flex items-center gap-2', props.class)" v-bind="$attrs">
      <slot />
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

  ```vue [CodeBlockLanguageSelector.vue] height=500 collapse
  <script setup lang="ts">
  import { Select } from '@repo/shadcn-vue/components/ui/select'

  defineOptions({
    inheritAttrs: false,
  })
  </script>

  <template>
    <Select v-bind="$attrs">
      <slot />
    </Select>
  </template>
  ```

  ```vue [CodeBlockLanguageSelectorTrigger.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { SelectTrigger } from '@repo/shadcn-vue/components/ui/select'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <SelectTrigger
      :class="cn(
        'h-7 border-none bg-transparent px-2 text-xs shadow-none',
        props.class,
      )"
      size="sm"
      v-bind="$attrs"
    >
      <slot />
    </SelectTrigger>
  </template>
  ```

  ```vue [CodeBlockLanguageSelectorValue.vue] height=500 collapse
  <script setup lang="ts">
  import { SelectValue } from '@repo/shadcn-vue/components/ui/select'
  </script>

  <template>
    <SelectValue v-bind="$attrs">
      <slot />
    </SelectValue>
  </template>
  ```

  ```vue [CodeBlockLanguageSelectorContent.vue] height=500 collapse
  <script setup lang="ts">
  import { SelectContent } from '@repo/shadcn-vue/components/ui/select'

  const props = withDefaults(defineProps<{
    align?: 'start' | 'center' | 'end'
  }>(), {
    align: 'end',
  })
  </script>

  <template>
    <SelectContent :align="props.align" v-bind="$attrs">
      <slot />
    </SelectContent>
  </template>
  ```

  ```vue [CodeBlockLanguageSelectorItem.vue] height=500 collapse
  <script setup lang="ts">
  import { SelectItem } from '@repo/shadcn-vue/components/ui/select'

  const props = defineProps<{
    value: string
    disabled?: boolean
    textValue?: string
  }>()
  </script>

  <template>
    <SelectItem v-bind="{ ...props, ...$attrs }">
      <slot />
    </SelectItem>
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
  import type { BundledLanguage, BundledTheme, HighlighterGeneric, ThemedToken } from 'shiki'
  import { createHighlighter } from 'shiki'

  // Shiki uses bitflags for font styles: 1=italic, 2=bold, 4=underline
  // biome-ignore lint/suspicious/noBitwiseOperators: shiki bitflag check
  export const isItalic = (fontStyle: number | undefined) => fontStyle && fontStyle & 1
  // biome-ignore lint/suspicious/noBitwiseOperators: shiki bitflag check
  export const isBold = (fontStyle: number | undefined) => fontStyle && fontStyle & 2
  export function isUnderline(fontStyle: number | undefined) {
    return fontStyle && fontStyle & 4
  }

  export interface TokenizedCode {
    tokens: ThemedToken[][]
    fg: string
    bg: string
  }

  // Highlighter cache (singleton per language)
  const highlighterCache = new Map<
    string,
    Promise<HighlighterGeneric<BundledLanguage, BundledTheme>>
  >()

  // Token cache
  const tokensCache = new Map<string, TokenizedCode>()

  // Subscribers for async token updates
  const subscribers = new Map<string, Set<(result: TokenizedCode) => void>>()

  function getTokensCacheKey(code: string, language: BundledLanguage) {
    const start = code.slice(0, 100)
    const end = code.length > 100 ? code.slice(-100) : ''
    return `${language}:${code.length}:${start}:${end}`
  }

  function getHighlighter(language: BundledLanguage): Promise<HighlighterGeneric<BundledLanguage, BundledTheme>> {
    const cached = highlighterCache.get(language)
    if (cached) {
      return cached
    }

    const highlighterPromise = createHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: [language],
    })

    highlighterCache.set(language, highlighterPromise)
    return highlighterPromise
  }

  // Create raw tokens for immediate display while highlighting loads
  export function createRawTokens(code: string): TokenizedCode {
    return {
      tokens: code.split('\n').map(line =>
        line === ''
          ? []
          : [
              {
                content: line,
                color: 'inherit',
              } as ThemedToken,
            ],
      ),
      fg: 'inherit',
      bg: 'transparent',
    }
  }

  // Synchronous highlight with callback for async results
  export function highlightCode(
    code: string,
    language: BundledLanguage,
    callback?: (result: TokenizedCode) => void,
  ): TokenizedCode | null {
    const tokensCacheKey = getTokensCacheKey(code, language)

    // Return cached result if available
    const cached = tokensCache.get(tokensCacheKey)
    if (cached) {
      return cached
    }

    // Subscribe callback if provided
    if (callback) {
      if (!subscribers.has(tokensCacheKey)) {
        subscribers.set(tokensCacheKey, new Set())
      }
      subscribers.get(tokensCacheKey)?.add(callback)
    }

    // Start highlighting in background
    getHighlighter(language)
      .then((highlighter) => {
        const availableLangs = highlighter.getLoadedLanguages()
        const langToUse = availableLangs.includes(language) ? language : 'text'

        const result = highlighter.codeToTokens(code, {
          lang: langToUse,
          themes: {
            light: 'github-light',
            dark: 'github-dark',
          },
        })

        const tokenized: TokenizedCode = {
          tokens: result.tokens,
          fg: result.fg,
          bg: result.bg,
        }

        // Cache the result
        tokensCache.set(tokensCacheKey, tokenized)

        // Notify all subscribers
        const subs = subscribers.get(tokensCacheKey)
        if (subs) {
          for (const sub of subs) {
            sub(tokenized)
          }
          subscribers.delete(tokensCacheKey)
        }
      })
      .catch((error) => {
        console.error('Failed to highlight code:', error)
        subscribers.delete(tokensCacheKey)
      })

    return null
  }
  ```

  ```ts [index.ts]
  export { default as CodeBlock } from './CodeBlock.vue'
  export { default as CodeBlockActions } from './CodeBlockActions.vue'
  export { default as CodeBlockContainer } from './CodeBlockContainer.vue'
  export { default as CodeBlockContent } from './CodeBlockContent.vue'
  export { default as CodeBlockCopyButton } from './CodeBlockCopyButton.vue'
  export { default as CodeBlockFilename } from './CodeBlockFilename.vue'
  export { default as CodeBlockHeader } from './CodeBlockHeader.vue'
  export { default as CodeBlockLanguageSelector } from './CodeBlockLanguageSelector.vue'
  export { default as CodeBlockLanguageSelectorContent } from './CodeBlockLanguageSelectorContent.vue'
  export { default as CodeBlockLanguageSelectorItem } from './CodeBlockLanguageSelectorItem.vue'
  export { default as CodeBlockLanguageSelectorTrigger } from './CodeBlockLanguageSelectorTrigger.vue'
  export { default as CodeBlockLanguageSelectorValue } from './CodeBlockLanguageSelectorValue.vue'
  export { default as CodeBlockTitle } from './CodeBlockTitle.vue'
  export { highlightCode } from './utils'
  ```
::::

## Usage

The CodeBlock is fully composable. Here's a basic example:

```vue
<script setup lang="ts">
import { FileIcon } from 'lucide-vue-next'
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockTitle,
} from '@/components/ai-elements/code-block'

const code = `console.log("Hello, World!")`
</script>

<template>
  <CodeBlock :code="code" language="typescript">
    <CodeBlockHeader>
      <CodeBlockTitle>
        <FileIcon :size="14" />
        <CodeBlockFilename>example.ts</CodeBlockFilename>
      </CodeBlockTitle>
      <CodeBlockActions>
        <CodeBlockCopyButton />
      </CodeBlockActions>
    </CodeBlockHeader>
  </CodeBlock>
</template>
```

## Features

- Syntax highlighting with Shiki
- Line numbers (optional)
- Copy to clipboard functionality
- Automatic light/dark theme switching via CSS variables
- Language selector for multi-language examples
- Fully composable architecture
- Accessible design

## Examples

### Dark Mode

To use the `CodeBlock` component in dark mode, wrap it in a `div` with the `dark` class.

:::ComponentLoader{label="Preview" componentName="CodeBlockDark"}
:::

### Language Selector

Add a language selector to switch between different code implementations:

:::ComponentLoader{label="Preview" componentName="CodeBlock"}
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

### `<CodeBlockHeader />`

Container for the header row. Uses flexbox with `justify-between`.

::::field-group
  ::field{name="class" type="string"}
  Additional CSS classes.
  ::
::::

### `<CodeBlockTitle />`

Left-aligned container for icon and filename. Uses flexbox with `gap-2`.

::::field-group
  ::field{name="class" type="string"}
  Additional CSS classes.
  ::
::::

### `<CodeBlockFilename />`

Displays the filename in monospace font.

::::field-group
  ::field{name="class" type="string"}
  Additional CSS classes.
  ::
::::

### `<CodeBlockActions />`

Right-aligned container for action buttons. Uses flexbox with `gap-2`.

::::field-group
  ::field{name="class" type="string"}
  Additional CSS classes.
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

### `<CodeBlockLanguageSelector />`

Wrapper for the language selector. Extends shadcn/ui Select.

::::field-group
  ::field{name="v-model" type="string"}
  The currently selected language.
  ::
::::

### `<CodeBlockLanguageSelectorTrigger />`

Trigger button for the language selector dropdown. Pre-styled for code block header.

### `<CodeBlockLanguageSelectorValue />`

Displays the selected language value.

### `<CodeBlockLanguageSelectorContent />`

Dropdown content container. Defaults to `align="end"`.

### `<CodeBlockLanguageSelectorItem />`

Individual language option in the dropdown.

::::field-group
  ::field{name="value" type="string" required}
  The language value.
  ::
::::

### `<CodeBlockContainer />`

Low-level container component with performance optimizations (`contentVisibility`). Used internally by CodeBlock.

### `<CodeBlockContent />`

Low-level component that handles syntax highlighting. Used internally by CodeBlock, but can be used directly for custom layouts.

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
::::
