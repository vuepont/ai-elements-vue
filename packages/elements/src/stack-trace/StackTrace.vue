<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ParsedStackTrace } from './context'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useVModel } from '@vueuse/core'
import { computed, provide } from 'vue'
import { StackTraceKey } from './context'
import { parseStackTrace } from './utils'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  trace: string
  modelValue?: boolean
  defaultOpen?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpen: false,
  modelValue: undefined,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'openChange', value: boolean): void
  (e: 'filePathClick', filePath: string, line?: number, column?: number): void
}>()

const isOpen = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultOpen,
  passive: true,
})

const parsedTrace = computed<ParsedStackTrace>(() => parseStackTrace(props.trace))

function onFilePathClick(filePath: string, line?: number, column?: number) {
  emit('filePathClick', filePath, line, column)
}

function setIsOpen(value: boolean) {
  isOpen.value = value
  emit('openChange', value)
}

provide(StackTraceKey, {
  trace: parsedTrace,
  raw: computed(() => props.trace),
  isOpen,
  setIsOpen,
  onFilePathClick,
})
</script>

<template>
  <div
    :class="cn(
      'not-prose w-full overflow-hidden rounded-lg border bg-background font-mono text-sm',
      props.class,
    )"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
