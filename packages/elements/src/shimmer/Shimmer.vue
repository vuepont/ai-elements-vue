<script setup lang="ts">
import type { CSSProperties, HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { motion } from 'motion-v'
import { computed, useSlots } from 'vue'

export interface TextShimmerProps {
  as?: keyof HTMLElementTagNameMap
  class?: HTMLAttributes['class']
  duration?: number
  spread?: number
}

const props = withDefaults(defineProps<TextShimmerProps>(), {
  as: 'p',
  duration: 2,
  spread: 2,
})

const slots = useSlots()

const textContent = computed(() => {
  const defaultSlot = slots.default?.()
  if (!defaultSlot || defaultSlot.length === 0)
    return ''

  return defaultSlot
    .map((vnode) => {
      if (typeof vnode.children === 'string') {
        return vnode.children
      }
      return ''
    })
    .join('')
})

const dynamicSpread = computed(() => {
  return (textContent.value?.length ?? 0) * props.spread
})

const componentClasses = computed(() => cn('relative inline-block bg-[length:250%_100%,auto] bg-clip-text text-transparent', '[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--color-background),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]', props.class))

const componentStyle = computed((): CSSProperties => ({
  '--spread': `${dynamicSpread.value}px`,
  'backgroundImage':
    'var(--bg), linear-gradient(var(--color-muted-foreground), var(--color-muted-foreground))',
}))

const MotionComponent = computed(() => {
  return motion[props.as as keyof typeof motion] || motion.p
})
</script>

<template>
  <component
    :is="MotionComponent"
    :class="componentClasses"
    :style="componentStyle"
    :initial="{ backgroundPosition: '100% center' }"
    :animate="{ backgroundPosition: '0% center' }"
    :transition="{
      repeat: Number.POSITIVE_INFINITY,
      duration,
      ease: 'linear',
    }"
  >
    <slot />
  </component>
</template>
