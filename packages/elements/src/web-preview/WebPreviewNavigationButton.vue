<script setup lang="ts">
import type { ButtonVariants } from '@repo/shadcn-vue/components/ui/button'
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@repo/shadcn-vue/components/ui/tooltip'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  size?: ButtonVariants['size']
  variant?: ButtonVariants['variant']
  tooltip?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  tooltip: '',
  disabled: false,
  size: 'sm',
  variant: 'ghost',
})
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button
          class="h-8 w-8 p-0 hover:text-foreground"
          type="button"
          v-bind="{ ...props, ...$attrs }"
        >
          <slot />
        </Button>
      </TooltipTrigger>
      <TooltipContent v-if="props.tooltip">
        <p>{{ props.tooltip }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
