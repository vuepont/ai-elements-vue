<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, ref, useAttrs, watch } from 'vue'
import { provideWebPreviewContext } from './context'

interface Props {
  class?: HTMLAttributes['class']
  url?: string
  defaultUrl?: string
  consoleOpen?: boolean
}

const props = withDefaults(
  defineProps<Props>(),
  {
    defaultUrl: '',
  },
)

const emit = defineEmits<{
  (e: 'update:url', url: string): void
  (e: 'urlChange', url: string): void
  (e: 'update:consoleOpen', open: boolean): void
  (e: 'consoleOpenChange', open: boolean): void
}>()

const attrs = useAttrs()

const isUrlControlled = computed(() => props.url !== undefined)
const urlState = ref(props.url ?? props.defaultUrl)

watch(
  () => props.url,
  (value) => {
    if (value !== undefined) {
      urlState.value = value
    }
  },
)

const isConsoleControlled = computed(() => props.consoleOpen !== undefined)
const consoleState = ref(props.consoleOpen ?? false)

watch(
  () => props.consoleOpen,
  (value) => {
    if (value !== undefined) {
      consoleState.value = value
    }
  },
)

function setUrl(url: string) {
  if (!isUrlControlled.value) {
    urlState.value = url
  }
  emit('update:url', url)
  emit('urlChange', url)
}

function setConsoleOpen(open: boolean) {
  if (!isConsoleControlled.value) {
    consoleState.value = open
  }
  emit('update:consoleOpen', open)
  emit('consoleOpenChange', open)
}

provideWebPreviewContext({
  url: urlState,
  setUrl,
  consoleOpen: consoleState,
  setConsoleOpen,
})
</script>

<template>
  <div
    :class="cn('flex size-full flex-col rounded-lg border bg-card', props.class)"
    v-bind="attrs"
  >
    <slot />
  </div>
</template>
