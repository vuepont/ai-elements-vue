<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Command } from '@repo/shadcn-vue/components/ui/command'
import { DialogContent } from '@repo/shadcn-vue/components/ui/dialog'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <DialogContent :class="cn('p-0', props.class)" v-bind="$attrs">
    <Command class="**:data-[slot=command-input-wrapper]:h-auto">
      <slot />
    </Command>
  </DialogContent>
</template>
