<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { SchemaParameter } from './context'
import { Badge } from '@repo/shadcn-vue/components/ui/badge'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props extends /* @vue-ignore */ HTMLAttributes, SchemaParameter {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <div :class="cn('px-4 py-3 pl-10', props.class)" v-bind="$attrs">
    <div class="flex items-center gap-2">
      <span class="font-mono text-sm">{{ name }}</span>
      <Badge class="text-xs" variant="outline">
        {{ type }}
      </Badge>
      <Badge v-if="location" class="text-xs" variant="secondary">
        {{ location }}
      </Badge>
      <Badge
        v-if="required"
        class="bg-red-100 text-red-700 text-xs dark:bg-red-900/30 dark:text-red-400"
        variant="secondary"
      >
        required
      </Badge>
    </div>
    <p v-if="description" class="mt-1 text-muted-foreground text-sm">
      {{ description }}
    </p>
  </div>
</template>
