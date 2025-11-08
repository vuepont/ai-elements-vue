<script setup lang="ts">
import type { ToolUIPart } from 'ai'
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, useSlots } from 'vue'
import { CodeBlock } from '../code-block'

const props = defineProps<{
  class?: HTMLAttributes['class']
  output?: ToolUIPart['output']
  errorText?: ToolUIPart['errorText']
}>()

const slots = useSlots()

const derivedOutput = computed(() => {
  if (slots.default)
    return null
  const output = props.output
  if (output === null || output === undefined) {
    return null
  }

  if (typeof output === 'string') {
    return {
      type: 'code' as const,
      value: output,
    }
  }

  if (typeof output === 'object') {
    try {
      return {
        type: 'code' as const,
        value: JSON.stringify(output, null, 2),
      }
    }
    catch {
      return {
        type: 'text' as const,
        value: String(output),
      }
    }
  }

  return {
    type: 'text' as const,
    value: String(output),
  }
})

const shouldRender = computed(
  () =>
    !!slots.default
    || !!props.errorText
    || derivedOutput.value !== null,
)
</script>

<template>
  <template v-if="shouldRender">
    <div :class="cn('space-y-2 p-4', props.class)" v-bind="$attrs">
      <h4 class="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        {{ props.errorText ? 'Error' : 'Result' }}
      </h4>
      <div
        :class="
          cn(
            'overflow-x-auto rounded-md text-xs [&_table]:w-full',
            props.errorText
              ? 'bg-destructive/10 text-destructive'
              : 'bg-muted/50 text-foreground',
          )
        "
      >
        <div v-if="props.errorText">
          {{ props.errorText }}
        </div>
        <slot v-else />
        <template v-if="!slots.default && derivedOutput">
          <CodeBlock
            v-if="derivedOutput.type === 'code'"
            :code="derivedOutput.value"
            language="json"
          />
          <div v-else>
            {{ derivedOutput.value }}
          </div>
        </template>
      </div>
    </div>
  </template>
</template>
