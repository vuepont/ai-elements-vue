<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CardDescription } from '@repo/shadcn-vue/components/ui/card'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { Shimmer } from '../shimmer'
import { usePlan } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { isStreaming } = usePlan()
</script>

<template>
  <CardDescription
    :class="cn('text-balance', props.class)"
    data-slot="plan-description"
  >
    <Shimmer v-if="isStreaming">
      <slot />
    </Shimmer>
    <slot v-else />
  </CardDescription>
</template>
