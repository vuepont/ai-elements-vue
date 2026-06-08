<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ChevronDown, Search } from '@lucide/vue'
import {
  CollapsibleTrigger,
} from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface TaskTriggerProps {
  title: string
  class?: HTMLAttributes['class']
}

const props = defineProps<TaskTriggerProps>()
</script>

<template>
  <CollapsibleTrigger as-child :class="cn('group', props.class)">
    <slot>
      <div
        class="flex w-full cursor-pointer items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
      >
        <Search class="size-4" />
        <p class="text-sm">
          {{ props.title }}
        </p>
        <ChevronDown
          class="size-4 transition-transform group-data-[state=open]:rotate-180"
        />
      </div>
    </slot>
  </CollapsibleTrigger>
</template>
