<script setup lang="ts">
import { Select } from '@repo/shadcn-vue/components/ui/select'
</script>

<template>
  <Select v-bind="$attrs">
    <slot />
  </Select>
</template>
