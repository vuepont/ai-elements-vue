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

const cacheTokens = computed(() => usage.value?.cachedInputTokens ?? 0)

const cacheCostText = computed(() => {
  if (!modelId.value || !cacheTokens.value)
    return undefined

  const cacheCost = getUsage({
    modelId: modelId.value,
    usage: { cacheReads: cacheTokens.value, input: 0, output: 0 },
  }).costUSD?.totalUSD

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cacheCost ?? 0)
})
</script>

<template>
  <slot v-if="$slots.default" />
  <div
    v-else-if="cacheTokens > 0"
    :class="
      cn('flex items-center justify-between text-xs', props.class)
    "
    v-bind="$attrs"
  >
    <span class="text-muted-foreground">Cache</span>
    <TokensWithCost :cost-text="cacheCostText" :tokens="cacheTokens" />
  </div>
</template>
