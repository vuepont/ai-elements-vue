<script setup lang="ts">
import { SelectItem } from '@repo/shadcn-vue/components/ui/select'
</script>

<template>
  <SelectItem v-bind="$attrs">
    <slot />
  </SelectItem>
</template>
