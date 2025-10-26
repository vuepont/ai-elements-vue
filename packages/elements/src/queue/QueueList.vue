<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ScrollArea } from '@repo/shadcn-vue/components/ui/scroll-area'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <ScrollArea
    :class="cn('-mb-1 mt-2', props.class)"
    v-bind="$attrs"
  >
    <div class="max-h-40 pr-4">
      <ul>
        <slot />
      </ul>
    </div>
  </ScrollArea>
</template>
