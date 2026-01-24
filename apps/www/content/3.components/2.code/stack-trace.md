---
title: Stack Trace
description: Displays formatted JavaScript/Node.js error stack traces with syntax highlighting and collapsible frames.
icon: lucide:list
---

The `StackTrace` component displays formatted JavaScript/Node.js error stack traces with clickable file paths, internal frame dimming, and collapsible content.

:::ComponentLoader{label="Preview" componentName="StackTrace"}
:::

## Install using CLI

:::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add stack-trace
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/stack-trace.json
  ```
  ::
:::

## Install Manually

Copy and paste the following files into the same folder.

:::code-group
  ```vue [StackTrace.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { ParsedStackTrace } from './context'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { useVModel } from '@vueuse/core'
  import { computed, provide } from 'vue'
  import { StackTraceKey } from './context'
  import { parseStackTrace } from './utils'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    trace: string
    modelValue?: boolean
    defaultOpen?: boolean
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    defaultOpen: false,
    modelValue: undefined,
  })

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
    (e: 'openChange', value: boolean): void
    (e: 'filePathClick', filePath: string, line?: number, column?: number): void
  }>()

  const isOpen = useVModel(props, 'modelValue', emit, {
    defaultValue: props.defaultOpen,
    passive: true,
  })

  const parsedTrace = computed<ParsedStackTrace>(() => parseStackTrace(props.trace))

  function onFilePathClick(filePath: string, line?: number, column?: number) {
    emit('filePathClick', filePath, line, column)
  }

  function setIsOpen(value: boolean) {
    isOpen.value = value
    emit('openChange', value)
  }

  provide(StackTraceKey, {
    trace: parsedTrace,
    raw: computed(() => props.trace),
    isOpen,
    setIsOpen,
    onFilePathClick,
  })
  </script>

  <template>
    <div
      :class="cn(
        'not-prose w-full overflow-hidden rounded-lg border bg-background font-mono text-sm',
        props.class,
      )"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [StackTraceHeader.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import {
    Collapsible,
    CollapsibleTrigger,
  } from '@repo/shadcn-vue/components/ui/collapsible'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { useStackTraceContext } from './context'

  type CollapsibleTriggerProps = InstanceType<typeof CollapsibleTrigger>['$props']

  interface Props extends /* @vue-ignore */ CollapsibleTriggerProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const { isOpen, setIsOpen } = useStackTraceContext('StackTraceHeader')
  </script>

  <template>
    <Collapsible :open="isOpen" @update:open="setIsOpen">
      <CollapsibleTrigger as-child v-bind="$attrs">
        <div
          :class="cn(
            'flex w-full cursor-pointer items-center gap-3 p-3 text-left transition-colors hover:bg-muted/50',
            props.class,
          )"
        >
          <slot />
        </div>
      </CollapsibleTrigger>
    </Collapsible>
  </template>
  ```

  ```vue [StackTraceError.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { AlertTriangleIcon } from 'lucide-vue-next'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <div
      :class="cn(
        'flex flex-1 items-center gap-2 overflow-hidden',
        props.class,
      )"
      v-bind="$attrs"
    >
      <AlertTriangleIcon class="size-4 shrink-0 text-destructive" />
      <slot />
    </div>
  </template>
  ```

  ```vue [StackTraceErrorType.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { useStackTraceContext } from './context'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const { trace } = useStackTraceContext('StackTraceErrorType')
  </script>

  <template>
    <span
      :class="cn('shrink-0 font-semibold text-destructive', props.class)"
      v-bind="$attrs"
    >
      <slot>{{ trace.errorType }}</slot>
    </span>
  </template>
  ```

  ```vue [StackTraceErrorMessage.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { useStackTraceContext } from './context'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const { trace } = useStackTraceContext('StackTraceErrorMessage')
  </script>

  <template>
    <span :class="cn('truncate text-foreground', props.class)" v-bind="$attrs">
      <slot>{{ trace.errorMessage }}</slot>
    </span>
  </template>
  ```

  ```vue [StackTraceActions.vue]
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
      :class="cn('flex shrink-0 items-center gap-1', props.class)"
      role="group"
      v-bind="$attrs"
      @click.stop
      @keydown.enter.stop
      @keydown.space.stop
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [StackTraceCopyButton.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { Button } from '@repo/shadcn-vue/components/ui/button'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { CheckIcon, CopyIcon } from 'lucide-vue-next'
  import { computed, ref } from 'vue'
  import { useStackTraceContext } from './context'

  type ButtonProps = InstanceType<typeof Button>['$props']

  interface Props extends /* @vue-ignore */ ButtonProps {
    timeout?: number
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    timeout: 2000,
  })

  const emit = defineEmits<{
    (e: 'copy'): void
    (e: 'error', error: Error): void
  }>()

  const isCopied = ref(false)
  const { raw } = useStackTraceContext('StackTraceCopyButton')

  async function copyToClipboard() {
    if (typeof window === 'undefined' || !navigator?.clipboard?.writeText) {
      const error = new Error('Clipboard API not available')
      emit('error', error)
      return
    }

    try {
      await navigator.clipboard.writeText(raw.value)
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

  const icon = computed(() => (isCopied.value ? CheckIcon : CopyIcon))
  </script>

  <template>
    <Button
      :class="cn('size-7', props.class)"
      size="icon"
      variant="ghost"
      v-bind="$attrs"
      @click="copyToClipboard"
    >
      <slot>
        <component :is="icon" :size="14" />
      </slot>
    </Button>
  </template>
  ```

  ```vue [StackTraceExpandButton.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { ChevronDownIcon } from 'lucide-vue-next'
  import { useStackTraceContext } from './context'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const { isOpen } = useStackTraceContext('StackTraceExpandButton')
  </script>

  <template>
    <div
      :class="cn('flex size-7 items-center justify-center', props.class)"
      v-bind="$attrs"
    >
      <ChevronDownIcon
        :class="cn(
          'size-4 text-muted-foreground transition-transform',
          isOpen ? 'rotate-180' : 'rotate-0',
        )"
      />
    </div>
  </template>
  ```

  ```vue [StackTraceContent.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import {
    Collapsible,
    CollapsibleContent,
  } from '@repo/shadcn-vue/components/ui/collapsible'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { useStackTraceContext } from './context'

  type CollapsibleContentProps = InstanceType<typeof CollapsibleContent>['$props']

  interface Props extends /* @vue-ignore */ CollapsibleContentProps {
    maxHeight?: number
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    maxHeight: 400,
  })

  const { isOpen } = useStackTraceContext('StackTraceContent')
  </script>

  <template>
    <Collapsible :open="isOpen">
      <CollapsibleContent
        :class="cn(
          'overflow-auto border-t bg-muted/30',
          'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=open]:animate-in',
          props.class,
        )"
        :style="{ maxHeight: `${props.maxHeight}px` }"
        v-bind="$attrs"
      >
        <slot />
      </CollapsibleContent>
    </Collapsible>
  </template>
  ```

  ```vue [StackTraceFrames.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed } from 'vue'
  import { useStackTraceContext } from './context'
  import { AT_PREFIX_REGEX } from './utils'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    showInternalFrames?: boolean
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    showInternalFrames: true,
  })

  const { trace, onFilePathClick } = useStackTraceContext('StackTraceFrames')

  const framesToShow = computed(() => {
    return props.showInternalFrames
      ? trace.value.frames
      : trace.value.frames.filter(f => !f.isInternal)
  })
  </script>

  <template>
    <div :class="cn('space-y-1 p-3', props.class)" v-bind="$attrs">
      <div
        v-for="(frame, index) in framesToShow"
        :key="`${frame.raw}-${index}`"
        :class="cn(
          'text-xs',
          frame.isInternal
            ? 'text-muted-foreground/50'
            : 'text-foreground/90',
        )"
      >
        <span class="text-muted-foreground">at </span>
        <span v-if="frame.functionName" :class="frame.isInternal ? '' : 'text-foreground'">
          {{ frame.functionName }}
        </span>
        <template v-if="frame.filePath">
          <span class="text-muted-foreground">(</span>
          <button
            :class="cn(
              'underline decoration-dotted hover:text-primary',
              onFilePathClick && 'cursor-pointer',
            )"
            :disabled="!onFilePathClick"
            type="button"
            @click="() => {
              if (frame.filePath && onFilePathClick) {
                onFilePathClick(
                  frame.filePath,
                  frame.lineNumber ?? undefined,
                  frame.columnNumber ?? undefined,
                )
              }
            }"
          >
            {{ frame.filePath }}
            <template v-if="frame.lineNumber !== null">
              :{{ frame.lineNumber }}
            </template>
            <template v-if="frame.columnNumber !== null">
              :{{ frame.columnNumber }}
            </template>
          </button>
          <span class="text-muted-foreground">)</span>
        </template>
        <span v-else-if="!(frame.filePath || frame.functionName)">
          {{ frame.raw.replace(AT_PREFIX_REGEX, '') }}
        </span>
      </div>
      <div v-if="framesToShow.length === 0" class="text-muted-foreground text-xs">
        No stack frames
      </div>
    </div>
  </template>
  ```

  ```ts [context.ts]
  import type { InjectionKey, Ref } from 'vue'
  import { inject } from 'vue'

  export interface StackFrame {
    raw: string
    functionName: string | null
    filePath: string | null
    lineNumber: number | null
    columnNumber: number | null
    isInternal: boolean
  }

  export interface ParsedStackTrace {
    errorType: string | null
    errorMessage: string
    frames: StackFrame[]
    raw: string
  }

  export interface StackTraceContextValue {
    trace: Ref<ParsedStackTrace>
    raw: Ref<string>
    isOpen: Ref<boolean | undefined>
    setIsOpen: (open: boolean) => void
    onFilePathClick?: (filePath: string, line?: number, column?: number) => void
  }

  export const StackTraceKey: InjectionKey<StackTraceContextValue> = Symbol('StackTrace')

  export function useStackTraceContext(componentName: string): StackTraceContextValue {
    const context = inject(StackTraceKey)
    if (!context) {
      throw new Error(`${componentName} must be used within StackTrace`)
    }
    return context
  }
  ```

  ```ts [utils.ts]
  import type { ParsedStackTrace, StackFrame } from './context'

  export const STACK_FRAME_WITH_PARENS_REGEX = /^at\s+(.+?)\s+\((.+):(\d+):(\d+)\)$/
  export const STACK_FRAME_WITHOUT_FN_REGEX = /^at\s+(.+):(\d+):(\d+)$/
  export const ERROR_TYPE_REGEX = /^(\w+Error|Error):\s*(.*)$/
  export const AT_PREFIX_REGEX = /^at\s+/

  function parseStackFrame(line: string): StackFrame {
    const trimmed = line.trim()

    // Pattern: at functionName (filePath:line:column)
    const withParensMatch = trimmed.match(STACK_FRAME_WITH_PARENS_REGEX)
    if (withParensMatch) {
      const [, functionName, filePath, lineNum, colNum] = withParensMatch
      const isInternal
        = filePath.includes('node_modules')
        || filePath.startsWith('node:')
        || filePath.includes('internal/')
      return {
        raw: trimmed,
        functionName: functionName ?? null,
        filePath: filePath ?? null,
        lineNumber: lineNum ? Number.parseInt(lineNum, 10) : null,
        columnNumber: colNum ? Number.parseInt(colNum, 10) : null,
        isInternal,
      }
    }

    // Pattern: at filePath:line:column (no function name)
    const withoutFnMatch = trimmed.match(STACK_FRAME_WITHOUT_FN_REGEX)
    if (withoutFnMatch) {
      const [, filePath, lineNum, colNum] = withoutFnMatch
      const isInternal
        = (filePath?.includes('node_modules') ?? false)
        || (filePath?.startsWith('node:') ?? false)
        || (filePath?.includes('internal/') ?? false)
      return {
        raw: trimmed,
        functionName: null,
        filePath: filePath ?? null,
        lineNumber: lineNum ? Number.parseInt(lineNum, 10) : null,
        columnNumber: colNum ? Number.parseInt(colNum, 10) : null,
        isInternal,
      }
    }

    // Fallback: unparseable line
    return {
      raw: trimmed,
      functionName: null,
      filePath: null,
      lineNumber: null,
      columnNumber: null,
      isInternal: trimmed.includes('node_modules') || trimmed.includes('node:'),
    }
  }

  export function parseStackTrace(trace: string): ParsedStackTrace {
    const lines = trace.split("\n").filter(line => line.trim())

    if (lines.length === 0) {
      return {
        errorType: null,
        errorMessage: trace,
        frames: [],
        raw: trace,
      }
    }

    const firstLine = lines[0].trim()
    let errorType: string | null = null
    let errorMessage = firstLine

    // Try to extract error type from "ErrorType: message" format
    const errorMatch = firstLine.match(ERROR_TYPE_REGEX)
    if (errorMatch) {
      errorType = errorMatch[1]
      errorMessage = errorMatch[2] || ''
    }

    // Parse stack frames (lines starting with "at")
    const frames = lines
      .slice(1)
      .filter(line => line.trim().startsWith('at '))
      .map(parseStackFrame)

    return {
      errorType,
      errorMessage,
      frames,
      raw: trace,
    }
  }
  ```

  ```ts [index.ts]
  export { default as StackTrace } from './StackTrace.vue'
  export { default as StackTraceActions } from './StackTraceActions.vue'
  export { default as StackTraceContent } from './StackTraceContent.vue'
  export { default as StackTraceCopyButton } from './StackTraceCopyButton.vue'
  export { default as StackTraceError } from './StackTraceError.vue'
  export { default as StackTraceErrorMessage } from './StackTraceErrorMessage.vue'
  export { default as StackTraceErrorType } from './StackTraceErrorType.vue'
  export { default as StackTraceExpandButton } from './StackTraceExpandButton.vue'
  export { default as StackTraceFrames } from './StackTraceFrames.vue'
  export { default as StackTraceHeader } from './StackTraceHeader.vue'
  ```

:::

## Features

- Parses standard JavaScript/Node.js stack trace format
- Highlights error type in red
- Dims internal frames (node_modules, node: paths)
- Collapsible content with smooth animation
- Copy full stack trace to clipboard
- Clickable file paths with line/column numbers

## Examples

### Collapsed by Default

:::ComponentLoader{label="Collapsed" componentName="StackTraceCollapsed"}
:::

### Hide Internal Frames

:::ComponentLoader{label="No Internal Frames" componentName="StackTraceNoInternal"}
:::

## Props

### `<StackTrace />`

:::field-group
  ::field{name="trace" type="string" required}
  The raw stack trace string to parse and display.
  ::
  ::field{name="v-model" type="boolean"}
  Controlled open state (uses `modelValue` internally).
  ::
  ::field{name="defaultOpen" type="boolean" default="false"}
  Whether the content is expanded by default.
  ::
  ::field{name="@update:modelValue" type="(value: boolean) => void"}
  Callback when open state changes.
  ::
  ::field{name="@openChange" type="(value: boolean) => void"}
  Callback when open state changes (alternative to @update:modelValue).
  ::
  ::field{name="@filePathClick" type="(path: string, line?: number, column?: number) => void"}
  Callback when a file path is clicked. Receives the file path, line number, and column number.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the root div.
  ::
:::

### `<StackTraceHeader />`

:::field-group
  ::field{name="...props" type="CollapsibleTriggerProps"}
  Spread to the CollapsibleTrigger.
  ::
:::

### `<StackTraceError />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the container div.
  ::
