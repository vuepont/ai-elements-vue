<script setup lang="ts">
import { CommandSeparator } from '@repo/shadcn-vue/components/ui/command'

type VoiceSelectorSeparatorProps = InstanceType<typeof CommandSeparator>['$props']

interface Props extends /* @vue-ignore */ VoiceSelectorSeparatorProps {}

defineProps<Props>()
</script>

<template>
  <CommandSeparator>
    <slot />
  </CommandSeparator>
</template>
