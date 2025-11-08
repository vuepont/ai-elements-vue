<script setup lang="ts">
import type { LanguageModelUsage } from 'ai'
import type { HoverCardRootProps } from 'reka-ui'
import { HoverCard } from '@repo/shadcn-vue/components/ui/hover-card'
import { computed, useAttrs } from 'vue'
import { provideContext } from './context'

interface Props {
  usedTokens: number
  maxTokens: number
  usage?: LanguageModelUsage
  modelId?: string
  closeDelay?: HoverCardRootProps['closeDelay']
  openDelay?: HoverCardRootProps['openDelay']
}

const props = withDefaults(
  defineProps<Props>(),
  {
    closeDelay: 0,
    openDelay: 0,
  },
)

const attrs = useAttrs()

const hoverCardProps = computed(() => ({
  ...attrs,
  closeDelay: props.closeDelay,
  openDelay: props.openDelay,
}))

provideContext(() => ({
  usedTokens: props.usedTokens,
  maxTokens: props.maxTokens,
  usage: props.usage,
  modelId: props.modelId,
}))
</script>

<template>
  <HoverCard v-bind="hoverCardProps">
    <slot />
  </HoverCard>
</template>
