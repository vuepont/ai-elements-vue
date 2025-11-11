<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ChevronDownIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import { useWebPreviewContext } from './context'

type LogLevel = 'log' | 'warn' | 'error'

interface ConsoleLog {
  level: LogLevel
  message: string
  timestamp: Date
}

interface Props {
  class?: HTMLAttributes['class']
  logs?: ConsoleLog[]
}

const props = withDefaults(defineProps<Props>(), {
  logs: () => [],
})

const context = useWebPreviewContext()

const isConsoleOpen = computed(() => context.consoleOpen.value)

function levelClass(level: LogLevel) {
  if (level === 'error')
    return 'text-destructive'
  if (level === 'warn')
    return 'text-yellow-600'
  return 'text-foreground'
}
</script>

<template>
  <Collapsible
    :class="cn('border-t bg-muted/50 font-mono text-sm', props.class)"
    :open="isConsoleOpen"
    v-bind="$attrs"
    @update:open="context.setConsoleOpen"
  >
    <CollapsibleTrigger as-child>
      <Button
        class="flex w-full items-center justify-between p-4 text-left font-medium hover:bg-muted/50"
        type="button"
        variant="ghost"
      >
        Console
        <ChevronDownIcon
          :class="
            cn(
              'h-4 w-4 transition-transform duration-200',
              isConsoleOpen ? 'rotate-180' : 'rotate-0',
            )
          "
        />
      </Button>
    </CollapsibleTrigger>
    <CollapsibleContent
      class="px-4 pb-4 data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 outline-none data-[state=closed]:animate-out data-[state=open]:animate-in"
    >
      <div class="max-h-48 space-y-1 overflow-y-auto">
        <p v-if="!props.logs.length" class="text-muted-foreground">
          No console output
        </p>
        <template v-else>
          <div
            v-for="(log, index) in props.logs"
            :key="`${log.timestamp.getTime?.() ?? index}-${index}`"
            :class="cn('text-xs', levelClass(log.level))"
          >
            <span class="text-muted-foreground">
              {{ log.timestamp.toLocaleTimeString() }}
            </span>
            {{ ' ' }}
            {{ log.message }}
          </div>
        </template>
        <slot />
      </div>
    </CollapsibleContent>
  </Collapsible>
</template>
