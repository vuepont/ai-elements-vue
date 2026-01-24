<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { HttpMethod } from './context'
import { Badge } from '@repo/shadcn-vue/components/ui/badge'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useSchemaDisplayContext } from './context'

type BadgeProps = InstanceType<typeof Badge>['$props']

interface Props extends /* @vue-ignore */ BadgeProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { method } = useSchemaDisplayContext('SchemaDisplayMethod')

const methodStyles: Record<HttpMethod, string> = {
  GET: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  POST: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  PUT: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  PATCH:
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  DELETE: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
}
</script>

<template>
  <Badge
    :class="cn('font-mono text-xs', methodStyles[method], props.class)"
    variant="secondary"
    v-bind="$attrs"
  >
    <slot>{{ method }}</slot>
  </Badge>
</template>
