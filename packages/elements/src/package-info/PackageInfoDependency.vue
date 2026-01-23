<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  name: string
  version?: string
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="cn('flex items-center justify-between text-sm', props.class)"
    v-bind="$attrs"
  >
    <slot>
      <span class="font-mono text-muted-foreground">{{ name }}</span>
      <span v-if="version" class="font-mono text-xs">{{ version }}</span>
    </slot>
  </div>
</template>
