<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CollapsibleContent } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'

type CollapsibleContentProps = InstanceType<typeof CollapsibleContent>['$props']

interface Props extends /* @vue-ignore */ CollapsibleContentProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <CollapsibleContent
    :class="cn(
      'data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2 outline-none data-[state=closed]:animate-out data-[state=open]:animate-in',
      props.class,
    )"
    v-bind="$attrs"
  >
    <slot />
  </CollapsibleContent>
</template>
