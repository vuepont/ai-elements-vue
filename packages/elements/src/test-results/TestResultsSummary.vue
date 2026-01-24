<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Badge } from '@repo/shadcn-vue/components/ui/badge'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { CheckCircle2, Circle, XCircle } from 'lucide-vue-next'
import { useTestResultsContext } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { summary } = useTestResultsContext()
</script>

<template>
  <div
    v-if="summary"
    :class="cn('flex items-center gap-3', props.class)"
    v-bind="$attrs"
  >
    <slot>
      <Badge
        class="gap-1 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
        variant="secondary"
      >
        <CheckCircle2 class="size-3" />
        {{ summary.passed }} passed
      </Badge>
      <Badge
        v-if="summary.failed > 0"
        class="gap-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
        variant="secondary"
      >
        <XCircle class="size-3" />
        {{ summary.failed }} failed
      </Badge>
      <Badge
        v-if="summary.skipped > 0"
        class="gap-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
        variant="secondary"
      >
        <Circle class="size-3" />
        {{ summary.skipped }} skipped
      </Badge>
    </slot>
  </div>
</template>
