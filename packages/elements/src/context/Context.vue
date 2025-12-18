<script setup lang="ts">
import type { LanguageModelUsage } from 'ai'
import type { ModelId } from './context'
import { HoverCard } from '@repo/shadcn-vue/components/ui/hover-card'
import { computed } from 'vue'
import { provideContext } from './context'

interface Props {
  usedTokens: number
  maxTokens: number
  usage?: LanguageModelUsage
  modelId?: ModelId
}

const props = defineProps<Props>()

provideContext({
  usedTokens: computed(() => props.usedTokens),
  maxTokens: computed(() => props.maxTokens),
  usage: computed(() => props.usage),
  modelId: computed(() => props.modelId),
})
</script>

<template>
  <HoverCard :close-delay="0" :open-delay="0" v-bind="{ ...$attrs, ...props }">
    <slot />
  </HoverCard>
</template>
