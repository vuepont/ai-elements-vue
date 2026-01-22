<script setup lang="ts">
import { SelectValue } from '@repo/shadcn-vue/components/ui/select'
</script>

<template>
  <SelectValue v-bind="$attrs">
    <slot />
  </SelectValue>
</template>
