<script setup lang="ts">
import type { CSSProperties, HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
  language: string
}>()

const style: CSSProperties = {
  contentVisibility: 'auto',
  containIntrinsicSize: 'auto 200px',
}
</script>

<template>
  <div
    :class="cn(
      'group relative w-full overflow-hidden rounded-md border bg-background text-foreground',
      props.class,
    )"
    :data-language="props.language"
    :style="style"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
