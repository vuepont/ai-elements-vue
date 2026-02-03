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
        'flex items-center justify-center p-4 text-muted-foreground text-sm',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <slot> No attachments </slot>
  </div>
</template>
