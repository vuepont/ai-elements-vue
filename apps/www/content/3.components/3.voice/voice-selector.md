---
title: Voice Selector
description: A composable dialog component for selecting AI voices with metadata display and search functionality.
icon: lucide:user-round
---

The `VoiceSelector` component provides a flexible and composable interface for selecting AI voices. Built on shadcn-vue's Dialog and Command components, it features a searchable voice list with support for metadata display (gender, accent, age), grouping, and customizable layouts. The component includes a context provider for accessing voice selection state from any nested component.

:::ComponentLoader{label="Preview" componentName="VoiceSelector"}
:::

## Installation

::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add voice-selector
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/voice-selector.json
  ```
  ::
::

## Manual Installation

Copy and paste the following code into your project.

:::code-group
```vue [VoiceSelector.vue] height=500 collapse
<script setup lang="ts">
import { Dialog } from '@repo/shadcn-vue/components/ui/dialog'
import { useVModel } from '@vueuse/core'
import { provide } from 'vue'
import { VOICE_SELECTOR_CONTEXT_KEY } from './types'

interface Props {
  value?: string
  defaultValue?: string
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  open: undefined,
  defaultOpen: false,
  modal: true,
})

const emit = defineEmits<{
  (e: 'update:value', value: string | undefined): void
  (e: 'update:open', open: boolean): void
  (e: 'valueChange', value: string | undefined): void
  (e: 'openChange', open: boolean): void
}>()

const value = useVModel(props, 'value', emit, {
  defaultValue: props.defaultValue,
  passive: (props.value === undefined) as any,
})

const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: (props.open === undefined) as any,
})

function setValue(newValue: string | undefined) {
  value.value = newValue
  emit('valueChange', newValue)
}

function setOpen(newOpen: boolean) {
  open.value = newOpen
  emit('openChange', newOpen)
}

provide(VOICE_SELECTOR_CONTEXT_KEY, {
  value,
  setValue,
  open,
  setOpen,
})
</script>

<template>
  <Dialog
    :open="open"
    :modal="modal"
    @update:open="setOpen"
  >
    <slot />
  </Dialog>
</template>
```

```vue [VoiceSelectorTrigger.vue] height=500 collapse
<script setup lang="ts">
import { DialogTrigger } from '@repo/shadcn-vue/components/ui/dialog'

interface Props {
  asChild?: boolean
}

defineProps<Props>()
</script>

<template>
  <DialogTrigger :as-child="asChild">
    <slot />
  </DialogTrigger>
</template>
```

```vue [VoiceSelectorContent.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Command } from '@repo/shadcn-vue/components/ui/command'
import {
  DialogContent,
  DialogTitle,
} from '@repo/shadcn-vue/components/ui/dialog'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Voice Selector',
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

```vue [VoiceSelectorDialog.vue] height=500 collapse
<script setup lang="ts">
import { CommandDialog } from '@repo/shadcn-vue/components/ui/command'
</script>

<template>
  <CommandDialog v-bind="$attrs">
    <slot />
  </CommandDialog>
</template>
```

```vue [VoiceSelectorInput.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CommandInput } from '@repo/shadcn-vue/components/ui/command'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
  placeholder?: string
}

const props = defineProps<Props>()
</script>

<template>
  <CommandInput
    :class="cn('h-auto py-3.5', props.class)"
    :placeholder="placeholder"
    v-bind="$attrs"
  />
</template>
```

```vue [VoiceSelectorList.vue] height=500 collapse
<script setup lang="ts">
import { CommandList } from '@repo/shadcn-vue/components/ui/command'
</script>

<template>
  <CommandList v-bind="$attrs">
    <slot />
  </CommandList>
</template>
```

```vue [VoiceSelectorEmpty.vue] height=500 collapse
<script setup lang="ts">
import { CommandEmpty } from '@repo/shadcn-vue/components/ui/command'
</script>

<template>
  <CommandEmpty v-bind="$attrs">
    <slot />
  </CommandEmpty>
</template>
```

```vue [VoiceSelectorGroup.vue] height=500 collapse
<script setup lang="ts">
import { CommandGroup } from '@repo/shadcn-vue/components/ui/command'

interface Props {
  heading?: string
}

defineProps<Props>()
</script>

<template>
  <CommandGroup
    :heading="heading"
    v-bind="$attrs"
  >
    <slot />
  </CommandGroup>
</template>
```

