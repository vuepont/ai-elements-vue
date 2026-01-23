<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Badge } from '@repo/shadcn-vue/components/ui/badge'
import { cn } from '@repo/shadcn-vue/lib/utils'

type BadgeProps = InstanceType<typeof Badge>['$props']

interface Props extends /* @vue-ignore */ BadgeProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Badge
    :class="cn('text-xs', props.class)"
    variant="secondary"
    v-bind="$attrs"
  >
    <slot>Required</slot>
  </Badge>
</template>
