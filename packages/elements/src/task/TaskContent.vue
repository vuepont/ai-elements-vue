<script setup lang='ts'>
import type { HTMLAttributes } from 'vue'
import {
  CollapsibleContent,
} from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface TaskContentProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<TaskContentProps>()
</script>

<template>
  <CollapsibleContent
    :class="cn(
      'data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 text-popover-foreground outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
      props.class,
    )"
    v-bind="$attrs"
  >
    <div class="mt-4 space-y-2 border-l-2 border-muted pl-4">
      <slot />
    </div>
  </CollapsibleContent>
</template>
