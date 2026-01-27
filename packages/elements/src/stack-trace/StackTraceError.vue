<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { AlertTriangleIcon } from 'lucide-vue-next'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div
    :class="cn(
      'flex flex-1 items-center gap-2 overflow-hidden',
      props.class,
    )"
    v-bind="$attrs"
  >
    <AlertTriangleIcon class="size-4 shrink-0 text-destructive" />
    <slot />
  </div>
</template>
