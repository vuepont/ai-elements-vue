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

const outputTokens = computed(() => usage.value?.outputTokens ?? 0)

const outputCostText = computed(() => {
  if (!modelId.value || !outputTokens.value)
    return undefined

  const outputCost = getUsage({
    modelId: modelId.value,
    usage: { input: 0, output: outputTokens.value },
  }).costUSD?.totalUSD

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(outputCost ?? 0)
})
</script>

<template>
  <slot v-if="$slots.default" />
  <div
    v-else-if="outputTokens > 0"
    :class="
      cn('flex items-center justify-between text-xs', props.class)
    "
    v-bind="$attrs"
  >
    <span class="text-muted-foreground">Output</span>
    <TokensWithCost :cost-text="outputCostText" :tokens="outputTokens" />
  </div>
</template>
