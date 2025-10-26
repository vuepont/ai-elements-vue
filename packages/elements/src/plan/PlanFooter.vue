<script setup lang="ts">
import { CardFooter } from '@repo/shadcn-vue/components/ui/card'
</script>

<template>
  <CardFooter data-slot="plan-footer">
    <slot />
  </CardFooter>
</template>
