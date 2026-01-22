<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="cn('space-y-2', props.class)"
    v-bind="$attrs"
  >
    <span class="font-medium text-muted-foreground text-sm">
      Instructions
    </span>
    <div class="rounded-md bg-muted/50 p-3 text-muted-foreground text-sm">
      <p>
        <slot />
      </p>
    </div>
  </div>
</template>
