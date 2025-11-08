<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Separator } from '@repo/shadcn-vue/components/ui/separator'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="cn('flex items-center gap-0.5 text-muted-foreground', props.class)"
    v-bind="$attrs"
  >
    <slot />
    <Separator />
  </div>
</template>
