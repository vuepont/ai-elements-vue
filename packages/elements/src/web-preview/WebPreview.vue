<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, ref } from 'vue'
import {
  provideWebPreviewContext,
} from './context'

interface Props {
  class?: HTMLAttributes['class']
  defaultUrl?: string
  url?: string
  consoleOpen?: boolean
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
const consoleOpen = ref(props.consoleOpen ?? false)

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

const classes = computed(() =>
  cn('flex size-full flex-col rounded-lg border bg-card', props.class),
)
</script>

<template>
  <div :class="classes" v-bind="$attrs">
    <slot />
  </div>
</template>
