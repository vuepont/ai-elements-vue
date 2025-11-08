<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { getUsage } from 'tokenlens'
import { computed } from 'vue'
import { useContextSchema } from './context'
import { formatCurrency } from './utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const context = useContextSchema()

const totalCost = computed(() => {
  const { modelId, usage } = context.value
  if (!modelId) {
    return formatCurrency(undefined)
  }

  const cost = getUsage({
    modelId,
    usage: {
      input: usage?.inputTokens ?? 0,
      output: usage?.outputTokens ?? 0,
    },
  }).costUSD?.totalUSD

  return formatCurrency(cost)
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
    v-bind="$attrs"
  >
    <slot>
      <span class="text-muted-foreground">Total cost</span>
      <span>{{ totalCost }}</span>
    </slot>
  </div>
</template>
