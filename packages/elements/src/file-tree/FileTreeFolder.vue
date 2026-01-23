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
