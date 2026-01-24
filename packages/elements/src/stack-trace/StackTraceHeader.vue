<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import {
  Collapsible,
  CollapsibleTrigger,
} from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useStackTraceContext } from './context'

type CollapsibleTriggerProps = InstanceType<typeof CollapsibleTrigger>['$props']

interface Props extends /* @vue-ignore */ CollapsibleTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { isOpen, setIsOpen } = useStackTraceContext('StackTraceHeader')
</script>

<template>
  <Collapsible :open="isOpen" @update:open="setIsOpen">
    <CollapsibleTrigger as-child v-bind="$attrs">
      <div
        :class="cn(
          'flex w-full cursor-pointer items-center gap-3 p-3 text-left transition-colors hover:bg-muted/50',
          props.class,
        )"
      >
        <slot />
      </div>
    </CollapsibleTrigger>
  </Collapsible>
</template>
