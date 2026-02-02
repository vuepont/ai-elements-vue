---
title: Transcription
description: A composable component for displaying interactive, synchronized transcripts from AI SDK transcribe() results with click-to-seek functionality.
icon: lucide:file-audio
---

The `Transcription` component provides a flexible scoped slots interface for displaying audio transcripts with synchronized playback. It automatically highlights the current segment based on playback time and supports click-to-seek functionality for interactive navigation.

:::ComponentLoader{label="Preview" componentName="Transcription"}
:::

## Installation

::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add transcription
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/transcription.json
  ```
  ::
::

## Manual Installation

Copy and paste the following code into your project.

:::code-group
```vue [Transcription.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { TranscriptionSegment } from './context'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useVModel } from '@vueuse/core'
import { provide } from 'vue'
import { TranscriptionKey } from './context'

const props = withDefaults(defineProps<Props>(), {
  currentTime: 0,
})

const emit = defineEmits<{
  (e: 'update:currentTime', time: number): void
  (e: 'seek', time: number): void
}>()

interface Props {
  segments: TranscriptionSegment[]
  currentTime?: number
  class?: HTMLAttributes['class']
}

const currentTime = useVModel(props, 'currentTime', emit)

function handleTimeUpdate(time: number) {
  currentTime.value = time
}

function handleSeek(time: number) {
  currentTime.value = time
  emit('seek', time)
}

provide(TranscriptionKey, {
  segments: props.segments,
  currentTime,
  onTimeUpdate: handleTimeUpdate,
  onSeek: handleSeek,
})
</script>

<template>
  <div
    :class="cn('flex flex-wrap gap-1 text-sm leading-relaxed', props.class)"
    data-slot="transcription"
  >
    <template v-for="(segment, index) in segments" :key="`${segment.startSecond}-${segment.endSecond}`">
      <slot v-if="segment.text.trim()" :segment="segment" :index="index" />
    </template>
  </div>
