<script setup lang="ts">
import type { ButtonVariants } from '@repo/shadcn-vue/components/ui/button'
import type { Component, HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/shadcn-vue/components/ui/tooltip'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useAttrs } from 'vue'

interface Props {
  tooltip?: string
  label?: string
  icon?: Component
  class?: HTMLAttributes['class']
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
  <TooltipProvider v-if="props.tooltip">
    <Tooltip>
      <TooltipTrigger as-child>
        <Button
          :class="
            cn(
              'size-8 p-0 text-muted-foreground hover:text-foreground',
              props.class,
            )
          "
          :size="props.size"
          type="button"
          :variant="props.variant"
          v-bind="attrs"
        >
          <component :is="props.icon" v-if="props.icon" class="size-4" />
          <template v-else>
            <slot />
          </template>
          <span class="sr-only">{{ props.label ?? props.tooltip }}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ props.tooltip }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  <Button
    v-else
    :class="
      cn(
        'size-8 p-0 text-muted-foreground hover:text-foreground',
        props.class,
      )
    "
    :size="props.size"
    type="button"
    :variant="props.variant"
    v-bind="attrs"
  >
    <component :is="props.icon" v-if="props.icon" class="size-4" />
    <template v-else>
      <slot />
    </template>
    <span class="sr-only">{{ props.label ?? props.tooltip }}</span>
  </Button>
</template>
