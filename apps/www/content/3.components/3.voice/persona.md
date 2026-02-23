---
title: Persona
description: An animated AI visual component powered by Rive that responds to different states like listening, thinking, and speaking.
icon: lucide:brain-cog
---

The `Persona` component displays an animated AI visual that responds to different conversational states. Built with Rive WebGL2, it provides smooth, high-performance animations for various AI interaction states including idle, listening, thinking, speaking, and asleep. The component supports multiple visual variants to match different design aesthetics.

:::ComponentLoader{label="Preview" componentName="PersonaObsidian"}
:::

## Install using CLI

::tabs{variant="card"}
::div{label="AI Elements Vue"}

```sh
npx ai-elements-vue@latest add persona
```

::
::div{label="shadcn-vue CLI"}

```sh
npx shadcn-vue@latest add https://registry.ai-elements-vue.com/persona.json
```

::
::

## Install Manually

Copy and paste the following code in the same folder.

:::code-group

```vue [Persona.vue] height=500 collapse
<script lang="ts" setup>
import type { EventCallback } from '@rive-app/webgl2'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { Rive } from '@rive-app/webgl2'
import { useResizeObserver } from '@vueuse/core'
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  shallowRef,
  watch,
} from 'vue'

const props = withDefaults(defineProps<PersonaProps>(), {
  state: 'idle',
  variant: 'obsidian',
})

const emits = defineEmits<PersonaEmits>()

function getCurrentTheme(): 'light' | 'dark' {
  if (typeof window !== 'undefined') {
    if (document.documentElement.classList.contains('dark')) {
      return 'dark'
    }
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
  }
  return 'light'
}

function useTheme() {
  const theme = ref<'light' | 'dark'>(getCurrentTheme())

  onMounted(() => {
    const observer = new MutationObserver(() => {
      theme.value = getCurrentTheme()
    })

    observer.observe(document.documentElement, {
      attributeFilter: ['class'],
      attributes: true,
    })

    let mql: MediaQueryList | null = null
    const handleMediaChange = () => {
      theme.value = getCurrentTheme()
    }

    if (window.matchMedia) {
      mql = window.matchMedia('(prefers-color-scheme: dark)')
      mql.addEventListener('change', handleMediaChange)
    }

    onBeforeUnmount(() => {
      observer.disconnect()
      if (mql) {
        mql.removeEventListener('change', handleMediaChange)
      }
    })
  })

  return theme
}

export type PersonaState
  = | 'idle'
    | 'listening'
    | 'thinking'
    | 'speaking'
    | 'asleep'

export interface PersonaProps {
  state?: PersonaState
  class?: string
  variant?: keyof typeof sources
}

export interface PersonaEmits {
  (e: 'load'): void
  (e: 'loadError', error: any): void
  (e: 'ready'): void
  (e: 'pause', event: Parameters<EventCallback>[0]): void
  (e: 'play', event: Parameters<EventCallback>[0]): void
  (e: 'stop', event: Parameters<EventCallback>[0]): void
}

const sources = {
  command: {
    dynamicColor: true,
    hasModel: true,
    source:
      'https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/command-2.0.riv',
  },
  glint: {
    dynamicColor: true,
    hasModel: true,
    source:
      'https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/glint-2.0.riv',
  },
  halo: {
    dynamicColor: true,
    hasModel: true,
    source:
      'https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/halo-2.0.riv',
  },
  mana: {
    dynamicColor: false,
    hasModel: true,
    source:
      'https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/mana-2.0.riv',
  },
  obsidian: {
    dynamicColor: true,
    hasModel: true,
    source:
      'https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/obsidian-2.0.riv',
  },
  opal: {
    dynamicColor: false,
    hasModel: false,
    source:
      'https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/orb-1.2.riv',
  },
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const riveInstance = shallowRef<Rive | null>(null)

const source = computed(() => sources[props.variant])
const theme = useTheme()

useResizeObserver(canvasRef, () => {
  if (riveInstance.value) {
    riveInstance.value.resizeDrawingSurfaceToCanvas()
  }
})

onMounted(() => {
  if (!canvasRef.value)
    return
  if (!source.value) {
    console.error(`Invalid variant: ${props.variant}`)
    return
  }

  riveInstance.value = new Rive({
    canvas: canvasRef.value!,
    src: source.value.source,
    autoplay: true,
    onLoad: () => {
      emits('load')

      if (
        riveInstance.value
        && riveInstance.value.stateMachineNames.length > 0
      ) {
        riveInstance.value.play(riveInstance.value.stateMachineNames[0])
      }

      // Set initial color if needed
      updateColor()
      updateState() // Initialize state
      emits('ready')
    },
    onLoadError: (err) => {
      emits('loadError', err)
    },
    onStateChange: (event) => {
      const data = event.data as string | string[]
      if (typeof data === 'string' || Array.isArray(data)) {
        if (data.includes('idle') || data.includes('State')) {
          // passing what's available or we can just emit native player events.
        }
      }
    },
    onPlay: event => emits('play', event),
    onPause: event => emits('pause', event),
    onStop: event => emits('stop', event),
  })
})

onBeforeUnmount(() => {
  if (riveInstance.value) {
    riveInstance.value.cleanup()
  }
})

// Update properties when state changes
watch(
  () => props.state,
  () => {
    updateState()
  },
)

function updateState() {
  if (!riveInstance.value || !riveInstance.value.stateMachineNames.length)
    return

  const smName = riveInstance.value.stateMachineNames[0]
  const stateMachineInputs = riveInstance.value.stateMachineInputs(smName)
  if (!stateMachineInputs)
    return

  const listeningInput = stateMachineInputs.find(i => i.name === 'listening')
  const thinkingInput = stateMachineInputs.find(i => i.name === 'thinking')
  const speakingInput = stateMachineInputs.find(i => i.name === 'speaking')
  const asleepInput = stateMachineInputs.find(i => i.name === 'asleep')

  if (listeningInput)
    listeningInput.value = props.state === 'listening'
  if (thinkingInput)
    thinkingInput.value = props.state === 'thinking'
  if (speakingInput)
    speakingInput.value = props.state === 'speaking'
  if (asleepInput)
    asleepInput.value = props.state === 'asleep'
}

// Update color when theme changes
watch(
  () => theme.value,
  () => {
    updateColor()
  },
)

function updateColor() {
  if (
    !riveInstance.value
    || !source.value.dynamicColor
    || !source.value.hasModel
  ) {
    return
  }

  // Wait for viewModel to be available
  const viewModel = riveInstance.value.viewModelInstance
  if (viewModel) {
    const colorObj = viewModel.color('color')
    if (colorObj) {
      const isDark = theme.value === 'dark'
      const [r, g, b] = isDark ? [255, 255, 255] : [0, 0, 0]
      colorObj.rgb(r, g, b)
      colorObj.internalHandleCallback?.(() => {}) // Manually trigger if required, though rgb() often flushes
    }
  }
  else {
    // If viewModel isn't loaded yet on the root instance, retry on ready
  }
}

// We also need to react if the user changes variant dynamically
watch(
  () => props.variant,
  async () => {
    if (!canvasRef.value)
      return
    // Cleanup old instance
    if (riveInstance.value) {
      riveInstance.value.cleanup()
    }

    if (!source.value) {
      console.error(`Invalid variant: ${props.variant}`)
      return
    }

    riveInstance.value = new Rive({
      canvas: canvasRef.value!,
      src: source.value.source,
      autoplay: true,
      onLoad: () => {
        emits('load')

        if (
          riveInstance.value
          && riveInstance.value.stateMachineNames.length > 0
        ) {
          riveInstance.value.play(riveInstance.value.stateMachineNames[0])
        }

        updateColor()
        updateState()
        emits('ready')
      },
      onLoadError: err => emits('loadError', err),
      onPlay: event => emits('play', event),
      onPause: event => emits('pause', event),
      onStop: event => emits('stop', event),
    })
  },
)
</script>

<template>
  <div :class="cn('size-16 shrink-0', props.class)">
    <canvas ref="canvasRef" style="width: 100%; height: 100%;" />
  </div>
</template>
```

