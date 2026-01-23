<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { ArrowRightIcon } from 'lucide-vue-next'
import { usePackageInfoContext } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { currentVersion, newVersion } = usePackageInfoContext()
</script>

<template>
  <div
    v-if="currentVersion || newVersion"
    :class="
      cn(
        'mt-2 flex items-center gap-2 font-mono text-muted-foreground text-sm',
        props.class,
      )
    "
    v-bind="$attrs"
  >
    <slot>
      <span v-if="currentVersion">{{ currentVersion }}</span>
      <ArrowRightIcon v-if="currentVersion && newVersion" class="size-3" />
      <span v-if="newVersion" class="font-medium text-foreground">{{ newVersion }}</span>
    </slot>
  </div>
</template>
