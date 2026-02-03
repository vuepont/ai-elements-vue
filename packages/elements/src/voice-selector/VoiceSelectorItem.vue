<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CommandItem } from '@repo/shadcn-vue/components/ui/command'
import { cn } from '@repo/shadcn-vue/lib/utils'

type VoiceSelectorItemProps = InstanceType<typeof CommandItem>['$props']

interface Props extends /* @vue-ignore */ VoiceSelectorItemProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { class: _, ...rest } = props
</script>

<template>
  <CommandItem
    :class="cn('px-4 py-2', props.class)"
    v-bind="rest"
  >
    <slot />
  </CommandItem>
</template>
