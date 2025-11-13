<script setup lang="ts">
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { HoverCardTrigger } from '@repo/shadcn-vue/components/ui/hover-card'
import { computed, useSlots } from 'vue'
import { useContextValue } from './context'
import ContextIcon from './ContextIcon.vue'

const { usedTokens, maxTokens } = useContextValue()
const slots = useSlots()

const renderedPercent = computed(() => {
  if (maxTokens.value === 0)
    return '0%'
  const usedPercent = usedTokens.value / maxTokens.value
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    maximumFractionDigits: 1,
  }).format(usedPercent)
})
</script>

<template>
  <HoverCardTrigger as-child>
    <slot v-if="slots.default" />

    <Button v-else type="button" variant="ghost" v-bind="$attrs">
      <span class="font-medium text-muted-foreground">
        {{ renderedPercent }}
      </span>
      <ContextIcon />
    </Button>
  </HoverCardTrigger>
</template>
