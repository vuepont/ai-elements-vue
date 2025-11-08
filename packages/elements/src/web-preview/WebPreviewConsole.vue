<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ChevronDown } from 'lucide-vue-next'
import { computed } from 'vue'
import { useWebPreviewContext } from './context'

interface LogEntry {
  level: 'log' | 'warn' | 'error'
  message: string
  timestamp: Date
}

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    logs?: LogEntry[]
  }>(),
  {
    logs: () => [],
  },
)

const context = useWebPreviewContext()

const isOpen = computed(() => context.consoleOpen.value)

function handleOpenChange(open: boolean) {
  context.setConsoleOpen(open)
}
</script>

<template>
  <Collapsible
    :class="cn('border-t bg-muted/50 font-mono text-sm', props.class)"
    :open="isOpen"
    v-bind="$attrs"
    @update:open="handleOpenChange"
  >
    <CollapsibleTrigger as-child>
      <Button
        class="flex w-full items-center justify-between p-4 text-left font-medium hover:bg-muted/50"
        type="button"
        variant="ghost"
      >
        Console
        <ChevronDown
          :class="
            cn(
              'h-4 w-4 transition-transform duration-200',
              isOpen ? 'rotate-180' : 'rotate-0',
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
            :class="
              cn(
                'text-xs',
                log.level === 'error' && 'text-destructive',
                log.level === 'warn' && 'text-yellow-600',
                log.level === 'log' && 'text-foreground',
              )
            "
          >
            <span class="text-muted-foreground">
              {{
                log.timestamp instanceof Date
                  ? log.timestamp.toLocaleTimeString()
                  : String(log.timestamp)
              }}
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
