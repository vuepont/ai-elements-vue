<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { TestStatusType } from './context'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, provide, reactive } from 'vue'
import { TestContextKey } from './context'
import TestDuration from './TestDuration.vue'
import TestName from './TestName.vue'
import TestStatus from './TestStatus.vue'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  name: string
  status: TestStatusType
  duration?: number
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const context = reactive({
  name: computed(() => props.name),
  status: computed(() => props.status),
  duration: computed(() => props.duration),
})

provide(TestContextKey, context)
</script>

<template>
  <div
    :class="cn('flex items-center gap-2 px-4 py-2 text-sm', props.class)"
    v-bind="$attrs"
  >
    <slot>
      <TestStatus />
      <TestName />
      <TestDuration v-if="props.duration !== undefined" />
    </slot>
  </div>
</template>
