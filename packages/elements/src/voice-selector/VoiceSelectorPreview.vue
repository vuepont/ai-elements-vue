<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { Spinner } from '@repo/shadcn-vue/components/ui/spinner'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { PauseIcon, PlayIcon } from 'lucide-vue-next'

interface Props {
  class?: HTMLAttributes['class']
  playing?: boolean
  loading?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'play'): void
}>()

function handleClick(event: MouseEvent) {
  event.stopPropagation()
  emit('play')
}
</script>

<template>
  <Button
    :aria-label="playing ? 'Pause preview' : 'Play preview'"
    :class="cn('size-6', props.class)"
    :disabled="loading"
    size="icon-sm"
    type="button"
    variant="outline"
    @click="handleClick"
  >
    <Spinner v-if="loading" class="size-3" />
    <PauseIcon v-else-if="playing" class="size-3" />
    <PlayIcon v-else class="size-3" />
  </Button>
</template>
