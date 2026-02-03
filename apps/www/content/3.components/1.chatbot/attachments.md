---
title: Attachments
description: A flexible, composable attachment component for displaying files, images, videos, audio, and source documents.
icon: lucide:paperclip
---

The `Attachments` component suite provides a unified way to display file attachments and source documents with multiple layout variants.

:::ComponentLoader{label="Preview" componentName="Attachments"}
:::

## Install using CLI

:::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add attachments
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/attachments.json
  ```
  ::
:::

## Install Manually

Copy and paste the following code in the same folder.

::::code-group
```vue [Attachments.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { AttachmentVariant } from './types'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, provide } from 'vue'
import { AttachmentsKey } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  variant?: AttachmentVariant
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'grid',
})

const variant = computed(() => props.variant)

provide(AttachmentsKey, { variant })
</script>

<template>
  <div
    :class="
      cn(
        'flex items-start',
        variant === 'list' ? 'flex-col gap-2' : 'flex-wrap gap-2',
        variant === 'grid' && 'ml-auto w-fit',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
```

```vue [Attachment.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { AttachmentData } from './types'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, provide } from 'vue'
import { AttachmentKey, useAttachmentsContext } from './context'
import { getMediaCategory } from './utils'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  data: AttachmentData
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'remove'): void
}>()

const { variant } = useAttachmentsContext()
const data = computed(() => props.data)
const mediaCategory = computed(() => getMediaCategory(props.data))

function handleRemove() {
  emit('remove')
}

provide(AttachmentKey, {
  data,
  mediaCategory,
  remove: handleRemove,
  variant,
})
</script>

