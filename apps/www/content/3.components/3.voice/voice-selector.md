---
title: Voice Selector
description: A composable dialog component for selecting AI voices with metadata display and search functionality.
icon: lucide:file-volume
---

The `VoiceSelector` component provides a flexible and composable interface for selecting AI voices. Built on shadcn-vue's Dialog and Command components, it features a searchable voice list with support for metadata display (gender, accent, age), grouping, and customizable layouts. The component includes a context provider for accessing voice selection state from any nested component.

:::ComponentLoader{label="Preview" componentName="VoiceSelector"}
:::

## Install using CLI

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

## Install Manually

Copy and paste the following code into your project.

:::code-group
```vue [VoiceSelector.vue] height=500 collapse
<script setup lang="ts">
import { Dialog } from '@repo/shadcn-vue/components/ui/dialog'
import { useVModel } from '@vueuse/core'
import { provide } from 'vue'
import { VoiceSelectorKey } from './context'

type VoiceSelectorProps = InstanceType<typeof Dialog>['$props']

interface Props extends /* @vue-ignore */ VoiceSelectorProps {
  value?: string
  defaultValue?: string
  open?: boolean
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  open: undefined,
  defaultOpen: false,
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

provide(VoiceSelectorKey, {
  value,
  setValue,
  open,
  setOpen,
})
</script>

<template>
  <Dialog
    :open="open"
    @update:open="setOpen"
  >
    <slot />
  </Dialog>
</template>
```

```vue [VoiceSelectorTrigger.vue] height=500 collapse
<script setup lang="ts">
import { DialogTrigger } from '@repo/shadcn-vue/components/ui/dialog'

type VoiceSelectorTriggerProps = InstanceType<typeof DialogTrigger>['$props']

interface Props extends /* @vue-ignore */ VoiceSelectorTriggerProps {}

defineProps<Props>()
</script>

<template>
  <DialogTrigger>
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

type VoiceSelectorContentProps = InstanceType<typeof DialogContent>['$props']

interface Props extends /* @vue-ignore */ VoiceSelectorContentProps {
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

type VoiceSelectorDialogProps = InstanceType<typeof CommandDialog>['$props']

interface Props extends /* @vue-ignore */ VoiceSelectorDialogProps {}

defineProps<Props>()
</script>

<template>
  <CommandDialog>
    <slot />
  </CommandDialog>
</template>
```

```vue [VoiceSelectorInput.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CommandInput } from '@repo/shadcn-vue/components/ui/command'
import { cn } from '@repo/shadcn-vue/lib/utils'

type VoiceSelectorInputProps = InstanceType<typeof CommandInput>['$props']

interface Props extends /* @vue-ignore */ VoiceSelectorInputProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <CommandInput
    :class="cn('h-auto py-3.5', props.class)"
  />
</template>
```

```vue [VoiceSelectorList.vue] height=500 collapse
<script setup lang="ts">
import { CommandList } from '@repo/shadcn-vue/components/ui/command'

type VoiceSelectorListProps = InstanceType<typeof CommandList>['$props']

interface Props extends /* @vue-ignore */ VoiceSelectorListProps {}

defineProps<Props>()
</script>

<template>
  <CommandList>
    <slot />
  </CommandList>
</template>
```

```vue [VoiceSelectorEmpty.vue] height=500 collapse
<script setup lang="ts">
import { CommandEmpty } from '@repo/shadcn-vue/components/ui/command'

type VoiceSelectorEmptyProps = InstanceType<typeof CommandEmpty>['$props']

interface Props extends /* @vue-ignore */ VoiceSelectorEmptyProps {}

defineProps<Props>()
</script>

<template>
  <CommandEmpty>
    <slot />
  </CommandEmpty>
</template>
```

```vue [VoiceSelectorGroup.vue] height=500 collapse
<script setup lang="ts">
import { CommandGroup } from '@repo/shadcn-vue/components/ui/command'

type VoiceSelectorGroupProps = InstanceType<typeof CommandGroup>['$props']

interface Props extends /* @vue-ignore */ VoiceSelectorGroupProps {}

defineProps<Props>()
</script>

<template>
  <CommandGroup>
    <slot />
  </CommandGroup>
</template>
```