:::

### `<StackTraceErrorType />`

:::field-group
  ::field{name="default" type="Slot"}
  Custom content. Defaults to the parsed error type.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the span element.
  ::
:::

### `<StackTraceErrorMessage />`

:::field-group
  ::field{name="default" type="Slot"}
  Custom content. Defaults to the parsed error message.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the span element.
  ::
:::

### `<StackTraceActions />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the container div.
  ::
:::

### `<StackTraceCopyButton />`

:::field-group
  ::field{name="@copy" type="() => void"}
  Callback fired after a successful copy.
  ::
  ::field{name="@error" type="(error: Error) => void"}
  Callback fired if copying fails.
  ::
  ::field{name="timeout" type="number" default="2000"}
  How long to show the copied state (ms).
  ::
  ::field{name="...props" type="ButtonProps"}
  Spread to the underlying Button component.
  ::
:::

### `<StackTraceExpandButton />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the container div.
  ::
:::

### `<StackTraceContent />`

:::field-group
  ::field{name="maxHeight" type="number" default="400"}
  Maximum height of the content area (in pixels).
  ::
  ::field{name="...props" type="CollapsibleContentProps"}
  Spread to the CollapsibleContent.
  ::
:::

### `<StackTraceFrames />`

:::field-group
  ::field{name="showInternalFrames" type="boolean" default="true"}
  Whether to show internal frames (node_modules, node: paths).
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the container div.
  ::
:::
