<script setup lang="ts">
import type { Component, HTMLAttributes } from 'vue'
import type { TestStatusType } from './context'
import { CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import {
  CheckCircle2,
  ChevronRight,
  Circle,
  CircleDot,
  XCircle,
} from 'lucide-vue-next'
import { useTestSuiteContext } from './context'

type TestSuiteNameProps = InstanceType<typeof CollapsibleTrigger>['$props']

interface Props extends /* @vue-ignore */ TestSuiteNameProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const context = useTestSuiteContext()

const statusStyles: Record<TestStatusType, string> = {
  passed: 'text-green-600 dark:text-green-400',
  failed: 'text-red-600 dark:text-red-400',
  skipped: 'text-yellow-600 dark:text-yellow-400',
  running: 'text-blue-600 dark:text-blue-400',
}

const statusIcons: Record<TestStatusType, Component> = {
  passed: CheckCircle2,
  failed: XCircle,
  skipped: Circle,
  running: CircleDot,
}
</script>

<template>
  <CollapsibleTrigger
    v-if="context"
    :class="cn(
      'group flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/50',
      props.class,
    )"
    v-bind="$attrs"
  >
    <ChevronRight
      class="size-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-90"
    />
    <span :class="cn('shrink-0', statusStyles[context.status])">
      <component
        :is="statusIcons[context.status]"
        :class="cn('size-4', context.status === 'running' && 'animate-pulse')"
      />
    </span>
    <span class="font-medium text-sm">
      <slot>{{ context.name }}</slot>
    </span>
  </CollapsibleTrigger>
</template>
