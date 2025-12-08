<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { getUsage } from 'tokenlens'
import { computed } from 'vue'
import { useContextValue } from './context'
import TokensWithCost from './TokensWithCost.vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const { usage, modelId } = useContextValue()

const inputTokens = computed(() => usage.value?.inputTokens ?? 0)

const inputCostText = computed(() => {
  if (!modelId.value || !inputTokens.value)
    return undefined

  const inputCost = getUsage({
    modelId: modelId.value,
    usage: { input: inputTokens.value, output: 0 },
  }).costUSD?.totalUSD

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(inputCost ?? 0)
})
</script>

<template>
  <slot v-if="$slots.default" />

  <div
    v-else-if="inputTokens > 0"
    :class="
      cn('flex items-center justify-between text-xs', props.class)
    "
    v-bind="$attrs"
  >
    <span class="text-muted-foreground">Input</span>
    <TokensWithCost :cost-text="inputCostText" :tokens="inputTokens" />
  </div>
</template>
