<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'

const props = defineProps<{
  title?: string
  url?: string
  description?: string
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div :class="cn('space-y-1', props.class)">
    <h4 v-if="title" class="truncate font-medium text-sm leading-tight">
      {{ title }}
    </h4>
    <p v-if="url" class="truncate break-all text-muted-foreground text-xs">
      {{ url }}
    </p>
    <p v-if="description" class="line-clamp-3 text-muted-foreground text-sm leading-relaxed">
      {{ description }}
    </p>
    <slot />
  </div>
</template>
