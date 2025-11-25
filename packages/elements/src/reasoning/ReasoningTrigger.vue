<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { BrainIcon, ChevronDownIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import { Shimmer } from '../shimmer'
import { useReasoningContext } from './context'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { isStreaming, isOpen, duration } = useReasoningContext()

const thinkingMessage = computed(() => {
  if (isStreaming.value || duration.value === 0) {
    return 'thinking'
  }
  if (duration.value === undefined) {
    return 'default_done'
  }
  return 'duration_done'
})
</script>

<template>
  <CollapsibleTrigger
    :class="cn(
      'flex w-full items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground',
      props.class,
    )"
  >
    <slot>
      <BrainIcon class="size-4" />

      <template v-if="thinkingMessage === 'thinking'">
        <Shimmer :duration="1">
          Thinking...
        </Shimmer>
      </template>

      <template v-else-if="thinkingMessage === 'default_done'">
        <p>Thought for a few seconds</p>
      </template>

      <template v-else>
        <p>Thought for {{ duration }} seconds</p>
      </template>

      <ChevronDownIcon
        :class="cn(
          'size-4 transition-transform',
          isOpen ? 'rotate-180' : 'rotate-0',
        )"
      />
    </slot>
  </CollapsibleTrigger>
</template>
