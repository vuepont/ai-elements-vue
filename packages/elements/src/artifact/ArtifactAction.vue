<script setup lang="ts">
import type { ArtifactActionProps } from './props'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/shadcn-vue/components/ui/tooltip'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'

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
  <TooltipProvider v-if="props.tooltip">
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
            :is="props.icon"
            v-if="props.icon"
            class="size-4"
          />
          <slot v-else />
          <span class="sr-only">{{ props.label || props.tooltip }}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{{ props.tooltip }}</p>
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
      :is="props.icon"
      v-if="props.icon"
      class="size-4"
    />
    <slot v-else />
    <span class="sr-only">{{ props.label || props.tooltip }}</span>
  </Button>
</template>
