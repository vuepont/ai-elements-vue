<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, getCurrentInstance, provide } from 'vue'
import { TerminalKey } from './context'
import TerminalActions from './TerminalActions.vue'
import TerminalClearButton from './TerminalClearButton.vue'
import TerminalContent from './TerminalContent.vue'
import TerminalCopyButton from './TerminalCopyButton.vue'
import TerminalHeader from './TerminalHeader.vue'
import TerminalStatus from './TerminalStatus.vue'
import TerminalTitle from './TerminalTitle.vue'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  output: string
  isStreaming?: boolean
  autoScroll?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  isStreaming: false,
  autoScroll: true,
})

const emit = defineEmits<{
  (e: 'clear'): void
}>()

const instance = getCurrentInstance()

// Check for the presence of the 'onClear' listener
const hasClear = computed(() => !!instance?.vnode.props?.onClear)

function handleClear() {
  emit('clear')
}

provide(TerminalKey, {
  output: computed(() => props.output),
  isStreaming: computed(() => props.isStreaming),
  autoScroll: computed(() => props.autoScroll),
  hasClear,
  onClear: handleClear,
})
</script>

<template>
  <div
    :class="cn(
      'flex flex-col overflow-hidden rounded-lg border bg-zinc-950 text-zinc-100',
      props.class,
    )"
    v-bind="$attrs"
  >
    <slot>
      <TerminalHeader>
        <TerminalTitle />
        <div class="flex items-center gap-1">
          <TerminalStatus />
          <TerminalActions>
            <TerminalCopyButton />
            <TerminalClearButton v-if="hasClear" />
          </TerminalActions>
        </div>
      </TerminalHeader>
      <TerminalContent />
    </slot>
  </div>
</template>
