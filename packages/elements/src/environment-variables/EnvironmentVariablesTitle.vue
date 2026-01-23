<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <h3 :class="cn('font-medium text-sm', props.class)" v-bind="$attrs">
    <slot>Environment Variables</slot>
  </h3>
</template>
