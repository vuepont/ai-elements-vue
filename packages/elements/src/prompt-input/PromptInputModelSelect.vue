<script setup lang="ts">
import { Select } from '@repo/shadcn-vue/components/ui/select'
import { useAttrs } from 'vue'

const attrs = useAttrs()
</script>

<template>
  <Select v-bind="attrs">
    <slot />
  </Select>
</template>
