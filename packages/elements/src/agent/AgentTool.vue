<script setup lang="ts">
import type { Tool } from 'ai'
import type { HTMLAttributes } from 'vue'
import { CodeBlock } from '@repo/elements/code-block'
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@repo/shadcn-vue/components/ui/accordion'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'

type AgentToolProps = InstanceType<typeof AccordionItem>['$props']

interface Props extends /* @vue-ignore */ AgentToolProps {
  tool: Tool
  value: string
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const schema = computed(() => {
  return 'jsonSchema' in props.tool && props.tool.jsonSchema
    ? props.tool.jsonSchema
    : props.tool.inputSchema
})

const schemaString = computed(() => JSON.stringify(schema.value, null, 2))
</script>

<template>
  <AccordionItem
    :class="cn('border-b last:border-b-0', props.class)"
    :value="props.value"
    v-bind="$attrs"
  >
    <AccordionTrigger class="px-3 py-2 text-sm hover:no-underline">
      {{ props.tool.description ?? "No description" }}
    </AccordionTrigger>
    <AccordionContent class="px-3 pb-3">
      <div class="rounded-md bg-muted/50">
        <CodeBlock :code="schemaString" language="json" />
      </div>
    </AccordionContent>
  </AccordionItem>
</template>
