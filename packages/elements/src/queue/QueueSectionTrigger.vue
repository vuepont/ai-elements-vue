<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <CollapsibleTrigger as-child>
    <button
      :class="
        cn(
          'group flex w-full items-center justify-between rounded-md bg-sidebar px-3 py-2 text-left font-medium text-muted-foreground text-sm transition-colors hover:bg-muted',
          props.class,
        )
      "
      type="button"
    >
      <slot />
    </button>
  </CollapsibleTrigger>
</template>
