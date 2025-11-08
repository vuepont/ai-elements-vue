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

const cacheTokens = computed(
  () => context.value.usage?.cachedInputTokens ?? 0,
)

const costText = computed(() => {
  const { modelId } = context.value
  if (!modelId || !cacheTokens.value) {
    return undefined
  }

  const cost = getUsage({
    modelId,
    usage: {
      cacheReads: cacheTokens.value,
      input: 0,
      output: 0,
    },
  }).costUSD?.totalUSD

  return formatCurrency(cost)
})

const shouldRender = computed(() => !!slots.default || !!cacheTokens.value)
</script>

<template>
  <slot v-if="slots.default" />
  <div
    v-else-if="shouldRender"
    :class="cn('flex items-center justify-between text-xs', props.class)"
    v-bind="$attrs"
  >
    <span class="text-muted-foreground">Cache</span>
    <ContextTokensWithCost
      :cost-text="costText"
      :tokens="cacheTokens"
    />
  </div>
</template>
