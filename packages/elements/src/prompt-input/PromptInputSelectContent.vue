<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { SelectContent } from '@repo/shadcn-vue/components/ui/select'
import { cn } from '@repo/shadcn-vue/lib/utils'

type SelectContentProps = InstanceType<typeof SelectContent>['$props']

interface Props extends /* @vue-ignore */ SelectContentProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <SelectContent :class="cn(props.class)" v-bind="props">
    <slot />
  </SelectContent>
</template>
