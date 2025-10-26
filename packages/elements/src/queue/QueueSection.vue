<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Collapsible } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface QueueSectionProps {
  defaultOpen?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(
  defineProps<QueueSectionProps>(),
  {
    defaultOpen: true,
  },
)
</script>

<template>
  <Collapsible
    :class="cn(props.class)"
    :default-open="props.defaultOpen"
  >
    <slot />
  </Collapsible>
</template>
