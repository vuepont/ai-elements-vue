<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { InputGroupButton } from '@repo/shadcn-vue/components/ui/input-group'
import { CheckIcon, CopyIcon } from 'lucide-vue-next'
import { computed, onBeforeUnmount, ref } from 'vue'
import { useSnippetContext } from './context'

type InputGroupButtonProps = InstanceType<typeof InputGroupButton>['$props']

interface Props extends /* @vue-ignore */ InputGroupButtonProps {
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

const { code } = useSnippetContext('SnippetCopyButton')
const isCopied = ref(false)
const timeoutRef = ref<number>(0)

const Icon = computed(() => (isCopied.value ? CheckIcon : CopyIcon))

async function copyToClipboard() {
  if (typeof window === 'undefined' || !navigator?.clipboard?.writeText) {
    emit('error', new Error('Clipboard API not available'))
    return
  }

  try {
    if (!isCopied.value) {
      await navigator.clipboard.writeText(code.value)
      isCopied.value = true
      emit('copy')
      timeoutRef.value = window.setTimeout(
        () => (isCopied.value = false),
        props.timeout,
      )
    }
  }
  catch (error) {
    emit('error', error as Error)
  }
}

onBeforeUnmount(() => {
  window.clearTimeout(timeoutRef.value)
})
</script>

<template>
  <InputGroupButton
    aria-label="Copy"
    size="icon-sm"
    title="Copy"
    :class="props.class"
    v-bind="$attrs"
    @click="copyToClipboard"
  >
    <slot>
      <component :is="Icon" class="size-3.5" :size="14" />
    </slot>
  </InputGroupButton>
</template>
