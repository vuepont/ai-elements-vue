<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SelectValue } from '@repo/shadcn-vue/components/ui/select'
import { cn } from '@repo/shadcn-vue/lib/utils'

type PromptInputSelectValueProps = InstanceType<typeof SelectValue>['$props']

interface Props extends /* @vue-ignore */ PromptInputSelectValueProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <SelectValue :class="cn(props.class)" v-bind="props">
    <slot />
  </SelectValue>
</template>
