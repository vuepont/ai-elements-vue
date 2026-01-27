<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'

type CommitHeaderProps = InstanceType<typeof CollapsibleTrigger>['$props']

interface Props extends /* @vue-ignore */ CommitHeaderProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <CollapsibleTrigger
    as-child
    v-bind="$attrs"
  >
    <div
      :class="
        cn(
          'group flex cursor-pointer items-center justify-between gap-4 p-3 text-left transition-colors hover:opacity-80',
          props.class,
        )
      "
    >
      <slot />
    </div>
  </CollapsibleTrigger>
</template>
