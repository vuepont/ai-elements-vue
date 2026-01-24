---
title: Terminal
description: Display streaming console output with full ANSI color support.
icon: lucide:terminal
---

The `Terminal` component displays console output with ANSI color support, streaming indicators, and auto-scroll functionality.

:::ComponentLoader{label="Preview" componentName="Terminal"}
:::

## Install using CLI

::::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add terminal
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/terminal.json
  ```
  ::
::::

## Install Manually

Copy and paste the following files into the same folder.

::::code-group
  ```vue [Terminal.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed, provide, useAttrs } from 'vue'
  import { TerminalKey } from './context'
  import TerminalActions from './TerminalActions.vue'
  import TerminalClearButton from './TerminalClearButton.vue'
  import TerminalContent from './TerminalContent.vue'
  import TerminalCopyButton from './TerminalCopyButton.vue'
  import TerminalHeader from './TerminalHeader.vue'
  import TerminalStatus from './TerminalStatus.vue'
  import TerminalTitle from './TerminalTitle.vue'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    output: string
    isStreaming?: boolean
    autoScroll?: boolean
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    isStreaming: false,
    autoScroll: true,
  })

  const emit = defineEmits<{
    (e: 'clear'): void
  }>()

  const attrs = useAttrs()

  // Check for the presence of the 'onClear' listener (Vue normalizes @clear to onClear)
  const hasClear = computed(() => !!attrs.onClear || !!attrs['on-clear'])

  function handleClear() {
    emit('clear')
  }

  provide(TerminalKey, {
    output: computed(() => props.output),
    isStreaming: computed(() => props.isStreaming),
    autoScroll: computed(() => props.autoScroll),
    hasClear,
    onClear: handleClear,
  })
  </script>

  <template>
    <div
      :class="cn(
        'flex flex-col overflow-hidden rounded-lg border bg-zinc-950 text-zinc-100',
        props.class,
      )"
      v-bind="$attrs"
    >
      <slot>
        <TerminalHeader>
          <TerminalTitle />
          <div class="flex items-center gap-1">
            <TerminalStatus />
            <TerminalActions>
              <TerminalCopyButton />
              <TerminalClearButton v-if="hasClear" />
            </TerminalActions>
          </div>
        </TerminalHeader>
        <TerminalContent />
      </slot>
    </div>
  </template>
  ```

  ```vue [TerminalHeader.vue] height=500 collapse
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
      :class="cn(
        'flex items-center justify-between border-zinc-800 border-b px-4 py-2',
        props.class,
      )"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [TerminalTitle.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { TerminalIcon } from 'lucide-vue-next'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <div
      :class="cn('flex items-center gap-2 text-sm text-zinc-400', props.class)"
      v-bind="$attrs"
    >
      <TerminalIcon class="size-4" />
      <slot>Terminal</slot>
    </div>
  </template>
  ```

  ```vue [TerminalStatus.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { Shimmer } from '@repo/elements/shimmer'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { useTerminalContext } from './context'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const { isStreaming } = useTerminalContext('TerminalStatus')
  </script>

  <template>
    <div
      v-if="isStreaming"
      :class="cn('flex items-center gap-2 text-xs text-zinc-400', props.class)"
      v-bind="$attrs"
    >
      <slot>
        <Shimmer class="w-16" />
      </slot>
    </div>
  </template>
  ```

  ```vue [TerminalActions.vue] height=500 collapse
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
      :class="cn('flex items-center gap-1', props.class)"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [TerminalContent.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import Ansi from 'ansi-to-vue3'
  import { nextTick, ref, watch } from 'vue'
  import { useTerminalContext } from './context'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const { output, isStreaming, autoScroll } = useTerminalContext('TerminalContent')
  const containerRef = ref<HTMLDivElement | null>(null)

  watch(
    [output, autoScroll],
    () => {
      if (autoScroll.value) {
        nextTick(() => {
          if (containerRef.value) {
            containerRef.value.scrollTop = containerRef.value.scrollHeight
          }
        })
      }
    },
    { immediate: true },
  )
  </script>

  <template>
    <div
      ref="containerRef"
      :class="cn(
        'max-h-96 overflow-auto p-4 font-mono text-sm leading-relaxed',
        props.class,
      )"
      v-bind="$attrs"
    >
      <slot>
        <pre class="whitespace-pre-wrap wrap-break-word">
          <Ansi>{{ output }}</Ansi>
          <span
            v-if="isStreaming"
            class="ml-0.5 inline-block h-4 w-2 animate-pulse bg-zinc-100"
          />
        </pre>
      </slot>
    </div>
  </template>
  ```

  ```vue [TerminalCopyButton.vue] height=500 collapse
  <script setup lang="ts">
  import { Button } from '@repo/shadcn-vue/components/ui/button'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { CheckIcon, CopyIcon } from 'lucide-vue-next'
  import { computed, ref } from 'vue'
  import { useTerminalContext } from './context'

  type ButtonProps = InstanceType<typeof Button>['$props']

  interface Props extends /* @vue-ignore */ ButtonProps {
    timeout?: number
  }

  const props = withDefaults(defineProps<Props>(), {
    timeout: 2000,
  })

  const emit = defineEmits<{
    (e: 'copy'): void
    (e: 'error', error: Error): void
  }>()

  const { output } = useTerminalContext('TerminalCopyButton')
  const isCopied = ref(false)

  const Icon = computed(() => (isCopied.value ? CheckIcon : CopyIcon))

  async function copyToClipboard() {
    if (typeof window === 'undefined' || !navigator?.clipboard?.writeText) {
      emit('error', new Error('Clipboard API not available'))
      return
    }

    try {
      await navigator.clipboard.writeText(output.value)
      isCopied.value = true
      emit('copy')
      setTimeout(() => {
        isCopied.value = false
      }, props.timeout)
    }
    catch (error) {
      emit('error', error as Error)
    }
  }
  </script>

  <template>
    <Button
      :class="cn(
        'size-7 shrink-0 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100',
        props.class,
      )"
      size="icon"
      variant="ghost"
      v-bind="$attrs"
      @click="copyToClipboard"
    >
      <slot>
        <component :is="Icon" :size="14" />
      </slot>
    </Button>
  </template>
  ```

  ```vue [TerminalClearButton.vue] height=500 collapse
  <script setup lang="ts">
  import { Button } from '@repo/shadcn-vue/components/ui/button'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { Trash2Icon } from 'lucide-vue-next'
  import { useTerminalContext } from './context'

  type ButtonProps = InstanceType<typeof Button>['$props']

  interface Props extends /* @vue-ignore */ ButtonProps {}

  const props = defineProps<Props>()

  const { onClear, hasClear } = useTerminalContext('TerminalClearButton')
  </script>

  <template>
    <Button
      v-if="hasClear"
      :class="cn(
        'size-7 shrink-0 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100',
        props.class,
      )"
      size="icon"
      variant="ghost"
      v-bind="$attrs"
      @click="onClear"
    >
      <slot>
        <Trash2Icon :size="14" />
      </slot>
    </Button>
  </template>
  ```

  ```ts [context.ts]
  import type { ComputedRef, InjectionKey } from 'vue'
  import { inject } from 'vue'

  export interface TerminalContextValue {
    output: ComputedRef<string>
    isStreaming: ComputedRef<boolean>
    autoScroll: ComputedRef<boolean>
    hasClear: ComputedRef<boolean>
    onClear: () => void
  }

  export const TerminalKey: InjectionKey<TerminalContextValue> = Symbol('Terminal')

  export function useTerminalContext(componentName: string): TerminalContextValue {
    const context = inject(TerminalKey)

    if (!context) {
      throw new Error(`${componentName} must be used within Terminal`)
    }

    return context
  }
  ```

  ```ts [index.ts]
  export { default as Terminal } from './Terminal.vue'
  export { default as TerminalActions } from './TerminalActions.vue'
  export { default as TerminalClearButton } from './TerminalClearButton.vue'
  export { default as TerminalContent } from './TerminalContent.vue'
  export { default as TerminalCopyButton } from './TerminalCopyButton.vue'
  export { default as TerminalHeader } from './TerminalHeader.vue'
  export { default as TerminalStatus } from './TerminalStatus.vue'
  export { default as TerminalTitle } from './TerminalTitle.vue'
  ```

::::

## Features

- Full ANSI color support (256 colors, bold, italic, underline)
- Streaming mode with cursor animation
- Auto-scroll to latest output
- Copy output to clipboard
- Clear button support
- Dark terminal theme

## ANSI Support

The Terminal uses `ansi-to-vue3` to parse ANSI escape codes:

```bash
\x1b[32m✓\x1b[0m Success    # Green checkmark
\x1b[31m✗\x1b[0m Error      # Red X
\x1b[33mwarn\x1b[0m Warning   # Yellow text
\x1b[1mBold\x1b[0m           # Bold text
```

## Examples

### Basic Usage

:::ComponentLoader{label="Basic" componentName="TerminalBasic"}
:::

### Streaming Mode

:::ComponentLoader{label="Streaming" componentName="TerminalStreaming"}
:::

### With Clear Button

:::ComponentLoader{label="Clear" componentName="TerminalClear"}
:::

## Props

### `<Terminal />`

::::field-group
  ::field{name="output" type="string" required}
  Terminal output text (supports ANSI codes).
  ::

  ::field{name="isStreaming" type="boolean" default="false"}
  Show streaming indicator.
  ::

  ::field{name="autoScroll" type="boolean" default="true"}
  Auto-scroll to bottom on new output.
  ::

  ::field{name="@clear" type="() => void"}
  Callback to clear output (enables clear button).
  ::

  ::field{name="class" type="string"}
  Additional CSS classes.
  ::
::::

### `<TerminalHeader />`

::::field-group
  ::field{name="class" type="string"}
  Additional CSS classes.
  ::
::::

### `<TerminalTitle />`

::::field-group
  ::field{name="class" type="string"}
  Additional CSS classes.
  ::
::::

### `<TerminalStatus />`

::::field-group
  ::field{name="class" type="string"}
  Additional CSS classes.
  ::
::::

### `<TerminalActions />`

::::field-group
  ::field{name="class" type="string"}
  Additional CSS classes.
  ::
::::

### `<TerminalContent />`

::::field-group
  ::field{name="class" type="string"}
  Additional CSS classes.
  ::
::::

### `<TerminalCopyButton />`

::::field-group
  ::field{name="timeout" type="number" default="2000"}
  Duration to show copied state (ms).
  ::

  ::field{name="@copy" type="() => void"}
  Callback after successful copy.
  ::

  ::field{name="@error" type="(error: Error) => void"}
  Callback if copying fails.
  ::
::::

### `<TerminalClearButton />`

::::field-group
  ::field{name="[...props]" type="ButtonProps"}
  Additional props forwarded to the underlying Button component.
  ::
::::
