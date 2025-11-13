<script setup lang="ts">
import { DialogTrigger } from '@repo/shadcn-vue/components/ui/dialog'
</script>

<template>
  <DialogTrigger v-bind="$attrs">
    <slot />
  </DialogTrigger>
</template>
