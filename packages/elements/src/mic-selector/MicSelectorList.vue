<script setup lang="ts">
import { CommandGroup, CommandList } from '@repo/shadcn-vue/components/ui/command'
import { useMicSelector } from './context'

type CommandListProps = InstanceType<typeof CommandList>['$props']

interface Props extends /* @vue-ignore */ CommandListProps {}

const props = defineProps<Props>()

const { devices } = useMicSelector('MicSelectorList')
</script>

<template>
  <CommandList v-bind="props">
    <CommandGroup>
      <slot :devices="devices" />
    </CommandGroup>
  </CommandList>
</template>