```vue [VoiceSelectorItem.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CommandItem } from '@repo/shadcn-vue/components/ui/command'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { inject } from 'vue'
import { VOICE_SELECTOR_CONTEXT_KEY } from './types'

interface Props {
  class?: HTMLAttributes['class']
  value: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'select', value: string): void
}>()

const context = inject(VOICE_SELECTOR_CONTEXT_KEY)

function handleSelect() {
  context?.setValue(props.value)
  emit('select', props.value)
}
</script>

<template>
  <CommandItem
    :class="cn('px-4 py-2', props.class)"
    :value="value"
    v-bind="$attrs"
    @select="handleSelect"
  >
    <slot />
  </CommandItem>
</template>
```

```vue [VoiceSelectorShortcut.vue] height=500 collapse
<script setup lang="ts">
import { CommandShortcut } from '@repo/shadcn-vue/components/ui/command'
</script>

<template>
  <CommandShortcut v-bind="$attrs">
    <slot />
  </CommandShortcut>
</template>
```

```vue [VoiceSelectorSeparator.vue] height=500 collapse
<script setup lang="ts">
import { CommandSeparator } from '@repo/shadcn-vue/components/ui/command'
</script>

<template>
  <CommandSeparator v-bind="$attrs">
    <slot />
  </CommandSeparator>
</template>
```

```vue [VoiceSelectorGender.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import {
  CircleIcon,
  MarsIcon,
  MarsStrokeIcon,
  NonBinaryIcon,
  TransgenderIcon,
  VenusAndMarsIcon,
  VenusIcon,
} from 'lucide-vue-next'

interface Props {
  class?: HTMLAttributes['class']
  value?:
    | 'male'
    | 'female'
    | 'transgender'
    | 'androgyne'
    | 'non-binary'
    | 'intersex'
}

defineProps<Props>()
</script>

<template>
  <span
    :class="cn('text-muted-foreground text-xs', $props.class)"
    v-bind="$attrs"
  >
    <slot>
      <MarsIcon v-if="value === 'male'" class="size-4" />
      <VenusIcon v-else-if="value === 'female'" class="size-4" />
      <TransgenderIcon v-else-if="value === 'transgender'" class="size-4" />
      <MarsStrokeIcon v-else-if="value === 'androgyne'" class="size-4" />
      <NonBinaryIcon v-else-if="value === 'non-binary'" class="size-4" />
      <VenusAndMarsIcon v-else-if="value === 'intersex'" class="size-4" />
      <CircleIcon v-else class="size-1" fill="currentColor" />
    </slot>
  </span>
</template>
```

```vue [VoiceSelectorAccent.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
  value?: string
}

const props = defineProps<Props>()

const emoji = computed(() => {
  switch (props.value) {
    case 'american':
      return '🇺🇸'
    case 'british':
      return '🇬🇧'
    case 'australian':
      return '🇦🇺'
    case 'canadian':
      return '🇨🇦'
    case 'irish':
      return '🇮🇪'
    case 'scottish':
      return '🏴󠁧󠁢󠁳󠁣󠁴󠁿'
    case 'indian':
      return '🇮🇳'
    case 'south-african':
      return '🇿🇦'
    case 'new-zealand':
      return '🇳🇿'
    case 'spanish':
      return '🇪🇸'
    case 'french':
      return '🇫🇷'
    case 'german':
      return '🇩🇪'
    case 'italian':
      return '🇮🇹'
    case 'portuguese':
      return '🇵🇹'
    case 'brazilian':
      return '🇧🇷'
    case 'mexican':
      return '🇲🇽'
    case 'argentinian':
      return '🇦🇷'
    case 'japanese':
      return '🇯🇵'
    case 'chinese':
      return '🇨🇳'
    case 'korean':
      return '🇰🇷'
    case 'russian':
      return '🇷🇺'
    case 'arabic':
      return '🇸🇦'
    case 'dutch':
      return '🇳🇱'
    case 'swedish':
      return '🇸🇪'
    case 'norwegian':
      return '🇳🇴'
    case 'danish':
      return '🇩🇰'
    case 'finnish':
      return '🇫🇮'
    case 'polish':
      return '🇵🇱'
    case 'turkish':
      return '🇹🇷'
    case 'greek':
      return '🇬🇷'
    default:
      return null
  }
})
</script>

<template>
  <span
    :class="cn('text-muted-foreground text-xs', props.class)"
    v-bind="$attrs"
  >
    <slot>
      {{ emoji }}
    </slot>
  </span>
</template>
```