```ts [index.ts] height=250
export { default as Persona } from './Persona.vue'
export type { PersonaEmits, PersonaProps, PersonaState } from './Persona.vue'
```

:::

## Features

- Smooth state-based animations powered by Rive
- Multiple visual variants (obsidian, mana, opal, halo, glint, command)
- Responsive to five distinct states: idle, listening, thinking, speaking, and asleep
- WebGL2-accelerated rendering for optimal performance
- Customizable size and styling
- Lifecycle callbacks for load, ready, pause, play, and stop events
- TypeScript support with full type definitions

## Variants

The Persona component comes with 6 distinct visual variants, each with its own unique aesthetic:

### Obsidian (Default)

:::ComponentLoader{label="Preview" componentName="PersonaObsidian"}
:::

### Mana

:::ComponentLoader{label="Preview" componentName="PersonaMana"}
:::

### Opal

:::ComponentLoader{label="Preview" componentName="PersonaOpal"}
:::

### Halo

:::ComponentLoader{label="Preview" componentName="PersonaHalo"}
:::

### Glint

:::ComponentLoader{label="Preview" componentName="PersonaGlint"}
:::

### Command

:::ComponentLoader{label="Preview" componentName="PersonaCommand"}
:::

## Props

### `<Persona />`

The root component that renders the animated AI visual.

