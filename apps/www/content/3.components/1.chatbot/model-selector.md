---
title: Model Selector
description: A searchable command palette for selecting AI models in your chat interface.
icon: lucide:square-mouse-pointer
---

The `Model Selector` component provides a searchable command palette interface for selecting AI models. It's built on top of the cmdk library and provides a keyboard-navigable interface with search functionality.

:::ComponentLoader{label="Preview" componentName="ModelSelector"}
:::

## Install using CLI

::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add model-selector
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/model-selector.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

:::code-group
```vue [ModelSelector.vue] height=260 collapse
<script setup lang="ts">
import { Dialog } from '@repo/shadcn-vue/components/ui/dialog'
</script>

<template>
  <Dialog v-bind="$attrs">
    <slot />
  </Dialog>
</template>
```

```vue [ModelSelectorTrigger.vue] height=260 collapse
<script setup lang="ts">
import { DialogTrigger } from '@repo/shadcn-vue/components/ui/dialog'
</script>

<template>
  <DialogTrigger v-bind="$attrs">
    <slot />
  </DialogTrigger>
</template>
```

```vue [ModelSelectorContent.vue] height=260 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Command } from '@repo/shadcn-vue/components/ui/command'
import { DialogContent, DialogTitle } from '@repo/shadcn-vue/components/ui/dialog'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  title?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Model Selector',
})
</script>

<template>
  <DialogContent
    :class="cn('p-0', props.class)"
    v-bind="$attrs"
  >
    <DialogTitle class="sr-only">
      {{ title }}
    </DialogTitle>
    <Command class="**:data-[slot=command-input-wrapper]:h-auto">
      <slot />
    </Command>
  </DialogContent>
</template>
```

```vue [ModelSelectorDialog.vue] height=260 collapse
<script setup lang="ts">
import { CommandDialog } from '@repo/shadcn-vue/components/ui/command'
</script>

<template>
  <CommandDialog v-bind="$attrs">
    <slot />
  </CommandDialog>
</template>
```

```vue [ModelSelectorInput.vue] height=260 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CommandInput } from '@repo/shadcn-vue/components/ui/command'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <CommandInput
    :class="cn('h-auto py-3.5', props.class)"
    v-bind="$attrs"
  />
</template>
```

```vue [ModelSelectorList.vue] height=260 collapse
<script setup lang="ts">
import { CommandList } from '@repo/shadcn-vue/components/ui/command'
</script>

<template>
  <CommandList v-bind="$attrs">
    <slot />
  </CommandList>
</template>
```

```vue [ModelSelectorEmpty.vue] height=260 collapse
<script setup lang="ts">
import { CommandEmpty } from '@repo/shadcn-vue/components/ui/command'
</script>

<template>
  <CommandEmpty v-bind="$attrs">
    <slot />
  </CommandEmpty>
</template>
```

```vue [ModelSelectorGroup.vue] height=260 collapse
<script setup lang="ts">
import { CommandGroup } from '@repo/shadcn-vue/components/ui/command'
</script>

<template>
  <CommandGroup v-bind="$attrs">
    <slot />
  </CommandGroup>
</template>
```

```vue [ModelSelectorItem.vue] height=260 collapse
<script setup lang="ts">
import { CommandItem } from '@repo/shadcn-vue/components/ui/command'
</script>

<template>
  <CommandItem v-bind="$attrs">
    <slot />
  </CommandItem>
</template>
```

```vue [ModelSelectorShortcut.vue] height=260 collapse
<script setup lang="ts">
import { CommandShortcut } from '@repo/shadcn-vue/components/ui/command'
</script>

<template>
  <CommandShortcut v-bind="$attrs">
    <slot />
  </CommandShortcut>
</template>
```

```vue [ModelSelectorSeparator.vue] height=260 collapse
<script setup lang="ts">
import { CommandSeparator } from '@repo/shadcn-vue/components/ui/command'
</script>

<template>
  <CommandSeparator v-bind="$attrs" />
</template>
```

```vue [ModelSelectorLogo.vue] height=260 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  provider: string
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <img
    v-bind="$attrs"
    :alt="`${props.provider} logo`"
    :class="cn('size-3 dark:invert', props.class)"
    height="12"
    :src="`https://models.dev/logos/${props.provider}.svg`"
    width="12"
  >
</template>
```

```vue [ModelSelectorLogoGroup.vue] height=260 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="
      cn(
        '-space-x-1 flex shrink-0 items-center [&>img]:rounded-full [&>img]:bg-background [&>img]:p-px [&>img]:ring-1 dark:[&>img]:bg-foreground',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
```

```vue [ModelSelectorName.vue] height=260 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <span
    :class="cn('flex-1 truncate text-left', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </span>
</template>
```

```ts [index.ts] height=260 collapse
export { default as ModelSelector } from './ModelSelector.vue'
export { default as ModelSelectorContent } from './ModelSelectorContent.vue'
export { default as ModelSelectorDialog } from './ModelSelectorDialog.vue'
export { default as ModelSelectorEmpty } from './ModelSelectorEmpty.vue'
export { default as ModelSelectorGroup } from './ModelSelectorGroup.vue'
export { default as ModelSelectorInput } from './ModelSelectorInput.vue'
export { default as ModelSelectorItem } from './ModelSelectorItem.vue'
export { default as ModelSelectorList } from './ModelSelectorList.vue'
export { default as ModelSelectorLogo } from './ModelSelectorLogo.vue'
export { default as ModelSelectorLogoGroup } from './ModelSelectorLogoGroup.vue'
export { default as ModelSelectorName } from './ModelSelectorName.vue'
export { default as ModelSelectorSeparator } from './ModelSelectorSeparator.vue'
export { default as ModelSelectorShortcut } from './ModelSelectorShortcut.vue'
export { default as ModelSelectorTrigger } from './ModelSelectorTrigger.vue'
```
:::

## Features

- Searchable interface with keyboard navigation
- Fuzzy search filtering across model names
- Grouped model organization by provider
- Keyboard shortcuts support
- Empty state handling
- Customizable styling with Tailwind CSS
- Built on cmdk for excellent accessibility
- Support for both inline and dialog modes
- TypeScript support with proper type definitions

## Props

### `<ModelSelectorContent />`

:::field-group
  ::field{name="title" type="string" defaultValue="'Model Selector'"}
  Title of the model selector.
  ::

  ::field{name="class" type="string"}
  Additional classes applied to the component.
  ::
:::

### `<ModelSelectorInput />`

:::field-group
  ::field{name="class" type="string"}
  Additional classes applied to the component.
  ::
:::

### `<ModelSelectorLogo />`

:::field-group
  ::field{name="provider" type="string"}
  The AI provider name. Supports major providers like "openai", "anthropic", "google", "mistral", etc.
  ::

  ::field{name="class" type="string"}
  Additional classes applied to the component.
  ::
:::

### `<ModelSelectorLogoGroup />`

:::field-group
  ::field{name="class" type="string"}
  Additional classes applied to the component.
  ::
:::

### `<ModelSelectorName />`

:::field-group
  ::field{name="class" type="string"}
  Additional classes applied to the component.
  ::
:::
