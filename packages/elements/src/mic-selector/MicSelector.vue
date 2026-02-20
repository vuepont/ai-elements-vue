<script setup lang="ts">
import { Popover } from '@repo/shadcn-vue/components/ui/popover'
import { useVModel } from '@vueuse/core'
import { computed, provide, ref, watch } from 'vue'
import { MicSelectorKey } from './context'
import { useAudioDevices } from './useAudioDevices'

type PopoverProps = InstanceType<typeof Popover>['$props']

interface Props extends /* @vue-ignore */ PopoverProps {
  value?: string
  defaultValue?: string
  open?: boolean
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  open: undefined,
  defaultOpen: false,
})

const emit = defineEmits<{
  (e: 'update:value', value: string | undefined): void
  (e: 'update:open', open: boolean): void
  (e: 'valueChange', value: string | undefined): void
  (e: 'openChange', open: boolean): void
}>()

const value = useVModel(props, 'value', emit, {
  defaultValue: props.defaultValue,
  passive: (props.value === undefined) as any,
})

const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: (props.open === undefined) as any,
})

const forwardedProps = computed(() => {
  const { value, defaultValue, open, defaultOpen, ...rest } = props
  return rest
})

const width = ref(200)

const { devices, hasPermission, loadDevices, loading } = useAudioDevices()

watch([open, hasPermission, loading], ([newOpen, newHasPermission, newLoading]) => {
  if (newOpen && !newHasPermission && !newLoading) {
    loadDevices()
  }
})

function setValue(newValue: string | undefined) {
  value.value = newValue
  emit('valueChange', newValue)
}

function setOpen(newOpen: boolean) {
  open.value = newOpen
  emit('openChange', newOpen)
}

function setWidth(newWidth: number) {
  width.value = newWidth
}

provide(MicSelectorKey, {
  devices,
  value,
  setValue,
  open,
  setOpen,
  width,
  setWidth,
})
</script>

<template>
  <Popover
    v-bind="forwardedProps"
    :open="open"
    @update:open="setOpen"
  >
    <slot />
  </Popover>
</template>
