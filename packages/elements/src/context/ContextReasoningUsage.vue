<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { getUsage } from 'tokenlens'
import { computed, useSlots } from 'vue'
import { useContextValue } from './context'
import TokensWithCost from './TokensWithCost.vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { usage, modelId } = useContextValue()
const slots = useSlots()

const reasoningTokens = computed(() => usage.value?.reasoningTokens ?? 0)

const reasoningCostText = computed(() => {
  if (!modelId.value || !reasoningTokens.value)
    return undefined

  const reasoningCost = getUsage({
    modelId: modelId.value,
    usage: { reasoningTokens: reasoningTokens.value },
  }).costUSD?.totalUSD

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(reasoningCost ?? 0)
})
</script>

<template>
  <slot v-if="slots.default" />
  <div
    v-else-if="reasoningTokens > 0"
    :class="
      cn('flex items-center justify-between text-xs', props.class)
    "
    v-bind="$attrs"
  >
    <span class="text-muted-foreground">Reasoning</span>
    <TokensWithCost
      :cost-text="reasoningCostText"
      :tokens="reasoningTokens"
    />
  </div>
</template>
