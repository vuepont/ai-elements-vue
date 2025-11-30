<script setup lang="ts">
import { HoverCard } from '@repo/shadcn-vue/components/ui/hover-card'

type PromptInputHoverCardProps = InstanceType<typeof HoverCard>['$props']

interface Props extends /* @vue-ignore */ PromptInputHoverCardProps {
  openDelay?: number
  closeDelay?: number
}

const props = withDefaults(defineProps<Props>(), {
  openDelay: 0,
  closeDelay: 0,
})

const { openDelay, closeDelay, ...restProps } = props
</script>

<template>
  <HoverCard :open-delay="openDelay" :close-delay="closeDelay" v-bind="restProps">
    <slot />
  </HoverCard>
</template>
