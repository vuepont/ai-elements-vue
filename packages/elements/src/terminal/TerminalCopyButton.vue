<script setup lang="ts">
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { CheckIcon, CopyIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useTerminalContext } from './context'

type ButtonProps = InstanceType<typeof Button>['$props']

interface Props extends /* @vue-ignore */ ButtonProps {
  timeout?: number
}

const props = withDefaults(defineProps<Props>(), {
  timeout: 2000,
})

const emit = defineEmits<{
  (e: 'copy'): void
  (e: 'error', error: Error): void
}>()

const { output } = useTerminalContext('TerminalCopyButton')
const isCopied = ref(false)

const Icon = computed(() => (isCopied.value ? CheckIcon : CopyIcon))

async function copyToClipboard() {
  if (typeof window === 'undefined' || !navigator?.clipboard?.writeText) {
    emit('error', new Error('Clipboard API not available'))
    return
  }

  try {
    await navigator.clipboard.writeText(output.value)
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
</script>

<template>
  <Button
    :class="cn(
      'size-7 shrink-0 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100',
      props.class,
    )"
    size="icon"
    variant="ghost"
    v-bind="$attrs"
    @click="copyToClipboard"
  >
    <slot>
      <component :is="Icon" :size="14" />
    </slot>
  </Button>
</template>
