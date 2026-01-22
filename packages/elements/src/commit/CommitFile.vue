<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="
      cn(
        'flex items-center justify-between gap-2 rounded px-2 py-1 text-sm hover:bg-muted/50',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
