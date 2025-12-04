<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DropdownMenuTrigger } from '@repo/shadcn-vue/components/ui/dropdown-menu'
import { PlusIcon } from 'lucide-vue-next'
import PromptInputButton from './PromptInputButton.vue'

type DropdownMenuTriggerProps = InstanceType<typeof DropdownMenuTrigger>['$props']

interface Props extends /* @vue-ignore */ DropdownMenuTriggerProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <DropdownMenuTrigger as-child>
    <PromptInputButton :class="props.class" v-bind="props">
      <slot><PlusIcon class="size-4" /></slot>
    </PromptInputButton>
  </DropdownMenuTrigger>
</template>
