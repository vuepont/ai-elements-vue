<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { TabsTrigger } from '@repo/shadcn-vue/components/ui/tabs'
import { cn } from '@repo/shadcn-vue/lib/utils'

type TabsTriggerProps = InstanceType<typeof TabsTrigger>['$props']

interface Props extends /* @vue-ignore */ TabsTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <TabsTrigger
    :class="cn(
      'rounded-none border-0 border-transparent border-b-2 px-4 py-2 font-medium text-muted-foreground text-sm transition-colors data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none',
      props.class,
    )"
    :value="props.value"
    v-bind="$attrs"
  >
    <slot />
  </TabsTrigger>
</template>
