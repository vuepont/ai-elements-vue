<script setup lang="ts">
import type { ToolUIPart } from 'ai'
import type { HTMLAttributes } from 'vue'
import type { ToolUIPartApproval } from './context'
import { Alert } from '@repo/shadcn-vue/components/ui/alert'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'
import {
  createConfirmationContext,

} from './context'

interface Props {
  class?: HTMLAttributes['class']
  approval?: ToolUIPartApproval
  state: ToolUIPart['state']
}

const props = defineProps<Props>()

const shouldRender = computed(
  () =>
    props.approval
    && props.state !== 'input-streaming'
    && props.state !== 'input-available',
)

createConfirmationContext(() => ({
  approval: props.approval,
  state: props.state,
}))
</script>

<template>
  <Alert
    v-if="shouldRender"
    :class="cn('flex flex-col gap-2', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </Alert>
</template>
