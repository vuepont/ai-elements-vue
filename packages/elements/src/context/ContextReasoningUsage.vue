<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { getUsage } from 'tokenlens'
import { computed, useSlots } from 'vue'
import { useContextSchema } from './context'
import ContextTokensWithCost from './ContextTokensWithCost.vue'
import { formatCurrency } from './utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const slots = useSlots()
const context = useContextSchema()

const reasoningTokens = computed(
  () => context.value.usage?.reasoningTokens ?? 0,
)

const costText = computed(() => {
  const { modelId } = context.value
  if (!modelId || !reasoningTokens.value) {
    return undefined
  }

  const cost = getUsage({
    modelId,
    usage: { reasoningTokens: reasoningTokens.value },
  }).costUSD?.totalUSD

  return formatCurrency(cost)
})

const shouldRender = computed(() => !!slots.default || !!reasoningTokens.value)
</script>

<template>
  <slot v-if="slots.default" />
  <div
    v-else-if="shouldRender"
    :class="cn('flex items-center justify-between text-xs', props.class)"
    v-bind="$attrs"
  >
    <span class="text-muted-foreground">Reasoning</span>
    <ContextTokensWithCost
      :cost-text="costText"
      :tokens="reasoningTokens"
    />
  </div>
</template>
