<script setup lang="ts">
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@repo/shadcn-vue/components/ui/tooltip'
import { useAttrs } from 'vue'

const props = defineProps<{
  tooltip?: string
  disabled?: boolean
}>()

const attrs = useAttrs()
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button
          class="h-8 w-8 p-0 hover:text-foreground"
          :disabled="props.disabled"
          size="sm"
          type="button"
          variant="ghost"
          v-bind="attrs"
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
