<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { XIcon } from 'lucide-vue-next'
import { useAttachmentContext } from './context'

type ButtonProps = InstanceType<typeof Button>['$props']

interface Props extends /* @vue-ignore */ ButtonProps {
  label?: string
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Remove',
})

const { remove, variant } = useAttachmentContext()

const { variant: _variant, ...restProps } = props

function handleClick(e: Event) {
  e.stopPropagation()
  remove?.()
}
</script>

<template>
  <Button
    v-if="remove"
    :aria-label="props.label"
    :class="
      cn(
        variant === 'grid'
          && [
            'absolute top-2 right-2 size-6 rounded-full p-0',
            'bg-background/80 backdrop-blur-sm',
            'opacity-0 transition-opacity group-hover:opacity-100',
            'hover:bg-background',
            '[&>svg]:size-3',
          ],
        variant === 'inline'
          && [
            'size-5 rounded p-0',
            'opacity-0 transition-opacity group-hover:opacity-100',
            '[&>svg]:size-2.5',
          ],
        variant === 'list' && ['size-8 shrink-0 rounded p-0', '[&>svg]:size-4'],
        props.class,
      )
    "
    type="button"
    variant="ghost"
    v-bind="restProps"
    @click="handleClick"
  >
    <slot>
      <XIcon />
    </slot>
    <span class="sr-only">{{ props.label }}</span>
  </Button>
</template>
