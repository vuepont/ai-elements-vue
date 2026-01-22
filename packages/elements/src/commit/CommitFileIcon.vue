<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { FileIcon } from 'lucide-vue-next'

type CommitFileIconProps = InstanceType<typeof FileIcon>['$props']

interface Props extends /* @vue-ignore */ CommitFileIconProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <FileIcon
    :class="cn('size-3.5 shrink-0 text-muted-foreground', props.class)"
    v-bind="$attrs"
  />
</template>