```vue [VoiceSelectorItem.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CommandItem } from '@repo/shadcn-vue/components/ui/command'
import { cn } from '@repo/shadcn-vue/lib/utils'

type VoiceSelectorItemProps = InstanceType<typeof CommandItem>['$props']

interface Props extends /* @vue-ignore */ VoiceSelectorItemProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { class: _, ...rest } = props
</script>

<template>
  <CommandItem
    :class="cn('hover:bg-accent hover:text-accent-foreground px-4 py-2', props.class)"
    v-bind="rest"
  >
    <slot />
  </CommandItem>
</template>
```

```vue [VoiceSelectorShortcut.vue] height=500 collapse
<script setup lang="ts">
import { CommandShortcut } from '@repo/shadcn-vue/components/ui/command'

type VoiceSelectorShortcutProps = InstanceType<typeof CommandShortcut>['$props']

interface Props extends /* @vue-ignore */ VoiceSelectorShortcutProps {}

defineProps<Props>()
</script>

<template>
  <CommandShortcut>
    <slot />
  </CommandShortcut>
</template>
```

```vue [VoiceSelectorSeparator.vue] height=500 collapse
<script setup lang="ts">
import { CommandSeparator } from '@repo/shadcn-vue/components/ui/command'

type VoiceSelectorSeparatorProps = InstanceType<typeof CommandSeparator>['$props']

interface Props extends /* @vue-ignore */ VoiceSelectorSeparatorProps {}

defineProps<Props>()
</script>

<template>
  <CommandSeparator>
    <slot />
  </CommandSeparator>
</template>
```

```vue [VoiceSelectorGender.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import {
  CircleSmallIcon,
  MarsIcon,
  MarsStrokeIcon,
  NonBinaryIcon,
  TransgenderIcon,
  VenusAndMarsIcon,
  VenusIcon,
} from 'lucide-vue-next'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
  value?:
    | 'male'
    | 'female'
    | 'transgender'
    | 'androgyne'
    | 'non-binary'
    | 'intersex'
}

const props = defineProps<Props>()
</script>

<template>
  <span
    :class="cn('text-muted-foreground text-xs', props.class)"
  >
    <slot>
      <MarsIcon v-if="props.value === 'male'" class="size-4" />
      <VenusIcon v-else-if="props.value === 'female'" class="size-4" />
      <TransgenderIcon v-else-if="props.value === 'transgender'" class="size-4" />
      <MarsStrokeIcon v-else-if="props.value === 'androgyne'" class="size-4" />
      <NonBinaryIcon v-else-if="props.value === 'non-binary'" class="size-4" />
      <VenusAndMarsIcon v-else-if="props.value === 'intersex'" class="size-4" />
      <CircleSmallIcon v-else class="size-1" fill="currentColor" />
    </slot>
  </span>
</template>
```

```vue [VoiceSelectorAccent.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'

type Accent
  = | 'american'
    | 'british'
    | 'australian'
    | 'canadian'
    | 'irish'
    | 'scottish'
    | 'indian'
    | 'south-african'
    | 'new-zealand'
    | 'spanish'
    | 'french'
    | 'german'
    | 'italian'
    | 'portuguese'
    | 'brazilian'
    | 'mexican'
    | 'argentinian'
    | 'japanese'
    | 'chinese'
    | 'korean'
    | 'russian'
    | 'arabic'
    | 'dutch'
    | 'swedish'
    | 'norwegian'
    | 'danish'
    | 'finnish'
    | 'polish'
    | 'turkish'
    | 'greek'
    | (string & {})

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
  value?: Accent
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

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <span
    :class="cn('text-muted-foreground text-xs tabular-nums', props.class)"
  >
    <slot />
  </span>
</template>
```

```vue [VoiceSelectorName.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <span
    :class="cn('flex-1 truncate text-left font-medium', props.class)"
  >
    <slot />
  </span>
</template>
```

```vue [VoiceSelectorDescription.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <span
    :class="cn('text-muted-foreground text-xs', props.class)"
  >
    <slot />
  </span>
</template>
```

```vue [VoiceSelectorAttributes.vue] height=500 collapse
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
    :class="cn('flex items-center text-xs', props.class)"
  >
    <slot />
  </div>
</template>
```

```vue [VoiceSelectorBullet.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <span
    aria-hidden="true"
    :class="cn('select-none text-border', props.class)"
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
    @click="handleClick"
  >
    <Spinner v-if="loading" class="size-3" />
    <PauseIcon v-else-if="playing" class="size-3" />
    <PlayIcon v-else class="size-3" />
  </Button>
</template>
```

