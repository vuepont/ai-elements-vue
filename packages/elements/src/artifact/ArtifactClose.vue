<script setup lang="ts">
import type { ButtonVariants } from '@repo/shadcn-vue/components/ui/button'
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { X } from 'lucide-vue-next'
import { useAttrs } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}

const props = withDefaults(
  defineProps<Props>(),
  {
    size: 'sm',
    variant: 'ghost',
  },
)

const attrs = useAttrs()
</script>

<template>
  <Button
    :class="cn('size-8 p-0 text-muted-foreground hover:text-foreground', props.class)"
    :size="props.size"
    type="button"
    :variant="props.variant"
    v-bind="attrs"
  >
    <slot>
      <X class="size-4" />
    </slot>
    <span class="sr-only">Close</span>
  </Button>
</template>
