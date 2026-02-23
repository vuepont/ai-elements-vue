<script setup lang="ts">
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { PopoverTrigger } from '@repo/shadcn-vue/components/ui/popover'
import { useResizeObserver } from '@vueuse/core'
import { ChevronsUpDownIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useMicSelector } from './context'

type ButtonProps = InstanceType<typeof Button>['$props']

interface Props extends /* @vue-ignore */ ButtonProps {}

const props = defineProps<Props>()

const forwardedProps = computed(() => {
  const { variant, ref: _ref, ...rest } = props
  return rest
})

const { setWidth } = useMicSelector('MicSelectorTrigger')
const triggerRef = ref<InstanceType<typeof Button> | null>(null)

useResizeObserver(triggerRef, (entries) => {
  const entry = entries[0]
  const newWidth = (entry.target as HTMLElement).offsetWidth
  if (newWidth) {
    setWidth(newWidth)
  }
})
</script>

<template>
  <PopoverTrigger as-child>
    <Button
      ref="triggerRef"
      variant="outline"
      v-bind="forwardedProps"
    >
      <slot />
      <ChevronsUpDownIcon
        class="shrink-0 text-muted-foreground"
        :size="16"
      />
    </Button>
  </PopoverTrigger>
</template>