```vue [VoiceSelectorAge.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

defineProps<Props>()
</script>

<template>
  <span
    :class="cn('text-muted-foreground text-xs tabular-nums', $props.class)"
    v-bind="$attrs"
  >
    <slot />
  </span>
</template>
```

```vue [VoiceSelectorName.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

defineProps<Props>()
</script>

<template>
  <span
    :class="cn('flex-1 truncate text-left font-medium', $props.class)"
    v-bind="$attrs"
  >
    <slot />
  </span>
</template>
```

```vue [VoiceSelectorDescription.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

defineProps<Props>()
</script>

<template>
  <span
    :class="cn('text-muted-foreground text-xs', $props.class)"
    v-bind="$attrs"
  >
    <slot />
  </span>
</template>
```

```vue [VoiceSelectorAttributes.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

defineProps<Props>()
</script>

<template>
  <div
    :class="cn('flex items-center text-xs', $props.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
```

```vue [VoiceSelectorBullet.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

defineProps<Props>()
</script>

<template>
  <span
    aria-hidden="true"
    :class="cn('select-none text-border', $props.class)"
    v-bind="$attrs"
  >
    &bull;
  </span>
</template>
```

```vue [VoiceSelectorPreview.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { Spinner } from '@repo/shadcn-vue/components/ui/spinner'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { PauseIcon, PlayIcon } from 'lucide-vue-next'

interface Props {
  class?: HTMLAttributes['class']
  playing?: boolean
  loading?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'play'): void
}>()

function handleClick(event: MouseEvent) {
  event.stopPropagation()
  emit('play')
}
</script>

<template>
  <Button
    :aria-label="playing ? 'Pause preview' : 'Play preview'"
    :class="cn('size-6', props.class)"
    :disabled="loading"
    size="icon-sm"
    type="button"
    variant="outline"
    v-bind="$attrs"
    @click="handleClick"
  >
    <Spinner v-if="loading" class="size-3" />
    <PauseIcon v-else-if="playing" class="size-3" />
    <PlayIcon v-else class="size-3" />
  </Button>
</template>
```

```ts [types.ts]
import type { InjectionKey, Ref } from 'vue'

export interface VoiceSelectorContextValue {
  value: Ref<string | undefined>
  setValue: (value: string | undefined) => void
  open: Ref<boolean>
  setOpen: (open: boolean) => void
}

export const VOICE_SELECTOR_CONTEXT_KEY = Symbol('VOICE_SELECTOR_CONTEXT_KEY') as InjectionKey<VoiceSelectorContextValue>
```

```ts [useVoiceSelector.ts]
import { inject } from 'vue'
import { VOICE_SELECTOR_CONTEXT_KEY } from './types'

export function useVoiceSelector() {
  const context = inject(VOICE_SELECTOR_CONTEXT_KEY)
  if (!context) {
    throw new Error(
      'VoiceSelector components must be used within VoiceSelector',
    )
  }
  return context
}
```

```ts [index.ts]
export * from './types'
export { useVoiceSelector } from './useVoiceSelector'
export { default as VoiceSelector } from './VoiceSelector.vue'
export { default as VoiceSelectorAccent } from './VoiceSelectorAccent.vue'
export { default as VoiceSelectorAge } from './VoiceSelectorAge.vue'
export { default as VoiceSelectorAttributes } from './VoiceSelectorAttributes.vue'
export { default as VoiceSelectorBullet } from './VoiceSelectorBullet.vue'
export { default as VoiceSelectorContent } from './VoiceSelectorContent.vue'
export { default as VoiceSelectorDescription } from './VoiceSelectorDescription.vue'
export { default as VoiceSelectorDialog } from './VoiceSelectorDialog.vue'
export { default as VoiceSelectorEmpty } from './VoiceSelectorEmpty.vue'
export { default as VoiceSelectorGender } from './VoiceSelectorGender.vue'
export { default as VoiceSelectorGroup } from './VoiceSelectorGroup.vue'
export { default as VoiceSelectorInput } from './VoiceSelectorInput.vue'
export { default as VoiceSelectorItem } from './VoiceSelectorItem.vue'
export { default as VoiceSelectorList } from './VoiceSelectorList.vue'
export { default as VoiceSelectorName } from './VoiceSelectorName.vue'
export { default as VoiceSelectorPreview } from './VoiceSelectorPreview.vue'
export { default as VoiceSelectorSeparator } from './VoiceSelectorSeparator.vue'

export { default as VoiceSelectorShortcut } from './VoiceSelectorShortcut.vue'
export { default as VoiceSelectorTrigger } from './VoiceSelectorTrigger.vue'
```
:::

