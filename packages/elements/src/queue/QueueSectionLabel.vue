<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ChevronDownIcon } from 'lucide-vue-next'

interface QueueSectionLabelProps {
  count?: number
  label: string
  class?: HTMLAttributes['class']
}

const props = defineProps<QueueSectionLabelProps>()
</script>

<template>
  <span :class="cn('flex items-center gap-2', props.class)">
    <ChevronDownIcon
      class="group-data-[state=closed]:-rotate-90 size-4 transition-transform"
    />
    <slot name="icon" />
    <span>
      {{ count }}
      {{ label }}
    </span>
  </span>
</template>
