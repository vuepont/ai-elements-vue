---
title: Environment Variables
description: Display environment variables with masking and copy functionality.
icon: lucide:key
---

The `EnvironmentVariables` component displays environment variables with value masking, visibility toggle, and copy functionality.

:::ComponentLoader{label="Preview" componentName="EnvironmentVariables"}
:::

## Install using CLI

:::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add environment-variables
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/environment-variables.json
  ```
  ::
:::

## Install Manually

Copy and paste the following files into the same folder.

:::code-group
  ```vue [EnvironmentVariables.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { provide, ref, watch } from 'vue'
  import { EnvironmentVariablesKey } from './context'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    showValues?: boolean
    defaultShowValues?: boolean
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    showValues: undefined,
    defaultShowValues: false,
  })

  const emit = defineEmits<{
    (e: 'update:showValues', value: boolean): void
  }>()

  const internalShowValues = ref(props.defaultShowValues)

  // Use controlled prop if present, otherwise use internal state
  const showValues = ref(props.showValues !== undefined ? props.showValues : internalShowValues.value)

  watch(
    () => props.showValues,
    (newVal) => {
      if (newVal !== undefined) {
        showValues.value = newVal
      }
    },
  )

  function setShowValues(show: boolean) {
    if (props.showValues === undefined) {
      internalShowValues.value = show
      showValues.value = show
    }
    emit('update:showValues', show)
  }

  provide(EnvironmentVariablesKey, {
    showValues,
    setShowValues,
  })
  </script>

  <template>
    <div
      :class="cn('rounded-lg border bg-background', props.class)"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [EnvironmentVariablesHeader.vue]
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
      :class="
        cn(
          'flex items-center justify-between border-b px-4 py-3',
          props.class,
        )
      "
      v-bind="$attrs"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [EnvironmentVariablesTitle.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <h3 :class="cn('font-medium text-sm', props.class)" v-bind="$attrs">
      <slot>Environment Variables</slot>
    </h3>
  </template>
  ```

  ```vue [EnvironmentVariablesToggle.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { Switch } from '@repo/shadcn-vue/components/ui/switch'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
  import { inject } from 'vue'
  import { EnvironmentVariablesKey } from './context'

  type SwitchProps = InstanceType<typeof Switch>['$props']

  interface Props extends /* @vue-ignore */ SwitchProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const context = inject(EnvironmentVariablesKey)

  if (!context) {
    throw new Error('EnvironmentVariablesToggle must be used within EnvironmentVariables')
  }

  const { showValues, setShowValues } = context
  </script>

  <template>
    <div :class="cn('flex items-center gap-2', props.class)">
      <span class="text-muted-foreground text-xs">
        <EyeIcon v-if="showValues" :size="14" />
        <EyeOffIcon v-else :size="14" />
      </span>
      <Switch
        aria-label="Toggle value visibility"
        :checked="showValues"
        v-bind="$attrs"
        @update:checked="setShowValues"
      />
    </div>
  </template>
  ```

  ```vue [EnvironmentVariablesContent.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <div :class="cn('divide-y', props.class)" v-bind="$attrs">
      <slot />
    </div>
  </template>
  ```

  ```vue [EnvironmentVariable.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { provide } from 'vue'
  import { EnvironmentVariableKey } from './context'
  import EnvironmentVariableName from './EnvironmentVariableName.vue'
  import EnvironmentVariableValue from './EnvironmentVariableValue.vue'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    name: string
    value: string
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  provide(EnvironmentVariableKey, {
    name: props.name,
    value: props.value,
  })
  </script>

  <template>
    <div
      :class="
        cn(
          'flex items-center justify-between gap-4 px-4 py-3',
          props.class,
        )
      "
      v-bind="$attrs"
    >
      <slot>
        <div class="flex items-center gap-2">
          <EnvironmentVariableName />
        </div>
        <EnvironmentVariableValue />
      </slot>
    </div>
  </template>
  ```

  ```vue [EnvironmentVariableGroup.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <div :class="cn('flex items-center gap-2', props.class)" v-bind="$attrs">
      <slot />
    </div>
  </template>
  ```

  ```vue [EnvironmentVariableName.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { inject } from 'vue'
  import { EnvironmentVariableKey } from './context'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const context = inject(EnvironmentVariableKey)

  if (!context) {
    throw new Error('EnvironmentVariableName must be used within EnvironmentVariable')
  }

  const { name } = context
  </script>

  <template>
    <span :class="cn('font-mono text-sm', props.class)" v-bind="$attrs">
      <slot>{{ name }}</slot>
    </span>
  </template>
  ```

  ```vue [EnvironmentVariableValue.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed, inject } from 'vue'
  import { EnvironmentVariableKey, EnvironmentVariablesKey } from './context'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const variableContext = inject(EnvironmentVariableKey)
  const variablesContext = inject(EnvironmentVariablesKey)

  if (!variableContext || !variablesContext) {
    throw new Error('EnvironmentVariableValue must be used within EnvironmentVariable and EnvironmentVariables')
  }

  const { value } = variableContext
  const { showValues } = variablesContext

  const displayValue = computed(() => {
    return showValues.value
      ? value
      : '•'.repeat(Math.min(value.length, 20))
  })
  </script>

  <template>
    <span
      :class="
        cn(
          'font-mono text-muted-foreground text-sm',
          !showValues && 'select-none',
          props.class,
        )
      "
      v-bind="$attrs"
    >
      <slot>{{ displayValue }}</slot>
    </span>
  </template>
  ```

  ```vue [EnvironmentVariableCopyButton.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { Button } from '@repo/shadcn-vue/components/ui/button'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { CheckIcon, CopyIcon } from 'lucide-vue-next'
  import { computed, inject, ref } from 'vue'
  import { EnvironmentVariableKey } from './context'

  type ButtonProps = InstanceType<typeof Button>['$props']

  interface Props extends /* @vue-ignore */ ButtonProps {
    onCopy?: () => void
    onError?: (error: Error) => void
    timeout?: number
    copyFormat?: 'name' | 'value' | 'export'
    class?: HTMLAttributes['class']
  }

  const props = withDefaults(defineProps<Props>(), {
    timeout: 2000,
    copyFormat: 'value',
  })

  const emit = defineEmits<{
    (e: 'copy'): void
    (e: 'error', error: Error): void
  }>()

  const isCopied = ref(false)
  const context = inject(EnvironmentVariableKey)

  if (!context) {
    throw new Error('EnvironmentVariableCopyButton must be used within EnvironmentVariable')
  }

  const { name, value } = context

  const icon = computed(() => (isCopied.value ? CheckIcon : CopyIcon))

  async function copyToClipboard() {
    if (typeof window === 'undefined' || !navigator?.clipboard?.writeText) {
      const error = new Error('Clipboard API not available')
      props.onError?.(error)
      emit('error', error)
      return
    }

    let textToCopy = value
    if (props.copyFormat === 'name') {
      textToCopy = name
    }
    else if (props.copyFormat === 'export') {
      textToCopy = `export ${name}="${value}"`
    }

    try {
      await navigator.clipboard.writeText(textToCopy)
      isCopied.value = true
      props.onCopy?.()
      emit('copy')
      setTimeout(() => {
        isCopied.value = false
      }, props.timeout)
    }
    catch (error) {
      const err = error as Error
      props.onError?.(err)
      emit('error', err)
    }
  }
  </script>

  <template>
    <Button
      :class="cn('size-6 shrink-0', props.class)"
      size="icon"
      variant="ghost"
      v-bind="$attrs"
      @click="copyToClipboard"
    >
      <slot>
        <component :is="icon" :size="12" />
      </slot>
    </Button>
  </template>
  ```

  ```vue [EnvironmentVariableRequired.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { Badge } from '@repo/shadcn-vue/components/ui/badge'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  type BadgeProps = InstanceType<typeof Badge>['$props']

  interface Props extends /* @vue-ignore */ BadgeProps {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <Badge
      :class="cn('text-xs', props.class)"
      variant="secondary"
      v-bind="$attrs"
    >
      <slot>Required</slot>
    </Badge>
  </template>
  ```

  ```ts [context.ts]
  import type { InjectionKey, Ref } from 'vue'

  export interface EnvironmentVariablesContextValue {
    showValues: Ref<boolean>
    setShowValues: (show: boolean) => void
  }

  export const EnvironmentVariablesKey: InjectionKey<EnvironmentVariablesContextValue>
    = Symbol('EnvironmentVariables')

  export interface EnvironmentVariableContextValue {
    name: string
    value: string
  }

  export const EnvironmentVariableKey: InjectionKey<EnvironmentVariableContextValue>
    = Symbol('EnvironmentVariable')
  ```

  ```ts [index.ts]
  export { default as EnvironmentVariable } from './EnvironmentVariable.vue'
  export { default as EnvironmentVariableCopyButton } from './EnvironmentVariableCopyButton.vue'
  export { default as EnvironmentVariableGroup } from './EnvironmentVariableGroup.vue'
  export { default as EnvironmentVariableName } from './EnvironmentVariableName.vue'
  export { default as EnvironmentVariableRequired } from './EnvironmentVariableRequired.vue'
  export { default as EnvironmentVariables } from './EnvironmentVariables.vue'
  export { default as EnvironmentVariablesContent } from './EnvironmentVariablesContent.vue'
  export { default as EnvironmentVariablesHeader } from './EnvironmentVariablesHeader.vue'
  export { default as EnvironmentVariablesTitle } from './EnvironmentVariablesTitle.vue'
  export { default as EnvironmentVariablesToggle } from './EnvironmentVariablesToggle.vue'
  export { default as EnvironmentVariableValue } from './EnvironmentVariableValue.vue'
  ```

:::

## Features

- Value masking by default
- Toggle visibility switch
- Copy individual values
- Export format support (`export KEY="value"`)
- Required badge indicator

## Props

### `<EnvironmentVariables />`

:::field-group
  ::field{name="showValues" type="boolean"}
  Controlled visibility state.
  ::
  ::field{name="defaultShowValues" type="boolean" default="false"}
  Default visibility state.
  ::
  ::field{name="@update:showValues" type="(show: boolean) => void"}
  Callback when visibility changes.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the container div.
  ::
:::

### `<EnvironmentVariablesHeader />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the header div.
  ::
:::

### `<EnvironmentVariablesTitle />`

:::field-group
  ::field{name="default" type="Slot"}
  Custom title text. Defaults to "Environment Variables".
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the h3 element.
  ::
:::

### `<EnvironmentVariablesToggle />`

:::field-group
  ::field{name="...props" type="SwitchProps"}
  Spread to the Switch component.
  ::
:::

### `<EnvironmentVariablesContent />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the content div.
  ::
:::

### `<EnvironmentVariable />`

:::field-group
  ::field{name="name" type="string" required}
  Variable name.
  ::
  ::field{name="value" type="string" required}
  Variable value.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the row div.
  ::
:::

### `<EnvironmentVariableGroup />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the group div.
  ::
:::

### `<EnvironmentVariableName />`

:::field-group
  ::field{name="default" type="Slot"}
  Custom name content. Defaults to the name from context.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the span element.
  ::
:::

### `<EnvironmentVariableValue />`

:::field-group
  ::field{name="default" type="Slot"}
  Custom value content. Defaults to the masked/unmasked value from context.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the span element.
  ::
:::

### `<EnvironmentVariableCopyButton />`

:::field-group
  ::field{name="copyFormat" type='"name" | "value" | "export"' default='"value"'}
  Format to copy.
  ::
  ::field{name="@copy" type="() => void"}
  Callback after successful copy.
  ::
  ::field{name="@error" type="(error: Error) => void"}
  Callback if copying fails.
  ::
  ::field{name="timeout" type="number" default="2000"}
  Duration to show copied state (ms).
  ::
  ::field{name="...props" type="ButtonProps"}
  Spread to the Button component.
  ::
:::

### `<EnvironmentVariableRequired />`

:::field-group
  ::field{name="default" type="Slot"}
  Custom badge text. Defaults to "Required".
  ::
  ::field{name="...props" type="BadgeProps"}
  Spread to the Badge component.
  ::
:::
