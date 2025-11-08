<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Collapsible } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { provideReasoningContext } from './context'

interface Props {
  class?: HTMLAttributes['class']
  isStreaming?: boolean
  open?: boolean
  defaultOpen?: boolean
  duration?: number
}

const props = withDefaults(
  defineProps<Props>(),
  {
    isStreaming: false,
    defaultOpen: true,
  },
)
const emit = defineEmits<{
  (e: 'update:open', open: boolean): void
  (e: 'openChange', open: boolean): void
}>()
const AUTO_CLOSE_DELAY = 1000
const MS_IN_SECOND = 1000

const isControlledOpen = computed(() => props.open !== undefined)
const openState = ref(props.open ?? props.defaultOpen)

watch(
  () => props.open,
  (value) => {
    if (value !== undefined) {
      openState.value = value
    }
  },
)

const durationState = ref<number | undefined>(props.duration)
const isDurationControlled = computed(() => props.duration !== undefined)

watch(
  () => props.duration,
  (value) => {
    if (value !== undefined) {
      durationState.value = value
    }
  },
)

const isStreaming = computed(() => props.isStreaming ?? false)
const hasAutoClosed = ref(false)
const startTime = ref<number | null>(null)
let autoCloseTimer: ReturnType<typeof setTimeout> | null = null

function clearAutoCloseTimer() {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
    autoCloseTimer = null
  }
}

function setOpen(open: boolean) {
  if (!isControlledOpen.value) {
    openState.value = open
  }
  emit('update:open', open)
  emit('openChange', open)
}

watch(
  isStreaming,
  (streaming) => {
    clearAutoCloseTimer()

    if (streaming) {
      hasAutoClosed.value = false
      if (startTime.value === null) {
        startTime.value = Date.now()
      }
      return
    }

    if (startTime.value !== null && !isDurationControlled.value) {
      durationState.value = Math.ceil(
        (Date.now() - startTime.value) / MS_IN_SECOND,
      )
    }
    startTime.value = null

    if (props.defaultOpen && openState.value && !hasAutoClosed.value) {
      autoCloseTimer = setTimeout(() => {
        setOpen(false)
        hasAutoClosed.value = true
        autoCloseTimer = null
      }, AUTO_CLOSE_DELAY)
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  clearAutoCloseTimer()
})

function handleOpenChange(open: boolean) {
  setOpen(open)
}

provideReasoningContext({
  isStreaming,
  isOpen: computed(() => openState.value),
  setIsOpen: setOpen,
  duration: durationState,
})
</script>

<template>
  <Collapsible
    :class="cn('not-prose mb-4', props.class)"
    :default-open="props.defaultOpen"
    :open="openState"
    v-bind="$attrs"
    @update:open="handleOpenChange"
  >
    <slot />
  </Collapsible>
</template>
