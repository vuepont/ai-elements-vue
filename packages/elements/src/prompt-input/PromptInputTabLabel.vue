<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <h3 :class="cn('mb-2 px-3 font-medium text-muted-foreground text-xs', props.class)" v-bind="props">
    <slot />
  </h3>
</template>
