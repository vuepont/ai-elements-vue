<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { ChangeType } from './context'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { provide } from 'vue'
import { PackageInfoKey } from './context'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  name: string
  currentVersion?: string
  newVersion?: string
  changeType?: ChangeType
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

provide(PackageInfoKey, {
  name: props.name,
  currentVersion: props.currentVersion,
  newVersion: props.newVersion,
  changeType: props.changeType,
})
</script>

<template>
  <div
    :class="cn('rounded-lg border bg-background p-4', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </div>
</template>
