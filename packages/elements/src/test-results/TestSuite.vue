<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import type { TestStatusType } from './context'
import { Collapsible } from '@repo/shadcn-vue/components/ui/collapsible'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useVModel } from '@vueuse/core'
import { computed, provide, reactive } from 'vue'
import { TestSuiteContextKey } from './context'

type TestSuiteProps = InstanceType<typeof Collapsible>['$props']

interface Props extends /* @vue-ignore */ TestSuiteProps {
  name: string
  status: TestStatusType
  defaultOpen?: boolean
  modelValue?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  defaultOpen: false,
  modelValue: undefined,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const isOpen = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultOpen,
  passive: true,
})

const context = reactive({
  name: computed(() => props.name),
  status: computed(() => props.status),
})

provide(TestSuiteContextKey, context)
</script>

<template>
  <Collapsible
    v-model:open="isOpen"
    :class="cn('rounded-lg border', props.class)"
    v-bind="$attrs"
  >
    <slot />
  </Collapsible>
</template>
