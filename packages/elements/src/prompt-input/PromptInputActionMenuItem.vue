<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { DropdownMenuItem } from '@repo/shadcn-vue/components/ui/dropdown-menu'
import { cn } from '@repo/shadcn-vue/lib/utils'

type PromptInputActionMenuItemProps = InstanceType<typeof DropdownMenuItem>['$props']

interface Props extends /* @vue-ignore */ PromptInputActionMenuItemProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <DropdownMenuItem :class="cn(props.class)">
    <slot />
  </DropdownMenuItem>
</template>
