<script setup lang="ts">
import { HoverCardContent } from '@repo/shadcn-vue/components/ui/hover-card'

type PromptInputHoverCardContentProps = InstanceType<typeof HoverCardContent>['$props']

interface Props extends /* @vue-ignore */ PromptInputHoverCardContentProps {}

const props = withDefaults(defineProps<Props>(), {
  align: 'start',
})

const { align, ...restProps } = props
</script>

<template>
  <HoverCardContent :align="props.align" v-bind="restProps">
    <slot />
  </HoverCardContent>
</template>
