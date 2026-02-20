<script setup lang="ts">
import { CommandItem } from '@repo/shadcn-vue/components/ui/command'
import { computed } from 'vue'
import { useMicSelector } from './context'

type CommandItemProps = InstanceType<typeof CommandItem>['$props']

interface Props extends /* @vue-ignore */ CommandItemProps {
  value: string
}

const props = defineProps<Props>()

const forwardedProps = computed(() => {
  const { value, ...rest } = props
  return rest
})

const { setValue, setOpen } = useMicSelector('MicSelectorItem')

function handleSelect() {
  setValue(props.value)
  setOpen(false)
}
</script>

<template>
  <CommandItem
    v-bind="forwardedProps"
    :value="props.value"
    @select="handleSelect"
  >
    <slot />
  </CommandItem>
</template>
