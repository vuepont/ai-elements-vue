<script setup lang="ts">
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { computed, useAttrs, useSlots } from 'vue'

interface Props {
  class?: string
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'ghost',
})

const attrs = useAttrs()

const slots = useSlots()

const computedSize = computed(() => {
  if (props.size)
    return props.size
  const count = slots.default?.().length ?? 0
  return count > 1 ? 'default' : 'icon'
})

const classes = computed(() => [
  'shrink-0 gap-1.5 rounded-lg',
  props.variant === 'ghost' && 'text-muted-foreground',
  computedSize.value === 'default' && 'px-3',
  props.class,
])
</script>

<template>
  <Button
    :class="classes"
    :size="computedSize"
    :variant="props.variant"
    type="button"
    v-bind="attrs"
  >
    <slot />
  </Button>
</template>
