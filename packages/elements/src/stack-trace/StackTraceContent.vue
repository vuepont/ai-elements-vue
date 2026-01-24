<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CollapsibleContent } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'

type CollapsibleContentProps = InstanceType<typeof CollapsibleContent>['$props']

interface Props extends /* @vue-ignore */ CollapsibleContentProps {
  maxHeight?: number
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  maxHeight: 400,
})
</script>

<template>
  <CollapsibleContent
    :class="cn(
      'overflow-auto border-t bg-muted/30',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=open]:animate-in',
      props.class,
    )"
    :style="{ maxHeight: `${props.maxHeight}px` }"
    v-bind="$attrs"
  >
    <slot />
  </CollapsibleContent>
</template>
