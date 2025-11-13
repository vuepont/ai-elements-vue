<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { getUsage } from 'tokenlens'
import { computed, useSlots } from 'vue'
import { useContextValue } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { modelId, usage } = useContextValue()
const slots = useSlots()

const totalCost = computed(() => {
  if (!modelId.value)
    return 0

  const costUSD = getUsage({
    modelId: modelId.value,
    usage: {
      input: usage.value?.inputTokens ?? 0,
      output: usage.value?.outputTokens ?? 0,
    },
  }).costUSD?.totalUSD

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(costUSD ?? 0)
})
</script>

<template>
  <div
    :class="
      cn(
        'flex w-full items-center justify-between gap-3 bg-secondary p-3 text-xs',
        props.class,
      )
    "
  >
    <slot v-if="slots.default" />

    <template v-else>
      <span class="text-muted-foreground">Total cost</span>
      <span>{{ totalCost }}</span>
    </template>
  </div>
</template>
