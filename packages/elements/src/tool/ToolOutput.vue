<script setup lang="ts">
import type { ToolUIPart } from 'ai'
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'
import { CodeBlock } from '../code-block'

const props = defineProps<{
  output: ToolUIPart['output']
  errorText: ToolUIPart['errorText']
  class?: HTMLAttributes['class']
}>()

const showOutput = computed(() => props.output || props.errorText)

const isObjectOutput = computed(
  () => typeof props.output === 'object' && props.output !== null,
)
const isStringOutput = computed(() => typeof props.output === 'string')

const formattedOutput = computed(() => {
  if (isObjectOutput.value) {
    return JSON.stringify(props.output, null, 2)
  }
  return props.output as string
})
</script>

<template>
  <div
    v-if="showOutput"
    :class="cn('space-y-2 p-4', props.class)"
    v-bind="$attrs"
  >
    <h4
      class="font-medium text-muted-foreground text-xs uppercase tracking-wide"
    >
      {{ props.errorText ? "Error" : "Result" }}
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
      <div v-if="errorText" class="p-3">
        {{ props.errorText }}
      </div>

      <CodeBlock
        v-else-if="isObjectOutput"
        :code="formattedOutput"
        language="json"
      />
      <CodeBlock
        v-else-if="isStringOutput"
        :code="formattedOutput"
        language="json"
      />
      <div v-else class="p-3">
        {{ props.output }}
      </div>
    </div>
  </div>
</template>