## Features

- Fully composable architecture with granular control components
- Built on shadcn-vue Dialog and Command components
- Vue Provide/Inject API for accessing state in nested components
- Searchable voice list with real-time filtering
- Support for voice metadata with icons and emojis (gender icons, accent flags, age)
- Voice preview button with play/pause/loading states
- Voice grouping with separators and bullet dividers
- Keyboard navigation support
- Controlled and uncontrolled component patterns
- Full TypeScript support with proper types for all components

## Props

### `<VoiceSelector />`

Root Dialog component that provides context for all child components. Manages both voice selection and dialog open states.

:::field-group
  ::field{name="v-model:value" type="string"}
  The selected voice ID (controlled).
  ::
  ::field{name="defaultValue" type="string"}
  The default selected voice ID (uncontrolled).
  ::
  ::field{name="v-model:open" type="boolean" default="false"}
  The open state of the dialog.
  ::
  ::field{name="modal" type="boolean" default="true"}
  Whether the dialog is modal.
  ::
:::

### `<VoiceSelectorTrigger />`

Button or element that opens the voice selector dialog.

:::field-group
  ::field{name="asChild" type="boolean" default="false"}
  Change the default rendered element for the one passed as a child.
  ::
:::

### `<VoiceSelectorContent />`

Container for the Command component and voice list, rendered inside the dialog.

:::field-group
  ::field{name="title" type="string" default='"Voice Selector"'}
  The title for screen readers.
  ::
:::

### `<VoiceSelectorInput />`

Search input for filtering voices.

:::field-group
  ::field{name="placeholder" type="string"}
  Placeholder text for the search input.
  ::
:::

### `<VoiceSelectorGroup />`

Groups related voices together with an optional heading.

:::field-group
  ::field{name="heading" type="string"}
  The heading text for the group.
  ::
:::

### `<VoiceSelectorItem />`

Selectable item representing a voice.

:::field-group
  ::field{name="value" type="string" required}
  The unique identifier for this voice. Used for search filtering.
  ::
:::

### `<VoiceSelectorGender />`

Displays the voice gender metadata with icons from Lucide.

:::field-group
  ::field{name="value" type='"male" | "female" | "transgender" | "androgyne" | "non-binary" | "intersex"'}
  The gender value that determines which icon to display.
  ::
:::

### `<VoiceSelectorAccent />`

Displays the voice accent metadata with emoji flags.

:::field-group
  ::field{name="value" type="string"}
  The accent value that determines which flag emoji to display.
  ::
:::

### `<VoiceSelectorPreview />`

A button that allows users to preview/play a voice sample.

:::field-group
  ::field{name="playing" type="boolean"}
  Whether the voice is currently playing.
  ::
  ::field{name="loading" type="boolean"}
  Whether the voice preview is loading.
  ::
:::

## Composables

### `useVoiceSelector()`

A custom hook for accessing the voice selector context.

```vue
<script setup lang="ts">
import { useVoiceSelector } from '@repo/elements/voice-selector'

const { value, setValue, open, setOpen } = useVoiceSelector()
</script>

<template>
  <div>
    <p>Selected voice: {{ value ?? 'None' }}</p>
    <button @click="setOpen(!open)">
      Toggle Dialog
    </button>
  </div>
</template>
```

#### Return Value

:::field-group
  ::field{name="value" type="Ref<string | undefined>"}
  The currently selected voice ID.
  ::
  ::field{name="setValue" type="(value: string | undefined) => void"}
  Function to update the selected voice ID.
  ::
  ::field{name="open" type="Ref<boolean>"}
  Whether the dialog is currently open.
  ::
  ::field{name="setOpen" type="(open: boolean) => void"}
  Function to control the dialog open state.
  ::
:::

## Behavior

### Scoped Slots Pattern

The component uses scoped slots and provide/inject pattern to share state between components while maintaining a clean, declarative template.

### Segment Highlighting

Voices are automatically styled based on their selection state. Interactive items provide visual feedback on hover and focus.

### Click-to-Seek

When a voice is selected, the `valueChange` event is emitted and the dialog automatically closes if handled by the user.

## Browser Support

The component uses standard web APIs and is supported by all modern browsers.