```ts [context.ts]
import type { InjectionKey, Ref } from 'vue'
import { inject } from 'vue'

export interface VoiceSelectorContextValue {
  value: Ref<string | undefined>
  setValue: (value: string | undefined) => void
  open: Ref<boolean | undefined>
  setOpen: (open: boolean) => void
}

export const VoiceSelectorKey: InjectionKey<VoiceSelectorContextValue> = Symbol('VoiceSelector')

export function useVoiceSelector(componentName: string): VoiceSelectorContextValue {
  const context = inject(VoiceSelectorKey)

  if (!context) {
    throw new Error(`${componentName} must be used within VoiceSelector`)
  }

  return context
}
```

```ts [index.ts]
export * from './context'
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
  ::field{name="v-model:open" type="boolean"}
  The open state of the dialog (controlled).
  ::
  ::field{name="defaultOpen" type="boolean" default="false"}
  The default open state (uncontrolled).
  ::
  ::field{name="...props" type="DialogProps"}
  Any other props are spread to the Dialog component.
  ::
:::

### `<VoiceSelectorTrigger />`

Button or element that opens the voice selector dialog.

:::field-group
  ::field{name="asChild" type="boolean" default="false"}
  Change the default rendered element for the one passed as a child, merging their props and behavior.
  ::
  ::field{name="...props" type="DialogTriggerProps"}
  Any other props are spread to the DialogTrigger component.
  ::
:::

### `<VoiceSelectorContent />`

Container for the Command component and voice list, rendered inside the dialog.

:::field-group
  ::field{name="title" type="string" default='"Voice Selector"'}
  The title for screen readers. Hidden visually but accessible to assistive technologies.
  ::
  ::field{name="class" type="string"}
  Additional CSS classes to apply to the dialog content.
  ::
  ::field{name="...props" type="DialogContentProps"}
  Any other props are spread to the DialogContent component.
  ::
:::

### `<VoiceSelectorDialog />`

Alternative dialog implementation using CommandDialog for a full-screen command palette style.

:::field-group
  ::field{name="...props" type="CommandDialogProps"}
  Any other props are spread to the CommandDialog component.
  ::
:::

### `<VoiceSelectorInput />`

Search input for filtering voices.

:::field-group
  ::field{name="placeholder" type="string"}
  Placeholder text for the search input.
  ::
  ::field{name="class" type="string"}
  Additional CSS classes to apply.
  ::
  ::field{name="...props" type="CommandInputProps"}
  Any other props are spread to the CommandInput component.
  ::
:::

### `<VoiceSelectorList />`

Scrollable container for voice items and groups.

:::field-group
  ::field{name="...props" type="CommandListProps"}
  Any other props are spread to the CommandList component.
  ::
:::

### `<VoiceSelectorEmpty />`

Message shown when no voices match the search query.

:::field-group
  ::field{name="...props" type="CommandEmptyProps"}
  Any other props are spread to the CommandEmpty component.
  ::
:::

### `<VoiceSelectorGroup />`

Groups related voices together with an optional heading.

:::field-group
  ::field{name="heading" type="string"}
  The heading text for the group.
  ::
  ::field{name="...props" type="CommandGroupProps"}
  Any other props are spread to the CommandGroup component.
  ::
:::

### `<VoiceSelectorItem />`

Selectable item representing a voice.

:::field-group
  ::field{name="value" type="string" required}
  The unique identifier for this voice. Used for search filtering.
  ::
  ::field{name="class" type="string"}
  Additional CSS classes to apply.
  ::
  ::field{name="...props" type="CommandItemProps"}
  Any other props are spread to the CommandItem component.
  ::
:::

### `<VoiceSelectorSeparator />`

Visual separator between voice groups.

:::field-group
  ::field{name="...props" type="CommandSeparatorProps"}
  Any other props are spread to the CommandSeparator component.
  ::
:::

### `<VoiceSelectorShortcut />`

Displays keyboard shortcuts for voice items.

:::field-group
  ::field{name="...props" type="CommandShortcutProps"}
  Any other props are spread to the CommandShortcut component.
  ::
:::

### `<VoiceSelectorName />`

Displays the voice name with proper styling.

:::field-group
  ::field{name="class" type="string"}
  Additional CSS classes to apply.
  ::
:::

### `<VoiceSelectorGender />`

Displays the voice gender metadata with icons from Lucide. Supports multiple gender identities with corresponding icons.

:::field-group
  ::field{name="value" type='"male" | "female" | "transgender" | "androgyne" | "non-binary" | "intersex"'}
  The gender value that determines which icon to display. Supported values: "male" (Mars), "female" (Venus), "transgender", "androgyne", "non-binary", "intersex". Defaults to a small circle if no value matches.
  ::
  ::field{name="class" type="string"}
  Additional CSS classes to apply.
  ::
:::

### `<VoiceSelectorAccent />`

Displays the voice accent metadata with emoji flags representing different countries/regions.

:::field-group
  ::field{name="value" type="string"}
  The accent value that determines which flag emoji to display. Supports 27 different accents including: "american" 🇺🇸, "british" 🇬🇧, "australian" 🇦🇺, "canadian" 🇨🇦, "irish" 🇮🇪, "scottish" 🏴󠁧󠁢󠁳󠁣󠁴󠁿, "indian" 🇮🇳, "south-african" 🇿🇦, "new-zealand" 🇳🇿, "spanish" 🇪🇸, "french" 🇫🇷, "german" 🇩🇪, "italian" 🇮🇹, "portuguese" 🇵🇹, "brazilian" 🇧🇷, "mexican" 🇲🇽, "argentinian" 🇦🇷, "japanese" 🇯🇵, "chinese" 🇨🇳, "korean" 🇰🇷, "russian" 🇷🇺, "arabic" 🇸🇦, "dutch" 🇳🇱, "swedish" 🇸🇪, "norwegian" 🇳🇴, "danish" 🇩🇰, "finnish" 🇫🇮, "polish" 🇵🇱, "turkish" 🇹🇷, "greek" 🇬🇷. Also accepts any custom string value.
  ::
  ::field{name="class" type="string"}
  Additional CSS classes to apply.
  ::
:::

### `<VoiceSelectorAge />`

Displays the voice age metadata with muted styling and tabular numbers for consistent alignment.

:::field-group
  ::field{name="class" type="string"}
  Additional CSS classes to apply.
  ::
:::

### `<VoiceSelectorDescription />`

Displays a description for the voice with muted styling.

:::field-group
  ::field{name="class" type="string"}
  Additional CSS classes to apply.
  ::
:::

### `<VoiceSelectorAttributes />`

Container for grouping voice attributes (gender, accent, age) together. Use with `VoiceSelectorBullet` for separation.

:::field-group
  ::field{name="class" type="string"}
  Additional CSS classes to apply.
  ::
:::

### `<VoiceSelectorBullet />`

Displays a bullet separator (•) between voice attributes. Hidden from screen readers via `aria-hidden`.

:::field-group
  ::field{name="class" type="string"}
  Additional CSS classes to apply.
  ::
:::

### `<VoiceSelectorPreview />`

A button that allows users to preview/play a voice sample before selecting it. Shows play, pause, or loading icons based on state.

:::field-group
  ::field{name="playing" type="boolean"}
  Whether the voice is currently playing. Shows pause icon when true.
  ::
  ::field{name="loading" type="boolean"}
  Whether the voice preview is loading. Shows loading spinner and disables the button.
  ::
  ::field{name="class" type="string"}
  Additional CSS classes to apply.
  ::
:::

## Emits

### `<VoiceSelector />`

:::field-group
  ::field{name="update:value" type="string | undefined"}
  Emitted when the selected voice changes (for v-model).
  ::
  ::field{name="valueChange" type="string | undefined"}
  Callback emitted when the selected voice changes.
  ::
  ::field{name="update:open" type="boolean"}
  Emitted when the open state changes (for v-model).
  ::
  ::field{name="openChange" type="boolean"}
  Callback emitted when the open state changes.
  ::
:::

### `<VoiceSelectorItem />`

:::field-group
  ::field{name="select" type="string"}
  Emitted when the voice is selected with the voice value.
  ::
:::

### `<VoiceSelectorPreview />`

:::field-group
  ::field{name="play" type="void"}
  Emitted when the preview button is clicked.
  ::
:::

## Composables

### `useVoiceSelector()`

A custom composable for accessing the voice selector context. This composable allows you to access and control the voice selection state from any component nested within VoiceSelector.

```vue
<script setup lang="ts">
import { useVoiceSelector } from '@repo/elements/voice-selector'

const { value, setValue, open, setOpen } = useVoiceSelector('MyComponent')
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
  ::field{name="open" type="Ref<boolean | undefined>"}
  Whether the dialog is currently open.
  ::
  ::field{name="setOpen" type="(open: boolean) => void"}
  Function to control the dialog open state.
  ::
:::
