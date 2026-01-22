<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Accordion } from '@repo/shadcn-vue/components/ui/accordion'
import { cn } from '@repo/shadcn-vue/lib/utils'

type AgentToolsProps = InstanceType<typeof Accordion>['$props']

interface Props extends /* @vue-ignore */ AgentToolsProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="cn('space-y-2', props.class)">
    <span class="font-medium text-muted-foreground text-sm">Tools</span>
    <Accordion
      class="rounded-md border"
      type="multiple"
      v-bind="$attrs"
    >
      <slot />
    </Accordion>
  </div>
</template>
