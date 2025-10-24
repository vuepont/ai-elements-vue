<script setup lang="ts">
import { DropdownMenu } from '@repo/shadcn-vue/components/ui/dropdown-menu'
import { provideOpenInContext } from './context'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  query: string
}>()

provideOpenInContext({ query: props.query })
</script>

<template>
  <DropdownMenu v-bind="$attrs">
    <slot />
  </DropdownMenu>
</template>