</template>
```

```vue [TranscriptionSegment.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { TranscriptionSegment } from './context'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'
import { useTranscriptionContext } from './context'

const props = defineProps<Props>()

interface Props {
  segment: TranscriptionSegment
  index: number
  class?: HTMLAttributes['class']
}

const { currentTime, onSeek } = useTranscriptionContext()

const isActive = computed(() => {
  return (
    currentTime.value >= props.segment.startSecond
    && currentTime.value < props.segment.endSecond
  )
})

const isPast = computed(() => {
  return currentTime.value >= props.segment.endSecond
})

function handleClick() {
  if (onSeek) {
    onSeek(props.segment.startSecond)
  }
}
</script>

<template>
  <button
    :class="
      cn(
        'inline text-left',
        isActive && 'text-primary',
        isPast && 'text-muted-foreground',
        !(isActive || isPast) && 'text-muted-foreground/60',
        onSeek && 'cursor-pointer hover:text-foreground',
        !onSeek && 'cursor-default',
        props.class,
      )
    "
    :data-active="isActive"
    :data-index="index"
    data-slot="transcription-segment"
    type="button"
    @click="handleClick"
  >
    {{ segment.text }}
  </button>
</template>
```

```ts [context.ts]
import type { Experimental_TranscriptionResult as TranscriptionResult } from 'ai'
import type { InjectionKey, Ref } from 'vue'
import { inject } from 'vue'

export type TranscriptionSegment = NonNullable<TranscriptionResult['segments']>[number]

export interface TranscriptionContextValue {
  segments: TranscriptionSegment[]
  currentTime: Ref<number>
  onTimeUpdate: (time: number) => void
  onSeek?: (time: number) => void
}

export const TranscriptionKey: InjectionKey<TranscriptionContextValue> = Symbol('Transcription')

export function useTranscriptionContext(): TranscriptionContextValue {
  const context = inject(TranscriptionKey)
  if (!context) {
    throw new Error('useTranscriptionContext must be used within Transcription')
  }
  return context
}
```

```ts [index.ts]
export * from './context'
export { default as Transcription } from './Transcription.vue'
export { default as TranscriptionSegment } from './TranscriptionSegment.vue'
```
:::

## Features

- Scoped slots pattern for maximum flexibility
- Automatic segment highlighting based on current time
- Click-to-seek functionality for interactive navigation
- Controlled and uncontrolled component patterns
- Automatic filtering of empty segments
- Visual state indicators (active, past, future)
- Built on Vue's `provide`/`inject` for flexible state management
- Full TypeScript support with AI SDK transcription types

## Props

### `<Transcription />`

Root component that provides context and manages transcript state. Uses scoped slots for rendering segments.

:::field-group
  ::field{name="segments" type="TranscriptionSegment[]"}
  Array of transcription segments from AI SDK transcribe() function.
  ::
  ::field{name="currentTime" type="number" default="0"}
  Current playback time in seconds (controlled via v-model:current-time).
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Any other props are spread to the root div element.
  ::
:::

### `<TranscriptionSegment />`

Individual segment button with automatic state styling and click-to-seek functionality.

:::field-group
  ::field{name="segment" type="TranscriptionSegment"}
  The transcription segment data.
  ::
  ::field{name="index" type="number"}
  The segment index.
  ::
  ::field{name="...props" type="ButtonHTMLAttributes"}
  Any other props are spread to the button element.
  ::
:::

## Emits

### `<Transcription />`

:::field-group
  ::field{name="update:currentTime" type="number"}
  Fired when currentTime changes.
  ::
  ::field{name="seek" type="number"}
  Fired when a segment is clicked.
  ::
:::

## Behavior

### Scoped Slots Pattern

The component uses a scoped slots pattern where the default slot receives each segment and its index. This provides maximum flexibility for custom rendering while still benefiting from automatic state management and context.

### Segment Highlighting

Segments are automatically styled based on their relationship to the current playback time:

- **Active** (`isActive`): When `currentTime` is within the segment's time range. Styled with primary color.
- **Past** (`isPast`): When `currentTime` is after the segment's end time. Styled with muted foreground.
- **Future**: When `currentTime` is before the segment's start time. Styled with dimmed muted foreground.

### Click-to-Seek

When a segment is clicked, it calls the internal seek handler which updates the `currentTime` and emits a `seek` event with the segment's start time, allowing your audio/video player to seek to that position.

### Empty Segment Filtering

The component automatically filters out segments with empty or whitespace-only text to avoid rendering unnecessary elements.

### State Management

Uses Vue's `provide`/`inject` and `useVModel` to support both controlled and uncontrolled patterns. When `currentTime` is provided via `v-model`, the component operates in controlled mode. Otherwise, it maintains its own internal state.

## Data Format

The component expects segments from the AI SDK `transcribe()` function:

```ts
interface TranscriptionSegment {
  text: string
  startSecond: number
  endSecond: number
}
```

## Styling

The component uses data attributes for custom styling:

- `data-slot="transcription"`: Root container
- `data-slot="transcription-segment"`: Individual segment button
- `data-active`: Present on the currently playing segment
- `data-index`: The segment's index in the array

Default segment appearance:
- Active segment: `text-primary` (primary brand color)
- Past segments: `text-muted-foreground`
- Future segments: `text-muted-foreground/60` (dimmed)
- Interactive segments: `cursor-pointer hover:text-foreground`
- Non-interactive segments: `cursor-default`

## Accessibility

- Uses semantic `<button>` elements for interactive segments
- Full keyboard navigation support
- Proper button semantics for screen readers
- `data-active` attribute for assistive technology
- Hover and focus states for keyboard users

## Notes

- Empty or whitespace-only segments are automatically filtered out
- The component uses `flex-wrap` for responsive text flow
- Segments maintain inline layout with `gap-1` spacing
- `text-sm` and `leading-relaxed` provide comfortable reading
- The `seek` event is emitted when segments are clicked
