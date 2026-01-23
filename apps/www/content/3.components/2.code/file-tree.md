---
title: File Tree
description: A hierarchical file system view component with expand/collapse and selection capabilities.
icon: lucide:folder-tree
---

The `FileTree` component provides a hierarchical view of files and folders with expand/collapse functionality and selection support.

:::ComponentLoader{label="Preview" componentName="FileTree"}
:::

## Install using CLI

:::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add file-tree
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/file-tree.json
  ```
  ::
:::

## Install Manually

Copy and paste the following files into the same folder.

:::code-group
  ```vue [FileTree.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { provide, ref, watch } from 'vue'
  import { FileTreeKey } from './context'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
    expanded?: Set<string>
    defaultExpanded?: Set<string>
    selectedPath?: string
  }

  const props = withDefaults(defineProps<Props>(), {
    defaultExpanded: () => new Set(),
  })

  const emit = defineEmits<{
    (e: 'update:expanded', value: Set<string>): void
    (e: 'update:selectedPath', value: string): void
    (e: 'select', value: string): void
    (e: 'expandedChange', value: Set<string>): void
  }>()

  const internalExpanded = ref(new Set(props.defaultExpanded))

  watch(
    () => props.expanded,
    (newVal) => {
      if (newVal) {
        internalExpanded.value = newVal
      }
    },
    { immediate: true },
  )

  function togglePath(path: string) {
    const newExpanded = new Set(internalExpanded.value)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    }
    else {
      newExpanded.add(path)
    }
    internalExpanded.value = newExpanded
    emit('update:expanded', newExpanded)
    emit('expandedChange', newExpanded)
  }

  function onSelect(path: string) {
    emit('update:selectedPath', path)
    emit('select', path)
  }

  provide(FileTreeKey, {
    expandedPaths: internalExpanded,
    togglePath,
    selectedPath: ref(props.selectedPath),
    onSelect,
  })
  </script>

  <template>
    <div
      :class="cn('rounded-lg border bg-background font-mono text-sm', props.class)"
      role="tree"
      v-bind="$attrs"
    >
      <div class="p-2">
        <slot />
      </div>
    </div>
  </template>
  ```

  ```vue [FileTreeFolder.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from '@repo/shadcn-vue/components/ui/collapsible'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import {
    ChevronRightIcon,
    FolderIcon,
    FolderOpenIcon,
  } from 'lucide-vue-next'
  import { computed, inject, provide } from 'vue'
  import { FileTreeFolderKey, FileTreeKey } from './context'
  import FileTreeIcon from './FileTreeIcon.vue'
  import FileTreeName from './FileTreeName.vue'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    path: string
    name: string
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const context = inject(FileTreeKey)

  if (!context) {
    throw new Error('FileTreeFolder must be used within FileTree')
  }

  const { expandedPaths, togglePath, selectedPath, onSelect } = context

  const isExpanded = computed(() => expandedPaths.value.has(props.path))
  const isSelected = computed(() => selectedPath.value === props.path)

  provide(FileTreeFolderKey, {
    path: props.path,
    name: props.name,
    isExpanded: isExpanded.value,
  })
  </script>

  <template>
    <Collapsible :open="isExpanded" @update:open="() => togglePath(props.path)">
      <div
        :class="cn('', props.class)"
        role="treeitem"
        tabindex="0"
        v-bind="$attrs"
      >
        <CollapsibleTrigger as-child>
          <button
            :class="
              cn(
                'flex w-full items-center gap-1 rounded px-2 py-1 text-left transition-colors hover:bg-muted/50',
                isSelected && 'bg-muted',
              )
            "
            type="button"
            @click="() => onSelect(props.path)"
          >
            <ChevronRightIcon
              :class="
                cn(
                  'size-4 shrink-0 text-muted-foreground transition-transform',
                  isExpanded && 'rotate-90',
                )
              "
            />
            <FileTreeIcon>
              <FolderOpenIcon v-if="isExpanded" class="size-4 text-blue-500" />
              <FolderIcon v-else class="size-4 text-blue-500" />
            </FileTreeIcon>
            <FileTreeName>{{ props.name }}</FileTreeName>
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div class="ml-4 border-l pl-2">
            <slot />
          </div>
        </CollapsibleContent>
      </div>
    </Collapsible>
  </template>
  ```

  ```vue [FileTreeFile.vue]
  <script setup lang="ts">
  import type { HTMLAttributes, VNode } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'
  import { FileIcon } from 'lucide-vue-next'
  import { computed, inject, provide } from 'vue'
  import { FileTreeFileKey, FileTreeKey } from './context'
  import FileTreeIcon from './FileTreeIcon.vue'
  import FileTreeName from './FileTreeName.vue'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    path: string
    name: string
    icon?: VNode
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()

  const context = inject(FileTreeKey)

  if (!context) {
    throw new Error('FileTreeFile must be used within FileTree')
  }

  const { selectedPath, onSelect } = context

  const isSelected = computed(() => selectedPath.value === props.path)

  provide(FileTreeFileKey, {
    path: props.path,
    name: props.name,
  })
  </script>

  <template>
    <div
      :class="
        cn(
          'flex cursor-pointer items-center gap-1 rounded px-2 py-1 transition-colors hover:bg-muted/50',
          isSelected && 'bg-muted',
          props.class,
        )
      "
      role="treeitem"
      tabindex="0"
      v-bind="$attrs"
      @click="() => onSelect(props.path)"
      @keydown.enter="() => onSelect(props.path)"
      @keydown.space="() => onSelect(props.path)"
    >
      <slot>
        <span class="size-4" /> <!-- Spacer for alignment -->
        <FileTreeIcon>
          <component :is="props.icon" v-if="props.icon" />
          <FileIcon v-else class="size-4 text-muted-foreground" />
        </FileTreeIcon>
        <FileTreeName>{{ props.name }}</FileTreeName>
      </slot>
    </div>
  </template>
  ```

  ```vue [FileTreeIcon.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <span :class="cn('shrink-0', props.class)" v-bind="$attrs">
      <slot />
    </span>
  </template>
  ```

  ```vue [FileTreeName.vue]
  <script setup lang="ts">
  import type { HTMLAttributes } from 'vue'
  import { cn } from '@repo/shadcn-vue/lib/utils'

  interface Props extends /* @vue-ignore */ HTMLAttributes {
    class?: HTMLAttributes['class']
  }

  const props = defineProps<Props>()
  </script>

  <template>
    <span :class="cn('truncate', props.class)" v-bind="$attrs">
      <slot />
    </span>
  </template>
  ```

  ```vue [FileTreeActions.vue]
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
      :class="cn('ml-auto flex items-center gap-1', props.class)"
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

  ```ts [context.ts]
  import type { InjectionKey, Ref } from 'vue'

  export interface FileTreeContextValue {
    expandedPaths: Ref<Set<string>>
    togglePath: (path: string) => void
    selectedPath: Ref<string | undefined>
    onSelect: (path: string) => void
  }

  export const FileTreeKey: InjectionKey<FileTreeContextValue> = Symbol('FileTree')

  export interface FileTreeFolderContextValue {
    path: string
    name: string
    isExpanded: boolean
  }

  export const FileTreeFolderKey: InjectionKey<FileTreeFolderContextValue> = Symbol('FileTreeFolder')

  export interface FileTreeFileContextValue {
    path: string
    name: string
  }

  export const FileTreeFileKey: InjectionKey<FileTreeFileContextValue> = Symbol('FileTreeFile')
  ```

  ```ts [index.ts]
  export { default as FileTree } from './FileTree.vue'
  export { default as FileTreeActions } from './FileTreeActions.vue'
  export { default as FileTreeFile } from './FileTreeFile.vue'
  export { default as FileTreeFolder } from './FileTreeFolder.vue'
  export { default as FileTreeIcon } from './FileTreeIcon.vue'
  export { default as FileTreeName } from './FileTreeName.vue'
  ```

:::

## Features

- Hierarchical file/folder display
- Expand/collapse folders
- Selection handling
- Controlled and uncontrolled modes
- Customizable icons
- Keyboard navigation

## Examples

### Basic Usage

:::ComponentLoader{label="Basic" componentName="FileTreeBasic"}
:::

### With Selection

:::ComponentLoader{label="Selection" componentName="FileTreeSelection"}
:::

### Default Expanded

:::ComponentLoader{label="Expanded" componentName="FileTreeExpanded"}
:::

## Props

### `<FileTree />`

:::field-group
  ::field{name="expanded" type="Set<string>"}
  Controlled set of expanded folder paths.
  ::
  ::field{name="defaultExpanded" type="Set<string>" default="new Set()"}
  Initial set of expanded folder paths.
  ::
  ::field{name="selectedPath" type="string"}
  Currently selected file/folder path.
  ::
  ::field{name="@select" type="(path: string) => void"}
  Callback when a file/folder is selected.
  ::
  ::field{name="@expandedChange" type="(expanded: Set<string>) => void"}
  Callback when expanded folders change.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the container div.
  ::
:::

### `<FileTreeFolder />`

:::field-group
  ::field{name="path" type="string" required}
  Unique identifier path for the folder.
  ::
  ::field{name="name" type="string" required}
  Display name of the folder.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the folder container.
  ::
:::

### `<FileTreeFile />`

:::field-group
  ::field{name="path" type="string" required}
  Unique identifier path for the file.
  ::
  ::field{name="name" type="string" required}
  Display name of the file.
  ::
  ::field{name="icon" type="Slot"}
  Custom icon for the file.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the file container.
  ::
:::

### `<FileTreeIcon />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the icon container span.
  ::
:::

### `<FileTreeName />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the name container span.
  ::
:::

### `<FileTreeActions />`

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Spread to the actions container div.
  ::
:::
