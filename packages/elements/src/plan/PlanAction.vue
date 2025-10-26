<script setup lang="ts">
import { CardAction } from '@repo/shadcn-vue/components/ui/card'
</script>

<template>
  <CardAction data-slot="plan-action">
    <slot />
  </CardAction>
</template>
