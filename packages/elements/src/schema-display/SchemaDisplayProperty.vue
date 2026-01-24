<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { SchemaProperty } from './context'
import { Badge } from '@repo/shadcn-vue/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ChevronRightIcon } from 'lucide-vue-next'
import { computed } from 'vue'

interface Props extends /* @vue-ignore */ HTMLAttributes, SchemaProperty {
  depth?: number
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  depth: 0,
})

const hasChildren = computed(() => !!(props.properties || props.items))
const paddingLeft = computed(() => 40 + props.depth * 16)
</script>

<template>
  <Collapsible v-if="hasChildren" :default-open="depth < 2">
    <CollapsibleTrigger
      :class="cn(
        'group flex w-full items-center gap-2 py-3 text-left transition-colors hover:bg-muted/50',
        props.class,
      )"
      :style="{ paddingLeft: `${paddingLeft}px` }"
    >
      <ChevronRightIcon class="size-4 shrink-0 text-muted-foreground transition-transform group-data-[state=open]:rotate-90" />
      <span class="font-mono text-sm">{{ name }}</span>
      <Badge class="text-xs" variant="outline">
        {{ type }}
      </Badge>
      <Badge
        v-if="required"
        class="bg-red-100 text-red-700 text-xs dark:bg-red-900/30 dark:text-red-400"
        variant="secondary"
      >
        required
      </Badge>
    </CollapsibleTrigger>
    <p
      v-if="description"
      class="pb-2 text-muted-foreground text-sm"
      :style="{ paddingLeft: `${paddingLeft + 24}px` }"
    >
      {{ description }}
    </p>
    <CollapsibleContent>
      <div class="divide-y border-t">
        <SchemaDisplayProperty
          v-for="prop in properties"
          :key="prop.name"
          v-bind="prop"
          :depth="depth + 1"
        />
        <SchemaDisplayProperty
          v-if="items"
          v-bind="items"
          :depth="depth + 1"
          :name="`${name}[]`"
        />
      </div>
    </CollapsibleContent>
  </Collapsible>

  <div
    v-else
    :class="cn('py-3 pr-4', props.class)"
    :style="{ paddingLeft: `${paddingLeft}px` }"
    v-bind="$attrs"
  >
    <div class="flex items-center gap-2">
      <span class="size-4" /> <!-- Spacer for alignment -->
      <span class="font-mono text-sm">{{ name }}</span>
      <Badge class="text-xs" variant="outline">
        {{ type }}
      </Badge>
      <Badge
        v-if="required"
        class="bg-red-100 text-red-700 text-xs dark:bg-red-900/30 dark:text-red-400"
        variant="secondary"
      >
        required
      </Badge>
    </div>
    <p v-if="description" class="mt-1 pl-6 text-muted-foreground text-sm">
      {{ description }}
    </p>
  </div>
</template>