<template>
  <div
    :class="
      cn(
        'group relative',
        variant === 'grid' && 'size-24 overflow-hidden rounded-lg',
        variant === 'inline'
          && [
            'flex h-8 cursor-pointer select-none items-center gap-1.5',
            'rounded-md border border-border px-1.5',
            'font-medium text-sm transition-all',
            'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
          ],
        variant === 'list'
          && [
            'flex w-full items-center gap-3 rounded-lg border p-3',
            'hover:bg-accent/50',
          ],
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
```

```vue [AttachmentPreview.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue'
import type { AttachmentMediaCategory } from './types'
import { cn } from '@repo/shadcn-vue/lib/utils'
import {
  FileTextIcon,
  GlobeIcon,
  ImageIcon,
  Music2Icon,
  PaperclipIcon,
  VideoIcon,
} from 'lucide-vue-next'
import { computed } from 'vue'
import { useAttachmentContext } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  fallbackIcon?: VNode
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { data, mediaCategory, variant } = useAttachmentContext()

const isGrid = computed(() => variant.value === 'grid')
const iconSize = computed(() => (variant.value === 'inline' ? 'size-3' : 'size-4'))
const fileUrl = computed(() => (data.value.type === 'file' ? data.value.url : undefined))
const showImage = computed(
  () => mediaCategory.value === 'image' && data.value.type === 'file' && !!fileUrl.value,
)
const showVideo = computed(
  () => mediaCategory.value === 'video' && data.value.type === 'file' && !!fileUrl.value,
)

const iconMap: Record<AttachmentMediaCategory, typeof ImageIcon> = {
  image: ImageIcon,
  video: VideoIcon,
  audio: Music2Icon,
  source: GlobeIcon,
  document: FileTextIcon,
  unknown: PaperclipIcon,
}

const iconComponent = computed(() => iconMap[mediaCategory.value])
const imageAlt = computed(() =>
  (data.value.type === 'file' ? data.value.filename : undefined) || 'Image',
)
</script>

<template>
  <div
    :class="
      cn(
        'flex shrink-0 items-center justify-center overflow-hidden',
        variant === 'grid' && 'size-full bg-muted',
        variant === 'inline' && 'size-5 rounded bg-background',
        variant === 'list' && 'size-12 rounded bg-muted',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <img
      v-if="showImage"
      :alt="imageAlt"
      :class="isGrid ? 'size-full object-cover' : 'size-full rounded object-cover'"
      :height="isGrid ? 96 : 20"
      :src="fileUrl"
      :width="isGrid ? 96 : 20"
    >
    <video
      v-else-if="showVideo"
      class="size-full object-cover"
      muted
      :src="fileUrl"
    />
    <component :is="props.fallbackIcon" v-else-if="props.fallbackIcon" />
    <component
      :is="iconComponent"
      v-else
      :class="cn(iconSize, 'text-muted-foreground')"
    />
  </div>
</template>
```

```vue [AttachmentInfo.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'
import { useAttachmentContext } from './context'
import { getAttachmentLabel } from './utils'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  showMediaType?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  showMediaType: false,
})

const { data, variant } = useAttachmentContext()
const label = computed(() => getAttachmentLabel(data.value))
</script>

<template>
  <div
    v-if="variant !== 'grid'"
    :class="cn('min-w-0 flex-1', props.class)"
    v-bind="$attrs"
  >
    <span class="block truncate">{{ label }}</span>
    <span
      v-if="props.showMediaType && data.mediaType"
      class="block truncate text-muted-foreground text-xs"
    >
      {{ data.mediaType }}
    </span>
  </div>
</template>
```

```vue [AttachmentRemove.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { XIcon } from 'lucide-vue-next'
import { useAttachmentContext } from './context'

type ButtonProps = InstanceType<typeof Button>['$props']

interface Props extends /* @vue-ignore */ ButtonProps {
  label?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Remove',
})

const { remove, variant } = useAttachmentContext()

const { variant: _variant, ...restProps } = props

function handleClick(e: Event) {
  e.stopPropagation()
  remove?.()
}
</script>

<template>
  <Button
    v-if="remove"
    :aria-label="props.label"
    :class="
      cn(
        variant === 'grid'
          && [
            'absolute top-2 right-2 size-6 rounded-full p-0',
            'bg-background/80 backdrop-blur-sm',
            'opacity-0 transition-opacity group-hover:opacity-100',
            'hover:bg-background',
            '[&>svg]:size-3',
          ],
        variant === 'inline'
          && [
            'size-5 rounded p-0',
            'opacity-0 transition-opacity group-hover:opacity-100',
            '[&>svg]:size-2.5',
          ],
        variant === 'list' && ['size-8 shrink-0 rounded p-0', '[&>svg]:size-4'],
        props.class,
      )
    "
    type="button"
    variant="ghost"
    v-bind="restProps"
    @click="handleClick"
  >
    <slot>
      <XIcon />
    </slot>
    <span class="sr-only">{{ props.label }}</span>
  </Button>
</template>
```

```vue [AttachmentHoverCard.vue] height=500 collapse
<script setup lang="ts">
import { HoverCard } from '@repo/shadcn-vue/components/ui/hover-card'

type AttachmentHoverCardProps = InstanceType<typeof HoverCard>['$props']

interface Props extends /* @vue-ignore */ AttachmentHoverCardProps {
  openDelay?: number
  closeDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  openDelay: 0,
  closeDelay: 0,
})

const { openDelay, closeDelay, ...restProps } = props
</script>

<template>
  <HoverCard :open-delay="openDelay" :close-delay="closeDelay" v-bind="restProps">
    <slot />
  </HoverCard>
</template>
```

```vue [AttachmentHoverCardTrigger.vue] height=500 collapse
<script setup lang="ts">
import { HoverCardTrigger } from '@repo/shadcn-vue/components/ui/hover-card'

type AttachmentHoverCardTriggerProps = InstanceType<typeof HoverCardTrigger>['$props']

interface Props extends /* @vue-ignore */ AttachmentHoverCardTriggerProps {}

const props = defineProps<Props>()
</script>

<template>
  <HoverCardTrigger v-bind="props">
    <slot />
  </HoverCardTrigger>
</template>
```

```vue [AttachmentHoverCardContent.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { HoverCardContent } from '@repo/shadcn-vue/components/ui/hover-card'
import { cn } from '@repo/shadcn-vue/lib/utils'

type AttachmentHoverCardContentProps = InstanceType<typeof HoverCardContent>['$props']

interface Props extends /* @vue-ignore */ AttachmentHoverCardContentProps {
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  align: 'start',
})
</script>

<template>
  <HoverCardContent :class="cn('w-auto p-2', props.class)" v-bind="props">
    <slot />
  </HoverCardContent>
</template>
```

```vue [AttachmentEmpty.vue] height=500 collapse
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
        'flex items-center justify-center p-4 text-muted-foreground text-sm',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <slot> No attachments </slot>
  </div>
</template>
```

```ts [context.ts] height=500 collapse
import type { InjectionKey, Ref } from 'vue'
import type {
  AttachmentData,
  AttachmentMediaCategory,
  AttachmentVariant,
} from './types'
import { computed, inject } from 'vue'

export interface AttachmentsContextValue {
  variant: Ref<AttachmentVariant>
}

export const AttachmentsKey: InjectionKey<AttachmentsContextValue>
  = Symbol('Attachments')

export function useAttachmentsContext(): AttachmentsContextValue {
  const ctx = inject(AttachmentsKey)
  if (!ctx) {
    return {
      variant: computed(() => 'grid'),
    }
  }
  return ctx
}

export interface AttachmentContextValue {
  data: Ref<AttachmentData>
  mediaCategory: Ref<AttachmentMediaCategory>
  remove?: () => void
  variant: Ref<AttachmentVariant>
}

export const AttachmentKey: InjectionKey<AttachmentContextValue> = Symbol('Attachment')

export function useAttachmentContext(): AttachmentContextValue {
  const ctx = inject(AttachmentKey)
  if (!ctx) {
    throw new Error('Attachment components must be used within <Attachment>')
  }
  return ctx
}
```

```ts [types.ts] height=500 collapse
import type { FileUIPart, SourceDocumentUIPart } from 'ai'

export type AttachmentData
  = | (FileUIPart & { id: string })
    | (SourceDocumentUIPart & { id: string })

export type AttachmentMediaCategory
  = | 'image'
    | 'video'
    | 'audio'
    | 'document'
    | 'source'
    | 'unknown'

export type AttachmentVariant = 'grid' | 'inline' | 'list'
```

```ts [utils.ts] height=500 collapse
import type { AttachmentData, AttachmentMediaCategory } from './types'

export function getMediaCategory(data: AttachmentData): AttachmentMediaCategory {
  if (data.type === 'source-document') {
    return 'source'
  }

  const mediaType = data.mediaType ?? ''

  if (mediaType.startsWith('image/')) {
    return 'image'
  }
  if (mediaType.startsWith('video/')) {
    return 'video'
  }
  if (mediaType.startsWith('audio/')) {
    return 'audio'
  }
  if (mediaType.startsWith('application/') || mediaType.startsWith('text/')) {
    return 'document'
  }

  return 'unknown'
}

export function getAttachmentLabel(data: AttachmentData): string {
  if (data.type === 'source-document') {
    return data.title || data.filename || 'Source'
  }

  const category = getMediaCategory(data)
  return data.filename || (category === 'image' ? 'Image' : 'Attachment')
}
```

```ts [index.ts] height=500 collapse
export { default as Attachment } from './Attachment.vue'
export { default as AttachmentEmpty } from './AttachmentEmpty.vue'
export { default as AttachmentHoverCard } from './AttachmentHoverCard.vue'
export { default as AttachmentHoverCardContent } from './AttachmentHoverCardContent.vue'
export { default as AttachmentHoverCardTrigger } from './AttachmentHoverCardTrigger.vue'
export { default as AttachmentInfo } from './AttachmentInfo.vue'
export { default as AttachmentPreview } from './AttachmentPreview.vue'
export { default as AttachmentRemove } from './AttachmentRemove.vue'
export { default as Attachments } from './Attachments.vue'
export * from './context'
export * from './types'
export * from './utils'
```
::::

## Usage with AI SDK

Display user-uploaded files in chat messages or input areas.

```vue [pages/index.vue] height=500 collapse
<script setup lang="ts">
import type { AttachmentData } from '@/components/ai-elements/attachments'
import {
  Attachment,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
} from '@/components/ai-elements/attachments'

interface MessageProps {
  attachments: AttachmentData[]
  onRemove?: (id: string) => void
}

const props = defineProps<MessageProps>()
</script>

<template>
  <Attachments variant="grid">
    <Attachment
      v-for="file in props.attachments"
      :key="file.id"
      :data="file"
      @remove="props.onRemove && props.onRemove(file.id)"
    >
      <AttachmentPreview />
      <AttachmentRemove />
    </Attachment>
  </Attachments>
</template>
```

## Features

- Three display variants: grid (thumbnails), inline (badges), and list (rows)
- Supports both FileUIPart and SourceDocumentUIPart from the AI SDK
- Automatic media type detection (image, video, audio, document, source)
- Hover card support for inline previews
- Remove button with customizable callback
- Composable architecture for maximum flexibility
- Accessible with proper ARIA labels
- TypeScript support with exported utility functions

## Examples

### Grid Variant

Best for displaying attachments in messages with visual thumbnails.

:::ComponentLoader{label="Preview" componentName="Attachments"}
:::

### Inline Variant

Best for compact badge-style display in input areas with hover previews.

:::ComponentLoader{label="Preview" componentName="AttachmentsInline"}
:::

### List Variant

Best for file lists with full metadata display.

:::ComponentLoader{label="Preview" componentName="AttachmentsList"}
:::

## Props

### `<Attachments />`

Container component that sets the layout variant.

::field-group
  ::field{name="variant" type="'grid' | 'inline' | 'list'" defaultValue="'grid'"}
  The display layout variant.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the underlying div element.
  ::
::

### `<Attachment />`

Individual attachment item wrapper.

::field-group
  ::field{name="data" type="AttachmentData"}
  The attachment data (FileUIPart or SourceDocumentUIPart with id).
  ::
  ::field{name="@remove" type="event: void"}
  Emitted when the attachment's remove button is clicked.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the underlying div element.
  ::
::

### `<AttachmentPreview />`

Displays the media preview (image, video, or icon).

::field-group
  ::field{name="fallbackIcon" type="VNode" optional}
  Custom icon to display when no preview is available.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the underlying div element.
  ::
::

### `<AttachmentInfo />`

Displays the filename and optional media type.

::field-group
  ::field{name="showMediaType" type="boolean" defaultValue="false"}
  Whether to show the media type below the filename.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the underlying div element.
  ::
::

### `<AttachmentRemove />`

Remove button that appears on hover.

::field-group
  ::field{name="label" type="string" defaultValue="'Remove'"}
  Screen reader label for the button.
  ::
  ::field{name="...props" type="InstanceType<typeof Button>"}
  Spread to the underlying Button component.
  ::
::

### `<AttachmentHoverCard />`

Wrapper for hover preview functionality.

::field-group
  ::field{name="openDelay" type="number" defaultValue="0"}
  Delay in ms before opening the hover card.
  ::
  ::field{name="closeDelay" type="number" defaultValue="0"}
  Delay in ms before closing the hover card.
  ::
  ::field{name="...props" type="InstanceType<typeof HoverCard>"}
  Spread to the underlying HoverCard component.
  ::
::

### `<AttachmentHoverCardTrigger />`

Trigger element for the hover card.

::field-group
  ::field{name="...props" type="InstanceType<typeof HoverCardTrigger>"}
  Spread to the underlying HoverCardTrigger component.
  ::
::

### `<AttachmentHoverCardContent />`

Content displayed in the hover card.

::field-group
  ::field{name="align" type="'start' | 'center' | 'end'" defaultValue="'start'"}
  Alignment of the hover card content.
  ::
  ::field{name="...props" type="InstanceType<typeof HoverCardContent>"}
  Spread to the underlying HoverCardContent component.
  ::
::

### `<AttachmentEmpty />`

Empty state component when no attachments are present.

::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the underlying div element.
  ::
::

## Utility Functions

### `getMediaCategory(data)`

Returns the media category for an attachment.

```ts
import { getMediaCategory } from '@/components/ai-elements/attachments'

const category = getMediaCategory(attachment)
// Returns: 'image' | 'video' | 'audio' | 'document' | 'source' | 'unknown'
```

### `getAttachmentLabel(data)`

Returns the display label for an attachment.

```ts
import { getAttachmentLabel } from '@/components/ai-elements/attachments'

const label = getAttachmentLabel(attachment)
// Returns filename or fallback like 'Image' or 'Attachment'
```
