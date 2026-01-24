<!-- StatusBadge.vue -->
<script setup lang="ts">
import type { DynamicToolUIPart, ToolUIPart } from 'ai'
import type { Component } from 'vue'
import { Badge } from '@repo/shadcn-vue/components/ui/badge'
import {
  CheckCircleIcon,
  CircleIcon,
  ClockIcon,
  XCircleIcon,
} from 'lucide-vue-next'
import { computed } from 'vue'

export type ToolPart = ToolUIPart | DynamicToolUIPart

const props = defineProps<{
  state: ToolPart['state']
}>()

const label = computed(() => {
  const labels: Record<ToolPart['state'], string> = {
    'input-streaming': 'Pending',
    'input-available': 'Running',
    'approval-requested': 'Awaiting Approval',
    'approval-responded': 'Responded',
    'output-available': 'Completed',
    'output-error': 'Error',
    'output-denied': 'Denied',
  }
  return labels[props.state]
})

const icon = computed<Component>(() => {
  const icons: Record<ToolPart['state'], Component> = {
    'input-streaming': CircleIcon,
    'input-available': ClockIcon,
    'approval-requested': ClockIcon,
    'approval-responded': CheckCircleIcon,
    'output-available': CheckCircleIcon,
    'output-error': XCircleIcon,
    'output-denied': XCircleIcon,
  }
  return icons[props.state]
})

const iconClass = computed(() => {
  const classes: Record<ToolPart['state'], string> = {
    'input-streaming': 'size-4',
    'input-available': 'size-4 animate-pulse',
    'approval-requested': 'size-4 text-yellow-600',
    'approval-responded': 'size-4 text-blue-600',
    'output-available': 'size-4 text-green-600',
    'output-error': 'size-4 text-red-600',
    'output-denied': 'size-4 text-orange-600',
  }
  return classes[props.state]
})
</script>

<template>
  <Badge class="gap-1.5 rounded-full text-xs" variant="secondary">
    <component :is="icon" :class="iconClass" />
    <span>{{ label }}</span>
  </Badge>
</template>
