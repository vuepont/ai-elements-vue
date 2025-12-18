<script setup lang="ts">
import type { ToolUIPart } from 'ai'
import type { HTMLAttributes } from 'vue'
import type { ToolUIPartApproval } from './context'
import { Alert } from '@repo/shadcn-vue/components/ui/alert'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { toRef } from 'vue'
import { provideConfirmation } from './context'

const props = defineProps<{
  approval?: ToolUIPartApproval
  state: ToolUIPart['state']
  class?: HTMLAttributes['class']
}>()

provideConfirmation({
  approval: toRef(props, 'approval'),
  state: toRef(props, 'state'),
})
</script>

<template>
  <Alert
    v-if="approval && state !== 'input-streaming' && state !== 'input-available'"
    :class="cn('flex flex-col gap-2', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </Alert>
</template>
