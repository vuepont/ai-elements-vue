<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { InputGroupButton } from '@repo/shadcn-vue/components/ui/input-group'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, useSlots } from 'vue'

type InputGroupButtonProps = InstanceType<typeof InputGroupButton>['$props']

interface Props extends /* @vue-ignore */ InputGroupButtonProps {
  class?: HTMLAttributes['class']
  variant?: InputGroupButtonProps['variant']
  size?: InputGroupButtonProps['size']
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'ghost',
})

const slots = useSlots()

const computedSize = computed(() => {
  if (props.size)
    return props.size

  const slotNodes = slots.default?.()

  if (!slotNodes)
    return 'icon-sm'

  const validChildren = slotNodes.filter((node) => {
    if (node.type === Comment)
      return false
    if (node.type === Text && !node.children?.toString().trim())
      return false
    return true
  })

  return validChildren.length > 1 ? 'sm' : 'icon-sm'
})

const { size, variant, class: _, ...restProps } = props
</script>

<template>
  <InputGroupButton
    type="button"
    :size="computedSize"
    :class="cn($props.class)"
    :variant="variant"
    v-bind="restProps"
  >
    <slot />
  </InputGroupButton>
</template>
