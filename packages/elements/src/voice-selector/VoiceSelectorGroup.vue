<script setup lang="ts">
import { CommandGroup } from '@repo/shadcn-vue/components/ui/command'

type VoiceSelectorGroupProps = InstanceType<typeof CommandGroup>['$props']

interface Props extends /* @vue-ignore */ VoiceSelectorGroupProps {}

defineProps<Props>()
</script>

<template>
  <CommandGroup>
    <slot />
  </CommandGroup>
</template>
