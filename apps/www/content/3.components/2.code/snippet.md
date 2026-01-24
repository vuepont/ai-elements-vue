---
title: Snippet
description: Lightweight inline code display for terminal commands and short code references.
icon: lucide:terminal
---

The `Snippet` component provides a lightweight way to display terminal commands and short code snippets with copy functionality. Built on top of InputGroup, it's designed for brief code references in text.

:::ComponentLoader{label="Preview" componentName="Snippet"}
:::

## Install using CLI

:::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add snippet
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/snippet.json
  ```
  ::
:::

## Install Manually

Copy and paste the following files into the same folder.

:::code-group
  ```vue [Snippet.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { InputGroup } from '@repo/shadcn-vue/components/ui/input-group'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed, provide } from 'vue'
  import { SnippetKey } from './context'

  type InputGroupProps = InstanceType<typeof InputGroup>['$props']

  interface Props extends /* @vue-ignore */ InputGroupProps {
    code: string
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  provide(SnippetKey, {
    code: computed(() => props.code),
  })
  </script>

  <template>
    <InputGroup
      :class="cn('font-mono', props.class)"
      v-bind="$attrs"
    >
      <slot />
    </InputGroup>
  </template>
  ```

  ```vue [SnippetAddon.vue] height=500 collapse
  <script setup lang="ts">
  import { InputGroupAddon } from '@repo/shadcn-vue/components/ui/input-group'

  type InputGroupAddonProps = InstanceType<typeof InputGroupAddon>['$props']

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Props extends /* @vue-ignore */ InputGroupAddonProps {}

  const props = defineProps<Props>()
  </script>

  <template>
    <InputGroupAddon v-bind="props">
      <slot />
    </InputGroupAddon>
  </template>
  ```

  ```vue [SnippetText.vue] height=500 collapse
  <script setup lang="ts">
  import { InputGroupText } from '@repo/shadcn-vue/components/ui/input-group'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  type InputGroupTextProps = InstanceType<typeof InputGroupText>['$props']

  interface Props extends /* @vue-ignore */ InputGroupTextProps {}

  const props = defineProps<Props>()
  </script>

  <template>
    <InputGroupText
      :class="cn('pl-2 font-normal text-muted-foreground', props.class)"
      v-bind="$attrs"
    >
      <slot />
    </InputGroupText>
  </template>
  ```

  ```vue [SnippetInput.vue] height=500 collapse
  <script setup lang="ts">
  import { InputGroupInput } from '@repo/shadcn-vue/components/ui/input-group'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { useSnippetContext } from './context'

  type InputGroupInputProps = InstanceType<typeof InputGroupInput>['$props']

  interface Props extends /* @vue-ignore */ Omit<InputGroupInputProps, 'readonly' | 'modelValue' | 'value'> {}

  const props = defineProps<Props>()

  const { code } = useSnippetContext('SnippetInput')
  </script>

  <template>
    <InputGroupInput
      :class="cn('text-foreground', props.class)"
      readonly
      :model-value="code"
      v-bind="$attrs"
    />
  </template>
  ```

  ```vue [SnippetCopyButton.vue] height=500 collapse
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { InputGroupButton } from '@repo/shadcn-vue/components/ui/input-group'
  import { CheckIcon, CopyIcon } from 'lucide-vue-next'
  import { computed, onBeforeUnmount, ref } from 'vue'
  import { useSnippetContext } from './context'

  type InputGroupButtonProps = InstanceType<typeof InputGroupButton>['$props']

  interface Props extends /* @vue-ignore */ InputGroupButtonProps {
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

  const { code } = useSnippetContext('SnippetCopyButton')
  const isCopied = ref(false)
  const timeoutRef = ref<number>(0)

  const Icon = computed(() => (isCopied.value ? CheckIcon : CopyIcon))

  async function copyToClipboard() {
    if (typeof window === 'undefined' || !navigator?.clipboard?.writeText) {
      emit('error', new Error('Clipboard API not available'))
      return
    }

    try {
      if (!isCopied.value) {
        await navigator.clipboard.writeText(code.value)
        isCopied.value = true
        emit('copy')
        timeoutRef.value = window.setTimeout(
          () => (isCopied.value = false),
          props.timeout,
        )
      }
    }
    catch (error) {
      emit('error', error as Error)
    }
  }

  onBeforeUnmount(() => {
    window.clearTimeout(timeoutRef.value)
  })
  </script>

  <template>
    <InputGroupButton
      aria-label="Copy"
      size="icon-sm"
      title="Copy"
      :class="props.class"
      v-bind="$attrs"
      @click="copyToClipboard"
    >
      <slot>
        <component :is="Icon" class="size-3.5" :size="14" />
      </slot>
    </InputGroupButton>
  </template>
  ```

  ```ts [context.ts]
  import type { ComputedRef, InjectionKey } from 'vue'
  import { inject } from 'vue'

  export interface SnippetContextValue {
    code: ComputedRef<string>
  }

  export const SnippetKey: InjectionKey<SnippetContextValue> = Symbol('Snippet')

  export function useSnippetContext(componentName: string): SnippetContextValue {
    const context = inject(SnippetKey)

    if (!context) {
      throw new Error(`${componentName} must be used within Snippet`)
    }

    return context
  }
  ```

  ```ts [index.ts]
  export { default as Snippet } from './Snippet.vue'
  export { default as SnippetAddon } from './SnippetAddon.vue'
  export { default as SnippetCopyButton } from './SnippetCopyButton.vue'
  export { default as SnippetInput } from './SnippetInput.vue'
  export { default as SnippetText } from './SnippetText.vue'
  ```

:::

## Features

- Composable architecture with InputGroup
- Optional prefix text (e.g., `$` for terminal commands)
- Built-in copy button
- Compact design for chat/markdown

## Examples

### Without Prefix

:::ComponentLoader{label="Plain" componentName="SnippetPlain"}
:::

## Props

### `<Snippet />`

:::field-group
  ::field{name="code" type="string" required}
  The code content to display.
  ::
  ::field{name="[...props]" type="InputGroupProps"}
  Additional props forwarded to the underlying [shadcn-vue/ui InputGroup](https://www.shadcn-vue.com/docs/components/input-group.html) component.
  ::
:::

### `<SnippetAddon />`

:::field-group
  ::field{name="[...props]" type="InputGroupAddonProps"}
  Additional props forwarded to the underlying [shadcn-vue/ui InputGroupAddon](https://www.shadcn-vue.com/docs/components/input-group.html) component.
  ::
:::

### `<SnippetText />`

:::field-group
  ::field{name="[...props]" type="InputGroupTextProps"}
  Additional props forwarded to the underlying [shadcn-vue/ui InputGroupText](https://www.shadcn-vue.com/docs/components/input-group.html) component.
  ::
:::

### `<SnippetInput />`

:::field-group
  ::field{name="[...props]" type="InputGroupInputProps"}
  Additional props forwarded to the underlying [shadcn-vue/ui InputGroupInput](https://www.shadcn-vue.com/docs/components/input-group.html) component. Value and readOnly are set automatically.
  ::
:::

### `<SnippetCopyButton />`

:::field-group
  ::field{name="timeout" type="number" default="2000"}
  How long to show the copied state (ms).
  ::
  ::field{name="@copy" type="() => void"}
  Callback fired after a successful copy.
  ::
  ::field{name="@error" type="(error: Error) => void"}
  Callback fired if copying fails.
  ::
  ::field{name="[...props]" type="InputGroupButtonProps"}
  Additional props forwarded to the underlying [shadcn-vue/ui InputGroupButton](https://www.shadcn-vue.com/docs/components/input-group.html) component.
  ::
:::
