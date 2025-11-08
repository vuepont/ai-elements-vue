<script setup lang="ts">
import type { ButtonVariants } from '@repo/shadcn-vue/components/ui/button'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@repo/shadcn-vue/components/ui/tooltip'
import { useAttrs } from 'vue'

interface Props {
  tooltip?: string
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}

const props = withDefaults(
  defineProps<Props>(),
  {
    variant: 'ghost',
    size: 'sm',
  },
)

const attrs = useAttrs()
</script>

<template>
  <Tooltip v-if="props.tooltip">
    <TooltipTrigger as-child>
      <Button
        :size="props.size"
        type="button"
        :variant="props.variant"
        v-bind="attrs"
      >
        <slot />
      </Button>
    </TooltipTrigger>
    <TooltipContent align="start" side="bottom">
      {{ props.tooltip }}
    </TooltipContent>
  </Tooltip>
  <Button
    v-else
    :size="props.size"
    type="button"
    :variant="props.variant"
    v-bind="attrs"
  >
    <slot />
  </Button>
</template>
