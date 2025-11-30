---
title: 工件
description: 一个容器组件，用于显示生成的内容，如代码、文档或其他输出，具有内置操作。
icon: lucide:file-text
---

`Artifact` 组件提供了一个结构化容器，用于显示生成的内容，如代码、文档或其他输出，具有内置的标题操作。

## Install using CLI

:::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add artifact
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/artifact.json
  ```
  ::
:::

## Install Manually

Copy and paste the following code in the same folder.

:::code-group
  ```vue [Artifact.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed, useAttrs } from 'vue'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()

  const classes = computed(() => cn(
    'flex flex-col overflow-hidden rounded-lg border bg-background shadow-sm',
    props.class,
  ))
  const attrs = useAttrs()
  </script>

  <template>
    <div
      :class="classes"
      v-bind="attrs"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [ArtifactAction.vue]
  <script setup lang="ts">
  import type { ButtonVariants } from '@repo/shadcn-vue/components/ui/button'
  import type { LucideIcon } from 'lucide-vue-next'
  import { Button } from '@repo/shadcn-vue/components/ui/button'
  import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/shadcn-vue/components/ui/tooltip'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed } from 'vue'

  interface ArtifactActionProps {
    class?: string
    tooltip?: string
    label?: string
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
    icon?: LucideIcon
  }

  const props = withDefaults(defineProps<ArtifactActionProps>(), {
    variant: 'ghost',
    size: 'sm',
  })

  const classes = computed(() => cn(
    'size-8 p-0 text-muted-foreground hover:text-foreground',
    props.class,
  ))
  </script>

  <template>
    <TooltipProvider v-if="props.tooltip">
      <Tooltip>
        <TooltipTrigger as-child>
          <Button
            type="button"
            v-bind="{
              ...props,
              class: classes,
            }"
          >
            <component
              :is="props.icon"
              v-if="props.icon"
              class="size-4"
            />
            <slot v-else />
            <span class="sr-only">{{ props.label || props.tooltip }}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{{ props.tooltip }}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>

    <Button
      v-else
      type="button"
      v-bind="{
        ...props,
        class: classes,
      }"
    >
      <component
        :is="props.icon"
        v-if="props.icon"
        class="size-4"
      />
      <slot v-else />
      <span class="sr-only">{{ props.label || props.tooltip }}</span>
    </Button>
  </template>
  ```

  ```vue [ArtifactActions.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed, useAttrs } from 'vue'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  const attrs = useAttrs()
  const classes = computed(() => cn('flex items-center gap-1', props.class))
  </script>

  <template>
    <div
      :class="classes"
      v-bind="attrs"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [ArtifactClose.vue]
  <script setup lang="ts">
  import type { ButtonVariants } from '@repo/shadcn-vue/components/ui/button'
  import { Button } from '@repo/shadcn-vue/components/ui/button'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { X } from 'lucide-vue-next'
  import { computed } from 'vue'

  interface ArtifactCloseProps {
    class?: string
    variant?: ButtonVariants['variant']
    size?: ButtonVariants['size']
  }

  const props = withDefaults(defineProps<ArtifactCloseProps>(), {
    variant: 'ghost',
    size: 'sm',
  })

  const classes = computed(() => cn(
    'size-8 p-0 text-muted-foreground hover:text-foreground',
    props.class,
  ))
  </script>

  <template>
    <Button
      type="button"
      v-bind="{
        ...props,
        class: classes,
      }"
    >
      <slot>
        <X class="size-4" />
      </slot>
      <span class="sr-only">Close</span>
    </Button>
  </template>
  ```

  ```vue [ArtifactContent.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed, useAttrs } from 'vue'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  const attrs = useAttrs()

  const classes = computed(() => cn('flex-1 overflow-auto p-4', props.class))
  </script>

  <template>
    <div
      :class="classes"
      v-bind="attrs"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [ArtifactDescription.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed, useAttrs } from 'vue'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  const attrs = useAttrs()

  const classes = computed(() => cn('text-muted-foreground text-sm', props.class))
  </script>

  <template>
    <p
      :class="classes"
      v-bind="attrs"
    >
      <slot />
    </p>
  </template>
  ```

  ```vue [ArtifactHeader.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed, useAttrs } from 'vue'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()

  const classes = computed(() => cn(
    'flex items-center justify-between border-b bg-muted/50 px-4 py-3',
    props.class,
  ))
  const attrs = useAttrs()
  </script>

  <template>
    <div
      :class="classes"
      v-bind="attrs"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [ArtifactTitle.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed, useAttrs } from 'vue'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()

  const classes = computed(() => cn('font-medium text-foreground text-sm', props.class))
  const attrs = useAttrs()
  </script>

  <template>
    <p
      v-bind="attrs"
      :class="classes"
    >
      <slot />
    </p>
  </template>
  ```

  ```ts [index.ts]
  export { default as Artifact } from './Artifact.vue'
  export { default as ArtifactAction } from './ArtifactAction.vue'
  export { default as ArtifactActions } from './ArtifactActions.vue'
  export { default as ArtifactClose } from './ArtifactClose.vue'
  export { default as ArtifactContent } from './ArtifactContent.vue'
  export { default as ArtifactDescription } from './ArtifactDescription.vue'
  export { default as ArtifactHeader } from './ArtifactHeader.vue'
  export { default as ArtifactTitle } from './ArtifactTitle.vue'
  ```

:::

## Features

- Structured container with header and content areas
- Built-in header with title and description support
- Flexible action buttons with tooltips
- Customizable styling for all subcomponents
- Support for close buttons and action groups
- Clean, modern design with border and shadow
- Responsive layout that adapts to content
- TypeScript support with proper type definitions
- Composable architecture for maximum flexibility

## Examples

### With Code Display

:::ComponentLoader{label="Artifact" componentName="Artifact"}
:::

## Props

### `<Artifact />`

:::field-group
  ::field{name="[...props]" type="HTMLAttributes"}
  Additional props forwarded to the root `<div>` element.
  ::
:::

### `<ArtifactHeader />`

:::field-group
  ::field{name="[...props]" type="HTMLAttributes"}
  Additional props forwarded to the header `<div>` element.
  ::
:::

### `<ArtifactTitle />`

:::field-group
  ::field{name="[...props]" type="HTMLAttributes"}
  Additional props forwarded to the title `<p>` element.
  ::
:::

### `<ArtifactDescription />`

:::field-group
  ::field{name="[...props]" type="HTMLAttributes"}
  Additional props forwarded to the description `<p>` element.
  ::
:::

### `<ArtifactActions />`

:::field-group
  ::field{name="[...props]" type="HTMLAttributes"}
  Additional props forwarded to the actions `<div>` element.
  ::
:::

### `<ArtifactAction />`

:::field-group
  ::field{name="tooltip" type="string"}
  Tooltip text shown when hovering the action button.
  ::

  ::field{name="label" type="string"}
  Screen reader label used for accessible button text.
  ::

  ::field{name="icon" type="LucideIcon"}
  Lucide icon component rendered inside the action button.
  ::

  ::field{name="[...props]" type="ButtonProps"}
  Additional props forwarded to the underlying shadcn-vue `Button`.
  ::
:::

### `<ArtifactClose />`

:::field-group
  ::field{name="[...props]" type="ButtonProps"}
  Additional props forwarded to the underlying shadcn-vue `Button`.
  ::
:::

### `<ArtifactContent />`

:::field-group
  ::field{name="[...props]" type="HTMLAttributes"}
  Additional props forwarded to the content `<div>` element.
  ::
:::
