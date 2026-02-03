<script setup lang="ts">
import { CommandEmpty } from '@repo/shadcn-vue/components/ui/command'

type VoiceSelectorEmptyProps = InstanceType<typeof CommandEmpty>['$props']

interface Props extends /* @vue-ignore */ VoiceSelectorEmptyProps {}

defineProps<Props>()
</script>

<template>
  <CommandEmpty>
    <slot />
  </CommandEmpty>
</template>
