<script setup lang="ts">
import type { ButtonVariants } from '@repo/shadcn-vue/components/ui/button'
import type { LucideIcon } from 'lucide-vue-next'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/shadcn-vue/components/ui/tooltip'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'

interface ArtifactActionProps {
  class?: string
  tooltip?: string
  label?: string
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  icon?: LucideIcon
}

const props = withDefaults(defineProps<ArtifactActionProps>(), {
  variant: 'ghost',
  size: 'sm',
})

const classes = computed(() => cn(
  'size-8 p-0 text-muted-foreground hover:text-foreground',
  props.class,
))
</script>

<template>
  <TooltipProvider v-if="tooltip">
    <Tooltip>
      <TooltipTrigger as-child>
        <Button
          type="button"
          v-bind="{
            ...props,
            class: classes,
          }"
        >
          <component
            :is="icon"
            v-if="icon"
            class="size-4"
          />
          <slot v-else />
          <span class="sr-only">{{ label || tooltip }}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ tooltip }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>

  <Button
    v-else
    type="button"
    v-bind="{
      ...props,
      class: classes,
    }"
  >
    <component
      :is="icon"
      v-if="icon"
      class="size-4"
    />
    <slot v-else />
    <span class="sr-only">{{ label || tooltip }}</span>
  </Button>
</template>
