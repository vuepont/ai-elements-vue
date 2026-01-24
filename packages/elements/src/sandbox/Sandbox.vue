<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Collapsible } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'

type CollapsibleProps = InstanceType<typeof Collapsible>['$props']

interface Props extends /* @vue-ignore */ CollapsibleProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Collapsible
    :class="cn(
      'not-prose group mb-4 w-full overflow-hidden rounded-md border',
      props.class,
    )"
    :default-open="true"
    v-bind="$attrs"
  >
    <slot />
  </Collapsible>
</template>
