<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { FileIcon } from '@lucide/vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

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
