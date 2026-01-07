---
title: Shimmer
description: An animated text shimmer component for creating eye-catching loading states and progressive reveal effects.
icon: lucide:sparkles
---

The `Shimmer` component provides an animated shimmer effect that sweeps across text, perfect for indicating loading states, progressive reveals, or drawing attention to dynamic content in AI applications.

:::ComponentLoader{label="Preview" componentName="Shimmer"}
:::

## Install using CLI

::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add shimmer
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/shimmer.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

:::code-group
```vue [Shimmer.vue] height=500 collapse
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
```

  ```ts [index.ts]
  export { default as Shimmer } from './Shimmer.vue'
  ```
:::

## Features

- Smooth animated shimmer effect using CSS gradients and Motion
- Customizable animation duration and spread
- Polymorphic component - render as any HTML element via the `as` propAutomatic spread calculation based on text length
- Automatic spread calculation based on text length
- Theme-aware styling using CSS custom properties
- Infinite looping animation with linear easing
- TypeScript support with proper type definitions
- Memoized for optimal performance
- Responsive and accessible design
- Uses `text-transparent` with background-clip for crisp text rendering

## Examples

### Different Durations

:::ComponentLoader{label="Preview" componentName="ShimmerDurations"}
:::

### Custom Elements

:::ComponentLoader{label="Preview" componentName="ShimmerCustomElements"}
:::

## Props

### `<Shimmer />`

:::field-group
  ::field{name="as" type="keyof HTMLElementTagNameMap" defaultValue="'p'"}
  The HTML element or React component to render. Defaults to "p".
  ::

  ::field{name="class" type="string" defaultValue="''"}
  Additional CSS classes to apply to the component.
  ::

  ::field{name="duration" type="number" defaultValue="2"}
  The duration of the shimmer animation in seconds. Defaults to 2.
  ::

  ::field{name="spread" type="number" defaultValue="2"}
  The spread multiplier for the shimmer gradient, multiplied by text length. Defaults to 2.
  ::
:::
