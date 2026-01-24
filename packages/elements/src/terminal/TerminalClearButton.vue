<script setup lang="ts">
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { Trash2Icon } from 'lucide-vue-next'
import { useTerminalContext } from './context'

type ButtonProps = InstanceType<typeof Button>['$props']

interface Props extends /* @vue-ignore */ ButtonProps {}

const props = defineProps<Props>()

const { onClear, hasClear } = useTerminalContext('TerminalClearButton')
</script>

<template>
  <Button
    v-if="hasClear"
    :class="cn(
      'size-7 shrink-0 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100',
      props.class,
    )"
    size="icon"
    variant="ghost"
    v-bind="$attrs"
    @click="onClear"
  >
    <slot>
      <Trash2Icon :size="14" />
    </slot>
  </Button>
</template>
