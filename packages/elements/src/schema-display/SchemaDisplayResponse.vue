<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ChevronRightIcon } from 'lucide-vue-next'
import { useSchemaDisplayContext } from './context'
import SchemaDisplayProperty from './SchemaDisplayProperty.vue'

type CollapsibleProps = InstanceType<typeof Collapsible>['$props']

interface Props extends /* @vue-ignore */ CollapsibleProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { responseBody } = useSchemaDisplayContext('SchemaDisplayResponse')
</script>

<template>
  <Collapsible :class="cn(props.class)" :default-open="true" v-bind="$attrs">
    <CollapsibleTrigger class="group flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/50">
      <ChevronRightIcon class="size-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-90" />
      <span class="font-medium text-sm">Response</span>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <div class="border-t">
        <slot>
          <SchemaDisplayProperty
            v-for="prop in responseBody"
            :key="prop.name"
            v-bind="prop"
            :depth="0"
          />
        </slot>
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
