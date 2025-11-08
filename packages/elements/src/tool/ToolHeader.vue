<script setup lang="ts">
import type { ToolUIPart } from 'ai'
import type { HTMLAttributes } from 'vue'
import { Badge } from '@repo/shadcn-vue/components/ui/badge'
import { CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import {
  CheckCircle,
  ChevronDown,
  Circle,
  Clock,
  Wrench,
  XCircle,
} from 'lucide-vue-next'
import { computed } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  title?: string
  type: ToolUIPart['type']
  state: ToolUIPart['state']
}>()

const STATUS_LABELS: Record<ToolUIPart['state'], string> = {
  'input-streaming': 'Pending',
  'input-available': 'Running',
  'approval-requested': 'Awaiting Approval',
  'approval-responded': 'Responded',
  'output-available': 'Completed',
  'output-error': 'Error',
  'output-denied': 'Denied',
}

const displayTitle = computed(() => {
  if (props.title)
    return props.title
  const [, ...rest] = props.type.split('-')
  return rest.length ? rest.join('-') : props.type
})
</script>

<template>
  <CollapsibleTrigger
    :class="cn('group flex w-full items-center justify-between gap-4 p-3', props.class)"
    v-bind="$attrs"
  >
    <div class="flex items-center gap-2">
      <Wrench class="size-4 text-muted-foreground" />
      <span class="font-medium text-sm">
        {{ displayTitle }}
      </span>
      <Badge class="gap-1.5 rounded-full text-xs" variant="secondary">
        <Circle v-if="props.state === 'input-streaming'" class="size-4" />
        <Clock
          v-else-if="props.state === 'input-available'"
          class="size-4 animate-pulse"
        />
        <Clock
          v-else-if="props.state === 'approval-requested'"
          class="size-4 text-yellow-600"
        />
        <CheckCircle
          v-else-if="props.state === 'approval-responded'"
          class="size-4 text-blue-600"
        />
        <CheckCircle
          v-else-if="props.state === 'output-available'"
          class="size-4 text-green-600"
        />
        <XCircle
          v-else-if="props.state === 'output-error'"
          class="size-4 text-red-600"
        />
        <XCircle
          v-else
          class="size-4 text-orange-600"
        />
        {{ STATUS_LABELS[props.state] }}
      </Badge>
    </div>
    <ChevronDown class="size-4 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
  </CollapsibleTrigger>
</template>
