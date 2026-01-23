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
