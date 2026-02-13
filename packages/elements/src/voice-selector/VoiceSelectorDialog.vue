<script setup lang="ts">
import { CommandDialog } from '@repo/shadcn-vue/components/ui/command'

type VoiceSelectorDialogProps = InstanceType<typeof CommandDialog>['$props']

interface Props extends /* @vue-ignore */ VoiceSelectorDialogProps {}

defineProps<Props>()
</script>

<template>
  <CommandDialog>
    <slot />
  </CommandDialog>
</template>
