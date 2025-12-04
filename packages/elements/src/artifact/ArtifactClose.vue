<script setup lang="ts">
import type { ButtonVariants } from '@repo/shadcn-vue/components/ui/button'
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { X } from 'lucide-vue-next'
import { computed } from 'vue'

interface ArtifactCloseProps {
  class?: HTMLAttributes['class']
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}

const props = withDefaults(defineProps<ArtifactCloseProps>(), {
  variant: 'ghost',
  size: 'sm',
})

const classes = computed(() => cn(
  'size-8 p-0 text-muted-foreground hover:text-foreground',
  props.class,
))
</script>

<template>
  <Button
    type="button"
    v-bind="{
      ...props,
      class: classes,
    }"
  >
    <slot>
      <X class="size-4" />
    </slot>
    <span class="sr-only">Close</span>
  </Button>
</template>
