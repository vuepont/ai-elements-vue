<script setup lang="ts">
import { DropdownMenuItem } from '@repo/shadcn-vue/components/ui/dropdown-menu'
import { ImageIcon } from 'lucide-vue-next'
import { usePromptInput } from './context'

type PromptInputActionAddAttachmentsProps = InstanceType<typeof DropdownMenuItem>['$props']

interface Props extends /* @vue-ignore */ PromptInputActionAddAttachmentsProps {
  label?: string
}

const props = defineProps<Props>()

const { openFileDialog } = usePromptInput()
</script>

<template>
  <DropdownMenuItem @select.prevent="openFileDialog">
    <ImageIcon class="mr-2 size-4" />
    {{ props.label || 'Add photos or files' }}
  </DropdownMenuItem>
</template>
