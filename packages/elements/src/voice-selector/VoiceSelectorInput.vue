<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { CommandInput } from '@repo/shadcn-vue/components/ui/command'
import { cn } from '@repo/shadcn-vue/lib/utils'

type VoiceSelectorInputProps = InstanceType<typeof CommandInput>['$props']

interface Props extends /* @vue-ignore */ VoiceSelectorInputProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <CommandInput
    :class="cn('h-auto py-3.5', props.class)"
  />
</template>
