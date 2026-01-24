<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import Ansi from 'ansi-to-vue3'
import { nextTick, ref, watch } from 'vue'
import { useTerminalContext } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { output, isStreaming, autoScroll } = useTerminalContext('TerminalContent')
const containerRef = ref<HTMLDivElement | null>(null)

watch(
  [output, autoScroll],
  () => {
    if (autoScroll.value) {
      nextTick(() => {
        if (containerRef.value) {
          containerRef.value.scrollTop = containerRef.value.scrollHeight
        }
      })
    }
  },
  { immediate: true },
)
</script>

<template>
  <div
    ref="containerRef"
    :class="cn(
      'max-h-96 overflow-auto p-4 font-mono text-sm leading-relaxed',
      props.class,
    )"
    v-bind="$attrs"
  >
    <slot>
      <pre class="whitespace-pre-wrap wrap-break-word">
        <Ansi>{{ output }}</Ansi>
        <span
          v-if="isStreaming"
          class="ml-0.5 inline-block h-4 w-2 animate-pulse bg-zinc-100"
        />
      </pre>
    </slot>
  </div>
</template>
