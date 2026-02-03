<script setup lang="ts">
import { HoverCard } from '@repo/shadcn-vue/components/ui/hover-card'

type AttachmentHoverCardProps = InstanceType<typeof HoverCard>['$props']

interface Props extends /* @vue-ignore */ AttachmentHoverCardProps {
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
