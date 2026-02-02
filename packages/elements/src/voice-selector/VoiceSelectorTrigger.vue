<script setup lang="ts">
import { DialogTrigger } from '@repo/shadcn-vue/components/ui/dialog'

interface Props {
  asChild?: boolean
}

defineProps<Props>()
</script>

<template>
  <DialogTrigger :as-child="asChild">
    <slot />
  </DialogTrigger>
</template>
