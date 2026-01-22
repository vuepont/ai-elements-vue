<script setup lang="ts">
import { SelectContent } from '@repo/shadcn-vue/components/ui/select'

withDefaults(defineProps<{
  align?: 'start' | 'center' | 'end'
}>(), {
  align: 'end',
})
</script>

<template>
  <SelectContent :align="align" v-bind="$attrs">
    <slot />
  </SelectContent>
</template>
