<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="
      cn(
        'mt-4 flex w-full items-center justify-between gap-4',
        props.class as string,
      )
    "
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
