<script setup lang="ts">
import { CommandInput } from '@repo/shadcn-vue/components/ui/command'

type CommandInputProps = InstanceType<typeof CommandInput>['$props']

interface Props extends /* @vue-ignore */ CommandInputProps {}

const props = defineProps<Props>()
</script>

<template>
  <CommandInput
    placeholder="Search microphones..."
    v-bind="props"
  />
</template>
