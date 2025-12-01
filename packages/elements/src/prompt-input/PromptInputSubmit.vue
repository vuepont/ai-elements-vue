<script setup lang="ts">
import type { ChatStatus } from 'ai'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { Loader2, Send, Square, X } from 'lucide-vue-next'
import { computed, useAttrs } from 'vue'

interface Props {
  class?: string
  status?: ChatStatus
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'icon',
})

const attrs = useAttrs()

const classes = computed(() => ['gap-1.5 rounded-lg', props.class])

const icon = computed(() => {
  if (props.status === 'submitted')
    return Loader2
  if (props.status === 'streaming')
    return Square
  if (props.status === 'error')
    return X
  return Send
})
</script>

<template>
  <Button :class="classes" :size="size" :variant="variant" type="submit" v-bind="attrs">
    <slot>
      <component :is="icon" class="size-4" />
    </slot>
  </Button>
</template>
