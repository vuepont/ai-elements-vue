---
title: Commit
description: Display commit information with hash, message, author, and file changes.
icon: lucide:git-commit-horizontal
---

The `Commit` component displays commit details including hash, message, author, timestamp, and changed files.

:::ComponentLoader{label="Preview" componentName="Commit"}
:::

## Install using CLI

:::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add commit
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/commit.json
  ```
  ::
:::

## Install Manually

Copy and paste the following files into the same folder.

:::code-group
  ```vue [Commit.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { Collapsible } from '@repo/shadcn-vue/components/ui/collapsible'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <Collapsible
      :class="cn('rounded-lg border bg-background', props.class)"
      v-bind="$attrs"
    >
      <slot />
    </Collapsible>
  </template>
  ```

  ```vue [CommitHeader.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <CollapsibleTrigger
      as-child
      v-bind="$attrs"
    >
      <div
        :class="
          cn(
            'group flex cursor-pointer items-center justify-between gap-4 p-3 text-left transition-colors hover:opacity-80',
            props.class,
          )
        "
      >
        <slot />
      </div>
    </CollapsibleTrigger>
  </template>
  ```

  ```vue [CommitAuthor.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <div :class="cn('flex items-center', props.class)" v-bind="$attrs">
      <slot />
    </div>
  </template>
  ```

  ```vue [CommitAuthorAvatar.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { Avatar, AvatarFallback } from '@repo/shadcn-vue/components/ui/avatar'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    initials: string
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <Avatar :class="cn('size-8', props.class)" v-bind="$attrs">
      <AvatarFallback class="text-xs">
        {{ props.initials }}
      </AvatarFallback>
    </Avatar>
  </template>
  ```

  ```vue [CommitInfo.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <div :class="cn('flex flex-1 flex-col', props.class)" v-bind="$attrs">
      <slot />
    </div>
  </template>
  ```

  ```vue [CommitMessage.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <span :class="cn('font-medium text-sm', props.class)" v-bind="$attrs">
      <slot />
    </span>
  </template>
  ```

  ```vue [CommitMetadata.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <div
      :class="
        cn(
          'flex items-center gap-2 text-muted-foreground text-xs',
          props.class,
        )
      "
      v-bind="$attrs"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [CommitHash.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { GitCommitIcon } from 'lucide-vue-next'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <span :class="cn('font-mono text-xs', props.class)" v-bind="$attrs">
      <GitCommitIcon class="mr-1 inline-block size-3" />
      <slot />
    </span>
  </template>
  ```

  ```vue [CommitSeparator.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <span :class="props.class" v-bind="$attrs">
      <slot>•</slot>
    </span>
  </template>
  ```

  ```vue [CommitTimestamp.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { computed } from 'vue'

  const props = defineProps<{
    date: Date
    class?: HTMLAttributes['class']
  }>()

  const formatted = computed(() => {
    return new Intl.RelativeTimeFormat('en', {
      numeric: 'auto',
    }).format(
      Math.round((props.date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day',
    )
  })
  </script>

  <template>
    <time
      :class="cn('text-xs', props.class)"
      :datetime="props.date.toISOString()"
      v-bind="$attrs"
    >
      <slot>{{ formatted }}</slot>
    </time>
  </template>
  ```

  ```vue [CommitActions.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <div
      :class="cn('flex items-center gap-1', props.class)"
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

  ```vue [CommitCopyButton.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { Button } from '@repo/shadcn-vue/components/ui/button'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { CheckIcon, CopyIcon } from 'lucide-vue-next'
  import { computed, onBeforeUnmount, ref } from 'vue'

  const props = withDefaults(
    defineProps<{
      hash: string
      timeout?: number
      class?: HTMLAttributes['class']
    }>(),
    {
      timeout: 2000,
    },
  )

  const emit = defineEmits<{
    (event: 'copy'): void
    (event: 'error', error: Error): void
  }>()

  const isCopied = ref(false)
  let resetTimer: ReturnType<typeof setTimeout> | undefined

  const icon = computed(() => (isCopied.value ? CheckIcon : CopyIcon))

  async function copyToClipboard() {
    if (typeof window === 'undefined' || !navigator?.clipboard?.writeText) {
      const error = new Error('Clipboard API not available')
      emit('error', error)
      return
    }

    try {
      await navigator.clipboard.writeText(props.hash)
      isCopied.value = true
      emit('copy')

      if (resetTimer) {
        clearTimeout(resetTimer)
      }

      resetTimer = setTimeout(() => {
        isCopied.value = false
      }, props.timeout)
    }
    catch (error) {
      emit('error', error instanceof Error ? error : new Error('Copy failed'))
    }
  }

  onBeforeUnmount(() => {
    if (resetTimer) {
      clearTimeout(resetTimer)
    }
  })
  </script>

  <template>
    <Button
      :class="cn('size-7 shrink-0', props.class)"
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

  ```vue [CommitContent.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { CollapsibleContent } from '@repo/shadcn-vue/components/ui/collapsible'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <CollapsibleContent
      :class="cn('border-t p-3', props.class)"
      v-bind="$attrs"
    >
      <slot />
    </CollapsibleContent>
  </template>
  ```

  ```vue [CommitFiles.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <div :class="cn('space-y-1', props.class)" v-bind="$attrs">
      <slot />
    </div>
  </template>
  ```

  ```vue [CommitFile.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <div
      :class="
        cn(
          'flex items-center justify-between gap-2 rounded px-2 py-1 text-sm hover:bg-muted/50',
          props.class,
        )
      "
      v-bind="$attrs"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [CommitFileInfo.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <div
      :class="cn('flex min-w-0 items-center gap-2', props.class)"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [CommitFileStatus.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    status: 'added' | 'modified' | 'deleted' | 'renamed'
    class?: HTMLAttributes['class']
  }>()

  const fileStatusStyles = {
    added: 'text-green-600 dark:text-green-400',
    modified: 'text-yellow-600 dark:text-yellow-400',
    deleted: 'text-red-600 dark:text-red-400',
    renamed: 'text-blue-600 dark:text-blue-400',
  }

  const fileStatusLabels = {
    added: 'A',
    modified: 'M',
    deleted: 'D',
    renamed: 'R',
  }
  </script>

  <template>
    <span
      :class="
        cn(
          'font-medium font-mono text-xs',
          fileStatusStyles[props.status],
          props.class,
        )
      "
      v-bind="$attrs"
    >
      <slot>{{ fileStatusLabels[props.status] }}</slot>
    </span>
  </template>
  ```

  ```vue [CommitFileIcon.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { FileIcon } from 'lucide-vue-next'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <FileIcon
      :class="cn('size-3.5 shrink-0 text-muted-foreground', props.class)"
      v-bind="$attrs"
    />
  </template>
  ```

  ```vue [CommitFilePath.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <span :class="cn('truncate font-mono text-xs', props.class)" v-bind="$attrs">
      <slot />
    </span>
  </template>
  ```

  ```vue [CommitFileChanges.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  const props = defineProps<{
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <div
      :class="
        cn(
          'flex shrink-0 items-center gap-1 font-mono text-xs',
          props.class,
        )
      "
      v-bind="$attrs"
    >
      <slot />
    </div>
  </template>
  ```

  ```vue [CommitFileAdditions.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { PlusIcon } from 'lucide-vue-next'

  const props = defineProps<{
    count: number
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <span
      v-if="props.count > 0"
      :class="cn('text-green-600 dark:text-green-400', props.class)"
      v-bind="$attrs"
    >
      <slot>
        <PlusIcon class="inline-block size-3" />
        {{ props.count }}
      </slot>
    </span>
  </template>
  ```

  ```vue [CommitFileDeletions.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { MinusIcon } from 'lucide-vue-next'

  const props = defineProps<{
    count: number
    class?: HTMLAttributes['class']
  }>()
  </script>

  <template>
    <span
      v-if="props.count > 0"
      :class="cn('text-red-600 dark:text-red-400', props.class)"
      v-bind="$attrs"
    >
      <slot>
        <MinusIcon class="inline-block size-3" />
        {{ props.count }}
      </slot>
    </span>
  </template>
  ```

  ```ts [index.ts]
  export { default as Commit } from './Commit.vue'
  export { default as CommitActions } from './CommitActions.vue'
  export { default as CommitAuthor } from './CommitAuthor.vue'
  export { default as CommitAuthorAvatar } from './CommitAuthorAvatar.vue'
  export { default as CommitContent } from './CommitContent.vue'
  export { default as CommitCopyButton } from './CommitCopyButton.vue'
  export { default as CommitFile } from './CommitFile.vue'
  export { default as CommitFileAdditions } from './CommitFileAdditions.vue'
  export { default as CommitFileChanges } from './CommitFileChanges.vue'
  export { default as CommitFileDeletions } from './CommitFileDeletions.vue'
  export { default as CommitFileIcon } from './CommitFileIcon.vue'
  export { default as CommitFileInfo } from './CommitFileInfo.vue'
  export { default as CommitFilePath } from './CommitFilePath.vue'
  export { default as CommitFiles } from './CommitFiles.vue'
  export { default as CommitFileStatus } from './CommitFileStatus.vue'
  export { default as CommitHash } from './CommitHash.vue'
  export { default as CommitHeader } from './CommitHeader.vue'
  export { default as CommitInfo } from './CommitInfo.vue'
  export { default as CommitMessage } from './CommitMessage.vue'
  export { default as CommitMetadata } from './CommitMetadata.vue'
  export { default as CommitSeparator } from './CommitSeparator.vue'
  export { default as CommitTimestamp } from './CommitTimestamp.vue'
  ```
:::

## Features

- Commit hash display with copy button
- Author avatar with initials
- Relative timestamp formatting
- Collapsible file changes list
- Color-coded file status (added/modified/deleted/renamed)
- Line additions/deletions count

## File Status

| Status | Label | Color |
|--------|-------|-------|
| `added` | A | Green |
| `modified` | M | Yellow |
| `deleted` | D | Red |
| `renamed` | R | Blue |

## Props

### `<Commit />`

:::field-group
  ::field{name="...props" type="CollapsibleProps"}
  Spread to the Collapsible component.
  ::
:::

### `<CommitHeader />`

:::field-group
  ::field{name="...props" type="CollapsibleTriggerProps"}
  Spread to the CollapsibleTrigger component.
  ::
:::

### `<CommitAuthor />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the container div.
  ::
:::

### `<CommitAuthorAvatar />`

:::field-group
  ::field{name="initials" type="string" required}
  Author initials to display.
  ::
  ::field{name="...props" type="AvatarProps"}
  Spread to the Avatar component.
  ::
:::

### `<CommitInfo />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the container div.
  ::
:::

### `<CommitMessage />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the span element.
  ::
:::

### `<CommitMetadata />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the container div.
  ::
:::

### `<CommitHash />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the span element.
  ::
:::

### `<CommitSeparator />`

:::field-group
  ::field{name="default" type="Slot"}
  Custom separator content. Defaults to "•".
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the span element.
  ::
:::

### `<CommitTimestamp />`

:::field-group
  ::field{name="date" type="Date" required}
  Commit date.
  ::
  ::field{name="default" type="Slot"}
  Custom timestamp content. Defaults to relative time.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the time element.
  ::
:::

### `<CommitActions />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the container div.
  ::
:::

### `<CommitCopyButton />`

:::field-group
  ::field{name="hash" type="string" required}
  Commit hash to copy.
  ::
  ::field{name="timeout" type="number" default="2000"}
  Duration to show copied state (ms).
  ::
  ::field{name="@copy" type="() => void"}
  Callback after successful copy.
  ::
  ::field{name="@error" type="(error: Error) => void"}
  Callback if copying fails.
  ::
  ::field{name="...props" type="ButtonProps"}
  Spread to the Button component.
  ::
:::

### `<CommitContent />`

:::field-group
  ::field{name="...props" type="CollapsibleContentProps"}
  Spread to the CollapsibleContent component.
  ::
:::

### `<CommitFiles />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the container div.
  ::
:::

### `<CommitFile />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the row div.
  ::
:::

### `<CommitFileInfo />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the container div.
  ::
:::

### `<CommitFileStatus />`

:::field-group
  ::field{name="status" type='"added" | "modified" | "deleted" | "renamed"' required}
  File change status.
  ::
  ::field{name="default" type="Slot"}
  Custom status label.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the span element.
  ::
:::

### `<CommitFileIcon />`

:::field-group
  ::field{name="...props" type="LucideIconProps"}
  Spread to the FileIcon component.
  ::
:::

### `<CommitFilePath />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the span element.
  ::
:::

### `<CommitFileChanges />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the container div.
  ::
:::

### `<CommitFileAdditions />`

:::field-group
  ::field{name="count" type="number" required}
  Number of lines added.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the span element.
  ::
:::

### `<CommitFileDeletions />`

:::field-group
  ::field{name="count" type="number" required}
  Number of lines deleted.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the span element.
  ::
:::
