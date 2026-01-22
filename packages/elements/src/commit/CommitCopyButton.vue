<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { CheckIcon, CopyIcon } from 'lucide-vue-next'
import { computed, onBeforeUnmount, ref } from 'vue'

type CommitCopyButtonProps = InstanceType<typeof Button>['$props']

interface Props extends /* @vue-ignore */ CommitCopyButtonProps {
  hash: string
  timeout?: number
  class?: HTMLAttributes['class']
}

const props = withDefaults(
  defineProps<Props>(),
  {
    timeout: 2000,
  },
)

const emit = defineEmits<{
  (event: 'copy'): void
  (event: 'error', error: Error): void
}>()

const isCopied = ref(false)
let resetTimer: ReturnType<typeof setTimeout> | undefined

const icon = computed(() => (isCopied.value ? CheckIcon : CopyIcon))

async function copyToClipboard() {
  if (typeof window === 'undefined' || !navigator?.clipboard?.writeText) {
    const error = new Error('Clipboard API not available')
    emit('error', error)
    return
  }

  try {
    await navigator.clipboard.writeText(props.hash)
    isCopied.value = true
    emit('copy')

    if (resetTimer) {
      clearTimeout(resetTimer)
    }

    resetTimer = setTimeout(() => {
      isCopied.value = false
    }, props.timeout)
  }
  catch (error) {
    emit('error', error instanceof Error ? error : new Error('Copy failed'))
  }
}

onBeforeUnmount(() => {
  if (resetTimer) {
    clearTimeout(resetTimer)
  }
})
</script>

<template>
  <Button
    :class="cn('size-7 shrink-0', props.class)"
    size="icon"
    variant="ghost"
    v-bind="$attrs"
    @click="copyToClipboard"
  >
    <slot>
      <component :is="icon" :size="14" />
    </slot>
  </Button>
</template>
