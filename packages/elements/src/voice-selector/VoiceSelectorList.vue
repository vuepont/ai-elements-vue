<script setup lang="ts">
import { CommandList } from '@repo/shadcn-vue/components/ui/command'

type VoiceSelectorListProps = InstanceType<typeof CommandList>['$props']

interface Props extends /* @vue-ignore */ VoiceSelectorListProps {}

defineProps<Props>()
</script>

<template>
  <CommandList>
    <slot />
  </CommandList>
</template>
