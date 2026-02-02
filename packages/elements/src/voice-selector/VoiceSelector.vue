<script setup lang="ts">
import { Dialog } from '@repo/shadcn-vue/components/ui/dialog'
import { useVModel } from '@vueuse/core'
import { provide } from 'vue'
import { VOICE_SELECTOR_CONTEXT_KEY } from './types'

interface Props {
  value?: string
  defaultValue?: string
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  open: undefined,
  defaultOpen: false,
  modal: true,
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

function setValue(newValue: string | undefined) {
  value.value = newValue
  emit('valueChange', newValue)
}

function setOpen(newOpen: boolean) {
  open.value = newOpen
  emit('openChange', newOpen)
}

provide(VOICE_SELECTOR_CONTEXT_KEY, {
  value,
  setValue,
  open,
  setOpen,
})
</script>

<template>
  <Dialog
    :open="open"
    :modal="modal"
    @update:open="setOpen"
  >
    <slot />
  </Dialog>
</template>
