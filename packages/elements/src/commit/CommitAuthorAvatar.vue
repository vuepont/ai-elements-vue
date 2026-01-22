<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Avatar, AvatarFallback } from '@repo/shadcn-vue/components/ui/avatar'
import { cn } from '@repo/shadcn-vue/lib/utils'

type CommitAuthorAvatarProps = InstanceType<typeof Avatar>['$props']

interface Props extends /* @vue-ignore */ CommitAuthorAvatarProps {
  class?: HTMLAttributes['class']
  initials: string
}

const props = defineProps<Props>()
</script>

<template>
  <Avatar :class="cn('size-8', props.class)" v-bind="$attrs">
    <AvatarFallback class="text-xs">
      {{ props.initials }}
    </AvatarFallback>
  </Avatar>
</template>
