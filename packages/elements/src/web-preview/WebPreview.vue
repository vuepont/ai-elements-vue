<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, ref } from 'vue'
import {
  provideWebPreviewContext,
} from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
  defaultUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  defaultUrl: '',
})

const emit = defineEmits<{
  (e: 'update:url', value: string): void
  (e: 'urlChange', value: string): void
  (e: 'update:consoleOpen', value: boolean): void
  (e: 'consoleOpenChange', value: boolean): void
}>()

const url = ref(props.defaultUrl)
const consoleOpen = ref(false)

function setUrl(value: string) {
  url.value = value
  emit('update:url', value)
  emit('urlChange', value)
}

function setConsoleOpen(value: boolean) {
  consoleOpen.value = value
  emit('update:consoleOpen', value)
  emit('consoleOpenChange', value)
}

provideWebPreviewContext({
  url,
  setUrl,
  consoleOpen,
  setConsoleOpen,
})

const vBind = computed(() => {
  const { class: _, ...rest } = props
  return {
    class: cn('flex size-full flex-col rounded-lg border bg-card', props.class),
    ...rest,
  }
})
</script>

<template>
  <div v-bind="vBind">
    <slot />
  </div>
</template>
