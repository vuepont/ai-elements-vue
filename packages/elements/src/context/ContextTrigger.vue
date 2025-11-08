<script setup lang="ts">
import type { ButtonVariants } from '@repo/shadcn-vue/components/ui/button'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { HoverCardTrigger } from '@repo/shadcn-vue/components/ui/hover-card'
import { computed, useAttrs, useSlots } from 'vue'
import { useContextSchema } from './context'
import ContextIcon from './ContextIcon.vue'
import { formatPercent } from './utils'

interface Props {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}

const props = withDefaults(
  defineProps<Props>(),
  {
    variant: 'ghost',
    size: 'default',
  },
)

const attrs = useAttrs()
const slots = useSlots()
const context = useContextSchema()

const usedPercent = computed(() => {
  const { usedTokens, maxTokens } = context.value
  if (!maxTokens) {
    return 0
  }
  return usedTokens / maxTokens
})

const displayPercent = computed(() => formatPercent(usedPercent.value))
</script>

<template>
  <HoverCardTrigger as-child>
    <slot v-if="slots.default" />
    <Button
      v-else
      :size="props.size"
      type="button"
      :variant="props.variant"
      v-bind="attrs"
    >
      <span class="font-medium text-muted-foreground">
        {{ displayPercent }}
      </span>
      <ContextIcon />
    </Button>
  </HoverCardTrigger>
</template>
