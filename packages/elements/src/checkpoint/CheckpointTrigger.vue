<script lang="ts" setup>
import type { ButtonVariants } from '@repo/shadcn-vue/components/ui/button'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@repo/shadcn-vue/components/ui/tooltip'

interface Props {
  tooltip?: string
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'ghost',
  size: 'sm',
})

const buttonProps = {
  variant: props.variant,
  size: props.size,
  type: 'button' as const,
}
</script>

<template>
  <Tooltip v-if="props.tooltip">
    <TooltipTrigger as-child>
      <Button v-bind="{ ...buttonProps, ...$attrs }">
        <slot />
      </Button>
    </TooltipTrigger>
    <TooltipContent align="start" side="bottom">
      <p>{{ props.tooltip }}</p>
    </TooltipContent>
  </Tooltip>

  <Button v-else v-bind="{ ...buttonProps, ...$attrs }">
    <slot />
  </Button>
</template>
