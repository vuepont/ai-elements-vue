<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <pre
    :class="cn(
      'mx-4 mb-4 overflow-auto rounded-md bg-muted p-4 font-mono text-sm',
      props.class,
    )"
    v-bind="$attrs"
  >
    <slot />
  </pre>
</template>
