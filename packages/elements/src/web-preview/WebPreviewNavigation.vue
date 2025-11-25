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
    v-bind="{
      ...props,
      class: cn('flex items-center gap-1 border-b p-2', props.class),
    }"
  >
    <slot />
  </div>
</template>
