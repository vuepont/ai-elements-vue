<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Collapsible } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <Collapsible
    :class="cn('group not-prose mb-4 w-full rounded-md border', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </Collapsible>
</template>
