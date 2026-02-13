<script setup lang="ts">
import { DialogTrigger } from '@repo/shadcn-vue/components/ui/dialog'

type VoiceSelectorTriggerProps = InstanceType<typeof DialogTrigger>['$props']

interface Props extends /* @vue-ignore */ VoiceSelectorTriggerProps {}

defineProps<Props>()
</script>

<template>
  <DialogTrigger>
    <slot />
  </DialogTrigger>
</template>
