<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { CheckIcon, CopyIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useStackTraceContext } from './context'

type ButtonProps = InstanceType<typeof Button>['$props']

interface Props extends /* @vue-ignore */ ButtonProps {
  timeout?: number
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  timeout: 2000,
})

const emit = defineEmits<{
  (e: 'copy'): void
  (e: 'error', error: Error): void
}>()

const isCopied = ref(false)
const { raw } = useStackTraceContext('StackTraceCopyButton')

async function copyToClipboard() {
  if (typeof window === 'undefined' || !navigator?.clipboard?.writeText) {
    const error = new Error('Clipboard API not available')
    emit('error', error)
    return
  }

  try {
    await navigator.clipboard.writeText(raw.value)
    isCopied.value = true
    emit('copy')
    setTimeout(() => {
      isCopied.value = false
    }, props.timeout)
  }
  catch (error) {
    emit('error', error as Error)
  }
}

const icon = computed(() => (isCopied.value ? CheckIcon : CopyIcon))
</script>

<template>
  <Button
    :class="cn('size-7', props.class)"
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
