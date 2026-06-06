<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Command } from '@repo/shadcn-vue/components/ui/command'
import { DialogContent, DialogTitle } from '@repo/shadcn-vue/components/ui/dialog'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  title?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Model Selector',
})
const value = defineModel<AcceptableValue | AcceptableValue[]>()
</script>

<template>
  <DialogContent
    :class="cn('p-0', props.class)"
    v-bind="$attrs"
  >
    <DialogTitle class="sr-only">
      {{ props.title }}
    </DialogTitle>
    <Command v-model="value" class="**:data-[slot=command-input-wrapper]:h-auto">
      <slot />
    </Command>
  </DialogContent>
</template>
