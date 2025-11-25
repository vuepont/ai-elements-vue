<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { PaperclipIcon } from 'lucide-vue-next'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <span
    :class="
      cn(
        'flex items-center gap-1 rounded border bg-muted px-2 py-1 text-xs',
        props.class,
      )
    "
  >
    <PaperclipIcon :size="12" />
    <span class="max-w-[100px] truncate">
      <slot />
    </span>
  </span>
</template>