:::field-group
::field{name="state" type="'idle' | 'listening' | 'thinking' | 'speaking' | 'asleep'" default="idle"}
The current state of the AI persona. Controls which animation is displayed.
::

::field{name="variant" type="'obsidian' | 'mana' | 'opal' | 'halo' | 'glint' | 'command'" default="obsidian"}
The visual style variant to display.
::
::field{name="class" type="HTMLAttributes['class']" optional}
Additional CSS classes to apply to the component.
::
::field{name="onLoad" type="RiveParameters['onLoad']" optional}
Callback fired when the Rive file starts loading.
::
::field{name="onLoadError" type="RiveParameters['onLoadError']" optional}
Callback fired if the Rive file fails to load.
::
::field{name="onReady" type="() => void" optional}
Callback fired when the Rive animation is ready to play.
::
::field{name="onPause" type="RiveParameters['onPause']" optional}
Callback fired when the animation is paused.
::
::field{name="onPlay" type="RiveParameters['onPlay']" optional}
Callback fired when the animation starts playing.
::
::field{name="onStop" type="RiveParameters['onStop']" optional}
Callback fired when the animation is stopped.
::
:::

## States

The Persona component responds to five distinct states, each triggering different animations:

- **idle**: The default resting state when the AI is not active
- **listening**: Displayed when the AI is actively listening to user input (e.g., during voice recording)
- **thinking**: Shown when the AI is processing or generating a response
- **speaking**: Active when the AI is delivering a response (e.g., text-to-speech output)
- **asleep**: A dormant state for when the AI is inactive or in low-power mode

## Usage Examples

### Basic Usage

```vue
<script setup lang="ts">
import { Persona } from '@/components/ai-elements/persona'
</script>

<template>
  <Persona state="listening" variant="opal" />
</template>
```

### With State Management

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Persona } from '@/components/ai-elements/persona'

const state = ref<'idle' | 'listening' | 'thinking' | 'speaking' | 'asleep'>(
  'idle',
)

const startListening = () => (state.value = 'listening')
const startThinking = () => (state.value = 'thinking')
const startSpeaking = () => (state.value = 'speaking')
const reset = () => (state.value = 'idle')
</script>

<template>
  <div>
    <Persona :state="state" variant="opal" class="size-32" />
    <div>
      <button @click="startListening">
        Listen
      </button>
      <button @click="startThinking">
        Think
      </button>
      <button @click="startSpeaking">
        Speak
      </button>
      <button @click="reset">
        Reset
      </button>
    </div>
  </div>
</template>
```

### With Custom Styling

```vue
<script setup lang="ts">
import { Persona } from '@/components/ai-elements/persona'
</script>

<template>
  <Persona
    state="thinking"
    variant="halo"
    class="size-64 rounded-full border border-border"
  />
</template>
```

### With Lifecycle Callbacks

```vue
<script setup lang="ts">
import { Persona } from '@/components/ai-elements/persona'

function handleReady() {
  console.log('Animation ready')
}

function handleLoad() {
  console.log('Starting to load')
}

function handleLoadError(error: any) {
  console.error('Failed to load:', error)
}

function handlePlay() {
  console.log('Animation playing')
}

function handlePause() {
  console.log('Animation paused')
}

function handleStop() {
  console.log('Animation stopped')
}
</script>

<template>
  <Persona
    state="listening"
    variant="glint"
    @ready="handleReady"
    @load="handleLoad"
    @load-error="handleLoadError"
    @play="handlePlay"
    @pause="handlePause"
    @stop="handleStop"
  />
</template>
```
