<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { TestResultsSummaryData } from './context'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, provide, reactive } from 'vue'
import { TestResultsContextKey } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  summary?: TestResultsSummaryData
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const context = reactive({
  summary: computed(() => props.summary),
})

provide(TestResultsContextKey, context)
</script>

<template>
  <div
    :class="cn('rounded-lg border bg-background', props.class)"
    v-bind="$attrs"
  >
    <slot>
      <TestResultsHeader v-if="summary">
        <TestResultsSummary />
        <TestResultsDuration />
      </TestResultsHeader>
    </slot>
  </div>
</template>
