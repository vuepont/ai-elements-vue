<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import {
  CircleSmallIcon,
  MarsIcon,
  MarsStrokeIcon,
  NonBinaryIcon,
  TransgenderIcon,
  VenusAndMarsIcon,
  VenusIcon,
} from 'lucide-vue-next'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
  value?:
    | 'male'
    | 'female'
    | 'transgender'
    | 'androgyne'
    | 'non-binary'
    | 'intersex'
}

const props = defineProps<Props>()
</script>

<template>
  <span
    :class="cn('text-muted-foreground text-xs', props.class)"
  >
    <slot>
      <MarsIcon v-if="props.value === 'male'" class="size-4" />
      <VenusIcon v-else-if="props.value === 'female'" class="size-4" />
      <TransgenderIcon v-else-if="props.value === 'transgender'" class="size-4" />
      <MarsStrokeIcon v-else-if="props.value === 'androgyne'" class="size-4" />
      <NonBinaryIcon v-else-if="props.value === 'non-binary'" class="size-4" />
      <VenusAndMarsIcon v-else-if="props.value === 'intersex'" class="size-4" />
      <CircleSmallIcon v-else class="size-1" fill="currentColor" />
    </slot>
  </span>
</template>
