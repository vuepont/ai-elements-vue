<script setup lang="ts">
import { CommandEmpty } from '@repo/shadcn-vue/components/ui/command'

type CommandEmptyProps = InstanceType<typeof CommandEmpty>['$props']

interface Props extends /* @vue-ignore */ CommandEmptyProps {}

const props = defineProps<Props>()
</script>

<template>
  <CommandEmpty v-bind="props">
    <slot>No microphone found.</slot>
  </CommandEmpty>
</template>
