<script setup lang="ts">
import { HoverCardTrigger } from '@repo/shadcn-vue/components/ui/hover-card'

type AttachmentHoverCardTriggerProps = InstanceType<typeof HoverCardTrigger>['$props']

interface Props extends /* @vue-ignore */ AttachmentHoverCardTriggerProps {}

const props = defineProps<Props>()
</script>

<template>
  <HoverCardTrigger v-bind="props">
    <slot />
  </HoverCardTrigger>
</template>
