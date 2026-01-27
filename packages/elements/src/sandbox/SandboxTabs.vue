<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Tabs } from '@repo/shadcn-vue/components/ui/tabs'
import { cn } from '@repo/shadcn-vue/lib/utils'

type TabsProps = InstanceType<typeof Tabs>['$props']

interface Props extends /* @vue-ignore */ TabsProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Tabs :class="cn('w-full gap-0', props.class)" v-bind="$attrs">
    <slot />
  </Tabs>
</template>
