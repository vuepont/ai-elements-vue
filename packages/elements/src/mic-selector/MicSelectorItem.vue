<script setup lang="ts">
import { CommandItem } from '@repo/shadcn-vue/components/ui/command'
import { useMicSelector } from './context'

type CommandItemProps = InstanceType<typeof CommandItem>['$props']

interface Props extends /* @vue-ignore */ CommandItemProps {}

const props = defineProps<Props>()

const { setValue, setOpen } = useMicSelector('MicSelectorItem')

function handleSelect() {
  if (props.value) {
    setValue(props.value)
    setOpen(false)
  }
}
</script>

<template>
  <CommandItem
    v-bind="props"
    @select="handleSelect"
  >
    <slot />
  </CommandItem>
</template>
