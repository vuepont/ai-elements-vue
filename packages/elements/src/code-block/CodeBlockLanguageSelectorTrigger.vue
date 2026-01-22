<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SelectTrigger } from '@repo/shadcn-vue/components/ui/select'
import { cn } from '@repo/shadcn-vue/lib/utils'

type CodeBlockLanguageSelectorTriggerProps = InstanceType<typeof SelectTrigger>['$props']

interface Props extends /* @vue-ignore */ CodeBlockLanguageSelectorTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <SelectTrigger
    :class="cn(
      'h-7 border-none bg-transparent px-2 text-xs shadow-none',
      props.class,
    )"
    size="sm"
    v-bind="$attrs"
  >
    <slot />
  </SelectTrigger>
</template>
