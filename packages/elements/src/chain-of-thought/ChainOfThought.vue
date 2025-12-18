<script setup lang="ts">
import type { HTMLAttributes, Ref } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useVModel } from '@vueuse/core'
import { provideChainOfThought } from './context'

interface ChainOfThoughtProps {
  modelValue?: boolean
  defaultOpen?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(
  defineProps<ChainOfThoughtProps>(),
  {
    defaultOpen: false,
    modelValue: undefined,
  },
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const isOpen = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultOpen,
  passive: true,
})

provideChainOfThought({
  isOpen: isOpen as Ref<boolean>,
  setIsOpen: (open: boolean) => {
    isOpen.value = open
  },
})
</script>

<template>
  <div
    :class="cn('not-prose max-w-prose space-y-4', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
