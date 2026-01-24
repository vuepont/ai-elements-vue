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
      'mt-2 overflow-auto font-mono text-red-600 text-xs dark:text-red-400',
      props.class,
    )"
    v-bind="$attrs"
  ><slot /></pre>
</template>
