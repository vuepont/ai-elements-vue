<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { Brain, ChevronDown } from 'lucide-vue-next'
import { computed } from 'vue'
import { Shimmer } from '../shimmer'
import { useReasoningContext } from './context'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()

const context = useReasoningContext()

const isStreaming = computed(() => context.isStreaming.value)
const isOpen = computed(() => context.isOpen.value)
const duration = computed(() => context.duration.value)

const showThinking = computed(
  () => isStreaming.value || duration.value === 0,
)

const hasDuration = computed(() => duration.value !== undefined)
</script>

<template>
  <CollapsibleTrigger
    :class="
      cn(
        'flex w-full items-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <slot>
      <Brain class="size-4" />
      <Shimmer v-if="showThinking" :duration="1">
        Thinking...
      </Shimmer>
      <p v-else-if="!hasDuration">
        Thought for a few seconds
      </p>
      <p v-else>
        Thought for {{ duration }} seconds
      </p>
      <ChevronDown
        :class="
          cn(
            'size-4 transition-transform',
            isOpen ? 'rotate-180' : 'rotate-0',
          )
        "
      />
    </slot>
  </CollapsibleTrigger>
</template>
