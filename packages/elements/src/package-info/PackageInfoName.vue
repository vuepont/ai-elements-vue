<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { PackageIcon } from 'lucide-vue-next'
import { usePackageInfoContext } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { name } = usePackageInfoContext()
</script>

<template>
  <div :class="cn('flex items-center gap-2', props.class)" v-bind="$attrs">
    <PackageIcon class="size-4 text-muted-foreground" />
    <span class="font-medium font-mono text-sm">
      <slot>{{ name }}</slot>
    </span>
  </div>
</template>
