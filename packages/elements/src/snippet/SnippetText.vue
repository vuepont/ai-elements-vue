<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { InputGroupText } from '@repo/shadcn-vue/components/ui/input-group'
import { cn } from '@repo/shadcn-vue/lib/utils'

type InputGroupTextProps = InstanceType<typeof InputGroupText>['$props']

interface Props extends /* @vue-ignore */ InputGroupTextProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <InputGroupText
    :class="cn('pl-2 font-normal text-muted-foreground', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </InputGroupText>
</template>
