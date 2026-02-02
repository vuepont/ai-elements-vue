<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import {
  CircleIcon,
  MarsIcon,
  MarsStrokeIcon,
  NonBinaryIcon,
  TransgenderIcon,
  VenusAndMarsIcon,
  VenusIcon,
} from 'lucide-vue-next'

interface Props {
  class?: HTMLAttributes['class']
  value?:
    | 'male'
    | 'female'
    | 'transgender'
    | 'androgyne'
    | 'non-binary'
    | 'intersex'
}

defineProps<Props>()
</script>

<template>
  <span
    :class="cn('text-muted-foreground text-xs', $props.class)"
    v-bind="$attrs"
  >
    <slot>
      <MarsIcon v-if="value === 'male'" class="size-4" />
      <VenusIcon v-else-if="value === 'female'" class="size-4" />
      <TransgenderIcon v-else-if="value === 'transgender'" class="size-4" />
      <MarsStrokeIcon v-else-if="value === 'androgyne'" class="size-4" />
      <NonBinaryIcon v-else-if="value === 'non-binary'" class="size-4" />
      <VenusAndMarsIcon v-else-if="value === 'intersex'" class="size-4" />
      <!-- Use CircleIcon as a fallback for CircleSmallIcon if it doesn't exist -->
      <CircleIcon v-else class="size-1" fill="currentColor" />
    </slot>
  </span>
</template>
