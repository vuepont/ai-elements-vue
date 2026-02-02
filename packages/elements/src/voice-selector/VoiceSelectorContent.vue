<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Command } from '@repo/shadcn-vue/components/ui/command'
import {
  DialogContent,
  DialogTitle,
} from '@repo/shadcn-vue/components/ui/dialog'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Voice Selector',
})
</script>

<template>
  <DialogContent
    :class="cn('p-0', props.class)"
    v-bind="$attrs"
  >
    <DialogTitle class="sr-only">
      {{ title }}
    </DialogTitle>
    <Command class="**:data-[slot=command-input-wrapper]:h-auto">
      <slot />
    </Command>
  </DialogContent>
</template>
