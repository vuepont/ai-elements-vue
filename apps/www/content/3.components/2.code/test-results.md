---
title: Test Results
description: Display test suite results with pass/fail/skip status and error details.
icon: lucide:check-circle-2
---

The `TestResults` component displays test suite results including summary statistics, progress, individual tests, and error details.

:::ComponentLoader{label="Preview" componentName="TestResults"}
:::

## Install using CLI

:::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add test-results
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/test-results.json
  ```
  ::
:::

## Install Manually

Copy and paste the following code in the same folder.

:::code-group
  ```vue [TestResults.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { TestResultsSummaryData } from './context'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed, provide, reactive } from 'vue'
  import { TestResultsContextKey } from './context'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    summary?: TestResultsSummaryData
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const context = reactive({
    summary: computed(() => props.summary),
  })

  provide(TestResultsContextKey, context)
  </script>

  <template>
    <div
      :class="cn('rounded-lg border bg-background', props.class)"
      v-bind="$attrs"
    >
      <slot>
        <TestResultsHeader v-if="summary">
          <TestResultsSummary />
          <TestResultsDuration />
        </TestResultsHeader>
      </slot>
    </div>
  </template>
  ```

  ```vue [TestResultsHeader.vue]
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
      :class="cn('flex items-center justify-between border-b px-4 py-3', props.class)"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [TestResultsSummary.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { Badge } from '@repo/shadcn-vue/components/ui/badge'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { CheckCircle2, Circle, XCircle } from 'lucide-vue-next'
  import { useTestResultsContext } from './context'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const { summary } = useTestResultsContext()
  </script>

  <template>
    <div
      v-if="summary"
      :class="cn('flex items-center gap-3', props.class)"
      v-bind="$attrs"
    >
      <slot>
        <Badge
          class="gap-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          variant="secondary"
        >
          <CheckCircle2 class="size-3" />
          {{ summary.passed }} passed
        </Badge>
        <Badge
          v-if="summary.failed > 0"
          class="gap-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          variant="secondary"
        >
          <XCircle class="size-3" />
          {{ summary.failed }} failed
        </Badge>
        <Badge
          v-if="summary.skipped > 0"
          class="gap-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
          variant="secondary"
        >
          <Circle class="size-3" />
          {{ summary.skipped }} skipped
        </Badge>
      </slot>
    </div>
  </template>
  ```

  ```vue [TestResultsDuration.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { useTestResultsContext } from './context'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const { summary } = useTestResultsContext()

  function formatDuration(ms: number) {
    if (ms < 1000) {
      return `${ms}ms`
    }
    return `${(ms / 1000).toFixed(2)}s`
  }
  </script>

  <template>
    <span
      v-if="summary?.duration"
      :class="cn('text-muted-foreground text-sm', props.class)"
      v-bind="$attrs"
    >
      <slot>{{ formatDuration(summary.duration) }}</slot>
    </span>
  </template>
  ```

  ```vue [TestResultsProgress.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed } from 'vue'
  import { useTestResultsContext } from './context'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const { summary } = useTestResultsContext()

  const passedPercent = computed(() => {
    if (!summary)
      return 0
    return (summary.passed / summary.total) * 100
  })

  const failedPercent = computed(() => {
    if (!summary)
      return 0
    return (summary.failed / summary.total) * 100
  })
  </script>

  <template>
    <div
      v-if="summary"
      :class="cn('space-y-2', props.class)"
      v-bind="$attrs"
    >
      <slot>
        <div class="flex h-2 overflow-hidden rounded-full bg-muted">
          <div
            class="bg-green-500 transition-all"
            :style="{ width: `${passedPercent}%` }"
          />
          <div
            class="bg-red-500 transition-all"
            :style="{ width: `${failedPercent}%` }"
          />
        </div>
        <div class="flex justify-between text-muted-foreground text-xs">
          <span>{{ summary.passed }}/{{ summary.total }} tests passed</span>
          <span>{{ passedPercent.toFixed(0) }}%</span>
        </div>
      </slot>
    </div>
  </template>
  ```

  ```vue [TestResultsContent.vue]
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
      :class="cn('space-y-2 p-4', props.class)"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [TestSuite.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { TestStatusType } from './context'
  import { Collapsible } from '@repo/shadcn-vue/components/ui/collapsible'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { useVModel } from '@vueuse/core'
  import { computed, provide, reactive } from 'vue'
  import { TestSuiteContextKey } from './context'

  type TestSuiteProps = InstanceType<typeof Collapsible>['$props']

  interface Props extends /* @vue-ignore */ TestSuiteProps {
    name: string
    status: TestStatusType
    defaultOpen?: boolean
    modelValue?: boolean
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    defaultOpen: false,
    modelValue: undefined,
  })

  const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
  }>()

  const isOpen = useVModel(props, 'modelValue', emit, {
    defaultValue: props.defaultOpen,
    passive: true,
  })

  const context = reactive({
    name: computed(() => props.name),
    status: computed(() => props.status),
  })

  provide(TestSuiteContextKey, context)
  </script>

  <template>
    <Collapsible
      v-model:open="isOpen"
      :class="cn('rounded-lg border', props.class)"
      v-bind="$attrs"
    >
      <slot />
    </Collapsible>
  </template>
  ```

  ```vue [TestSuiteName.vue] height=500 collapse
  <script setup lang="ts">
  import type { Component, HTMLAttributes } from 'vue'
  import type { TestStatusType } from './context'
  import { CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import {
    CheckCircle2,
    ChevronRight,
    Circle,
    CircleDot,
    XCircle,
  } from 'lucide-vue-next'
  import { useTestSuiteContext } from './context'

  type TestSuiteNameProps = InstanceType<typeof CollapsibleTrigger>['$props']

  interface Props extends /* @vue-ignore */ TestSuiteNameProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const context = useTestSuiteContext()

  const statusStyles: Record<TestStatusType, string> = {
    passed: 'text-green-600 dark:text-green-400',
    failed: 'text-red-600 dark:text-red-400',
    skipped: 'text-yellow-600 dark:text-yellow-400',
    running: 'text-blue-600 dark:text-blue-400',
  }

  const statusIcons: Record<TestStatusType, Component> = {
    passed: CheckCircle2,
    failed: XCircle,
    skipped: Circle,
    running: CircleDot,
  }
  </script>

  <template>
    <CollapsibleTrigger
      v-if="context"
      :class="cn(
        'group flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/50',
        props.class,
      )"
      v-bind="$attrs"
    >
      <ChevronRight
        class="size-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-90"
      />
      <span :class="cn('shrink-0', statusStyles[context.status])">
        <component
          :is="statusIcons[context.status]"
          :class="cn('size-4', context.status === 'running' && 'animate-pulse')"
        />
      </span>
      <span class="font-medium text-sm">
        <slot>{{ context.name }}</slot>
      </span>
    </CollapsibleTrigger>
  </template>
  ```

  ```vue [TestSuiteContent.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { CollapsibleContent } from '@repo/shadcn-vue/components/ui/collapsible'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  type TestSuiteContentProps = InstanceType<typeof CollapsibleContent>['$props']

  interface Props extends /* @vue-ignore */ TestSuiteContentProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <CollapsibleContent
      :class="cn('border-t', props.class)"
      v-bind="$attrs"
    >
      <div class="divide-y">
        <slot />
      </div>
    </CollapsibleContent>
  </template>
  ```

  ```vue [TestSuiteStats.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    passed?: number
    failed?: number
    skipped?: number
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    passed: 0,
    failed: 0,
    skipped: 0,
  })
  </script>

  <template>
    <div
      :class="cn('ml-auto flex items-center gap-2 text-xs', props.class)"
      v-bind="$attrs"
    >
      <slot>
        <span
          v-if="props.passed > 0"
          class="text-green-600 dark:text-green-400"
        >
          {{ props.passed }} passed
        </span>
        <span
          v-if="props.failed > 0"
          class="text-red-600 dark:text-red-400"
        >
          {{ props.failed }} failed
        </span>
        <span
          v-if="props.skipped > 0"
          class="text-yellow-600 dark:text-yellow-400"
        >
          {{ props.skipped }} skipped
        </span>
      </slot>
    </div>
  </template>
  ```

  ```vue [Test.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import type { TestStatusType } from './context'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed, provide, reactive } from 'vue'
  import { TestContextKey } from './context'
  import TestDuration from './TestDuration.vue'
  import TestName from './TestName.vue'
  import TestStatus from './TestStatus.vue'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    name: string
    status: TestStatusType
    duration?: number
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const context = reactive({
    name: computed(() => props.name),
    status: computed(() => props.status),
    duration: computed(() => props.duration),
  })

  provide(TestContextKey, context)
  </script>

  <template>
    <div
      :class="cn('flex items-center gap-2 px-4 py-2 text-sm', props.class)"
      v-bind="$attrs"
    >
      <slot>
        <TestStatus />
        <TestName />
        <TestDuration v-if="props.duration !== undefined" />
      </slot>
    </div>
  </template>
  ```

  ```vue [TestStatus.vue] height=500 collapse
  <script setup lang="ts">
  import type { Component, HTMLAttributes } from 'vue'
  import type { TestStatusType } from './context'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import {
    CheckCircle2,
    Circle,
    CircleDot,
    XCircle,
  } from 'lucide-vue-next'
  import { useTestContext } from './context'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const { status } = useTestContext()

  const statusStyles: Record<TestStatusType, string> = {
    passed: 'text-green-600 dark:text-green-400',
    failed: 'text-red-600 dark:text-red-400',
    skipped: 'text-yellow-600 dark:text-yellow-400',
    running: 'text-blue-600 dark:text-blue-400',
  }

  const statusIcons: Record<TestStatusType, Component> = {
    passed: CheckCircle2,
    failed: XCircle,
    skipped: Circle,
    running: CircleDot,
  }
  </script>

  <template>
    <span
      v-if="status"
      :class="cn('shrink-0', status ? statusStyles[status] : '', props.class)"
      v-bind="$attrs"
    >
      <slot>
        <component
          :is="statusIcons[status]"
          :class="cn('size-4', status === 'running' && 'animate-pulse')"
        />
      </slot>
    </span>
  </template>
  ```

  ```vue [TestName.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { useTestContext } from './context'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const { name } = useTestContext()
  </script>

  <template>
    <span
      v-if="name"
      :class="cn('flex-1', props.class)"
      v-bind="$attrs"
    >
      <slot>{{ name }}</slot>
    </span>
  </template>
  ```

  ```vue [TestDuration.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { useTestContext } from './context'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const { duration } = useTestContext()
  </script>

  <template>
    <span
      v-if="duration !== undefined"
      :class="cn('ml-auto text-muted-foreground text-xs', props.class)"
      v-bind="$attrs"
    >
      <slot>{{ duration }}ms</slot>
    </span>
  </template>
  ```

  ```vue [TestError.vue]
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
      :class="cn('mt-2 rounded-md bg-red-50 p-3 dark:bg-red-900/20', props.class)"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [TestErrorMessage.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <p
      :class="cn('font-medium text-red-700 text-sm dark:text-red-400', props.class)"
      v-bind="$attrs"
    >
      <slot />
    </p>
  </template>
  ```

  ```vue [TestErrorStack.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <pre
      :class="cn(
        'mt-2 overflow-auto font-mono text-red-600 text-xs dark:text-red-400',
        props.class,
      )"
      v-bind="$attrs"
    ><slot /></pre>
  </template>
  ```

  ```ts [context.ts] height=500 collapse
  import type { InjectionKey } from 'vue'
  import { inject } from 'vue'

  export type TestStatusType = 'passed' | 'failed' | 'skipped' | 'running'

  export interface TestResultsSummaryData {
    passed: number
    failed: number
    skipped: number
    total: number
    duration?: number
  }

  export interface TestResultsContextType {
    summary?: TestResultsSummaryData
  }

  export interface TestSuiteContextType {
    name: string
    status: TestStatusType
  }

  export interface TestContextType {
    name: string
    status: TestStatusType
    duration?: number
  }

  export const TestResultsContextKey: InjectionKey<TestResultsContextType> = Symbol('TestResultsContext')

  export const TestSuiteContextKey: InjectionKey<TestSuiteContextType> = Symbol('TestSuiteContext')

  export const TestContextKey: InjectionKey<TestContextType> = Symbol('TestContext')

  export function useTestResultsContext() {
    const context = inject(TestResultsContextKey)
    if (!context) {
      throw new Error('useTestResultsContext must be used within a <TestResults> component')
    }
    return context
  }

  export function useTestSuiteContext() {
    const context = inject(TestSuiteContextKey)
    if (!context) {
      throw new Error('useTestSuiteContext must be used within a <TestSuite> component')
    }
    return context
  }

  export function useTestContext() {
    const context = inject(TestContextKey)
    if (!context) {
      throw new Error('useTestContext must be used within a <Test> component')
    }
    return context
  }
  ```

  ```ts [index.ts]
  export type {
    TestContextType,
    TestResultsContextType,
    TestResultsSummaryData,
    TestStatusType,
    TestSuiteContextType,
  } from './context'
  export { default as Test } from './Test.vue'
  export { default as TestDuration } from './TestDuration.vue'
  export { default as TestError } from './TestError.vue'
  export { default as TestErrorMessage } from './TestErrorMessage.vue'
  export { default as TestErrorStack } from './TestErrorStack.vue'
  export { default as TestName } from './TestName.vue'
  export { default as TestResults } from './TestResults.vue'
  export { default as TestResultsContent } from './TestResultsContent.vue'
  export { default as TestResultsDuration } from './TestResultsDuration.vue'
  export { default as TestResultsHeader } from './TestResultsHeader.vue'
  export { default as TestResultsProgress } from './TestResultsProgress.vue'
  export { default as TestResultsSummary } from './TestResultsSummary.vue'
  export { default as TestStatus } from './TestStatus.vue'
  export { default as TestSuite } from './TestSuite.vue'
  export { default as TestSuiteContent } from './TestSuiteContent.vue'
  export { default as TestSuiteName } from './TestSuiteName.vue'
  export { default as TestSuiteStats } from './TestSuiteStats.vue'
  ```

:::

## Features

- Summary statistics (passed/failed/skipped)
- Progress bar visualization
- Collapsible test suites
- Individual test status and duration
- Error messages with stack traces
- Color-coded status indicators

## Status Colors

| Status | Color | Use Case |
|--------|-------|----------|
| `passed` | Green | Test succeeded |
| `failed` | Red | Test failed |
| `skipped` | Yellow | Test skipped |
| `running` | Blue (animated) | Test in progress |

## Examples

### Basic Usage

:::ComponentLoader{label="Preview" componentName="TestResultsBasic"}
:::

### With Test Suites

:::ComponentLoader{label="Preview" componentName="TestResultsSuites"}
:::

### With Error Details

:::ComponentLoader{label="Preview" componentName="TestResultsErrors"}
:::

## Props

### `<TestResults />`

:::field-group
  ::field{name="summary" type="TestResultsSummaryData"}
  Test results summary containing `passed`, `failed`, `skipped`, `total`, and optional `duration`.
  ::

  ::field{name="...props" type="HTMLAttributes"}
  Additional props forwarded to the root `<div>` element.
  ::
:::

### `<TestSuite />`

:::field-group
  ::field{name="name" type="string" required}
  Suite name.
  ::

  ::field{name="status" type="'passed' | 'failed' | 'skipped' | 'running'" required}
  Overall suite status.
  ::

  ::field{name="defaultOpen" type="boolean" default="false"}
  Initially expanded.
  ::
:::

### `<Test />`

:::field-group
  ::field{name="name" type="string" required}
  Test name.
  ::

  ::field{name="status" type="'passed' | 'failed' | 'skipped' | 'running'" required}
  Test status.
  ::

  ::field{name="duration" type="number"}
  Test duration in ms.
  ::
:::

### `<TestResultsHeader />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Additional props forwarded to the header `<div>` element.
  ::
:::

### `<TestResultsSummary />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Additional props forwarded to the summary `<div>` element.
  ::
:::

### `<TestResultsDuration />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Additional props forwarded to the duration `<span>` element.
  ::
:::

### `<TestResultsProgress />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Additional props forwarded to the progress `<div>` element.
  ::
:::

### `<TestResultsContent />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Additional props forwarded to the content `<div>` element.
  ::
:::

### `<TestSuiteName />`

:::field-group
  ::field{name="...props" type="CollapsibleTriggerProps"}
  Additional props forwarded to the CollapsibleTrigger component.
  ::
:::

### `<TestSuiteStats />`

:::field-group
  ::field{name="passed" type="number" default="0"}
  Number of passed tests.
  ::

  ::field{name="failed" type="number" default="0"}
  Number of failed tests.
  ::

  ::field{name="skipped" type="number" default="0"}
  Number of skipped tests.
  ::

  ::field{name="...props" type="HTMLAttributes"}
  Additional props forwarded to the stats `<div>` element.
  ::
:::

### `<TestSuiteContent />`

:::field-group
  ::field{name="...props" type="CollapsibleContentProps"}
  Additional props forwarded to the CollapsibleContent component.
  ::
:::

### `<TestStatus />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Additional props forwarded to the status `<span>` element.
  ::
:::

### `<TestName />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Additional props forwarded to the name `<span>` element.
  ::
:::

### `<TestDuration />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Additional props forwarded to the duration `<span>` element.
  ::
:::

### `<TestError />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Additional props forwarded to the error container `<div>` element.
  ::
:::

### `<TestErrorMessage />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Additional props forwarded to the error message `<p>` element.
  ::
:::

### `<TestErrorStack />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Additional props forwarded to the stack trace `<pre>` element.
  ::
:::
