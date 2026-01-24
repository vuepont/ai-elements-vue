<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Badge } from '@repo/shadcn-vue/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ChevronRightIcon } from 'lucide-vue-next'
import { useSchemaDisplayContext } from './context'
import SchemaDisplayParameter from './SchemaDisplayParameter.vue'

type CollapsibleProps = InstanceType<typeof Collapsible>['$props']

interface Props extends /* @vue-ignore */ CollapsibleProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { parameters } = useSchemaDisplayContext('SchemaDisplayParameters')
</script>

<template>
  <Collapsible :class="cn(props.class)" :default-open="true" v-bind="$attrs">
    <CollapsibleTrigger class="group flex w-full items-center gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/50">
      <ChevronRightIcon class="size-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-90" />
      <span class="font-medium text-sm">Parameters</span>
      <Badge class="ml-auto text-xs" variant="secondary">
        {{ parameters?.length }}
      </Badge>
    </CollapsibleTrigger>
    <CollapsibleContent>
      <div class="divide-y border-t">
        <slot>
          <SchemaDisplayParameter
            v-for="param in parameters"
            :key="param.name"
            v-bind="param"
          />
        </slot>
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
