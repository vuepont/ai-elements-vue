<script setup lang="ts">
import { DropdownMenuItem } from '@repo/shadcn-vue/components/ui/dropdown-menu'
import { ImageIcon } from 'lucide-vue-next'
import { usePromptInput } from './context'

defineProps<{ label?: string }>()

const { openFileDialog } = usePromptInput()
</script>

<template>
  <DropdownMenuItem @select.prevent="openFileDialog">
    <ImageIcon class="mr-2 size-4" />
    {{ label || 'Add photos or files' }}
  </DropdownMenuItem>
</template>
