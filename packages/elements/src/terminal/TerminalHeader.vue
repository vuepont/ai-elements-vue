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
    :class="cn(
      'flex items-center justify-between border-zinc-800 border-b px-4 py-2',
      props.class,
    )"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
