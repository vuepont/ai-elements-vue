<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref } from 'vue'
import { conversationContextKey } from './context'

interface Props {
  ariaLabel?: string
  class?: string
}

const props = defineProps<Props>()

const ariaLabel = props.ariaLabel ?? 'Conversation'
const root = ref<HTMLElement | null>(null)
const isAtBottom = ref(true)

function scrollToBottom(behavior: ScrollBehavior = 'auto') {
  const el = root.value
  if (!el)
    return
  el.scrollTo({ top: el.scrollHeight, behavior })
}

function handleScroll() {
  const el = root.value
  if (!el)
    return
  const threshold = 4
  const distanceFromBottom = el.scrollHeight - el.clientHeight - el.scrollTop
  isAtBottom.value = distanceFromBottom <= threshold
}

provide(conversationContextKey, { isAtBottom, scrollToBottom })

let mutationObserver: MutationObserver | null = null

onMounted(() => {
  const el = root.value
  if (!el)
    return

  // Track initial state and auto-scroll when at bottom
  handleScroll()

  mutationObserver = new MutationObserver(() => {
    if (isAtBottom.value) {
      scrollToBottom('smooth')
    }
  })

  mutationObserver.observe(el, { childList: true, subtree: true })
})

onUnmounted(() => {
  mutationObserver?.disconnect()
  mutationObserver = null
})
</script>

<template>
  <div
    ref="root"
    :aria-label="ariaLabel" class="relative flex-1 overflow-y-auto"
    :class="[props.class]"
    role="log"
    @scroll="handleScroll"
  >
    <slot />
  </div>
</template>
