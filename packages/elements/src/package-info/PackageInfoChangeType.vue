<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ChangeType } from './context'
import { Badge } from '@repo/shadcn-vue/components/ui/badge'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ArrowRightIcon, MinusIcon, PlusIcon } from 'lucide-vue-next'
import { computed, inject } from 'vue'
import { PackageInfoKey } from './context'

type BadgeProps = InstanceType<typeof Badge>['$props']

interface Props extends /* @vue-ignore */ BadgeProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const context = inject(PackageInfoKey)

if (!context) {
  throw new Error('PackageInfoChangeType must be used within PackageInfo')
}

const { changeType } = context

const changeTypeStyles: Record<ChangeType, string> = {
  major: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  minor:
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  patch: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  added: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  removed: 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400',
}

const icon = computed(() => {
  switch (changeType) {
    case 'added':
      return PlusIcon
    case 'removed':
      return MinusIcon
    default:
      return ArrowRightIcon
  }
})
</script>

<template>
  <Badge
    v-if="changeType"
    :class="cn(
      'gap-1 text-xs capitalize',
      changeTypeStyles[changeType],
      props.class,
    )"
    variant="secondary"
    v-bind="$attrs"
  >
    <component :is="icon" class="size-3" />
    <slot>{{ changeType }}</slot>
  </Badge>
</template>
