<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ChevronDownIcon } from '@lucide/vue'
import { CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  count: number
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <CollapsibleTrigger
    :class="cn('flex items-center gap-2', props.class)"
  >
    <slot>
      <p class="font-medium">
        Used {{ props.count }} sources
      </p>
      <ChevronDownIcon class="h-4 w-4" />
    </slot>
  </CollapsibleTrigger>
</template>
