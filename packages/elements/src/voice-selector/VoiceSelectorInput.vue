<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CommandInput } from '@repo/shadcn-vue/components/ui/command'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
  placeholder?: string
}

const props = defineProps<Props>()
</script>

<template>
  <CommandInput
    :class="cn('h-auto py-3.5', props.class)"
    :placeholder="placeholder"
    v-bind="$attrs"
  />
</template>
