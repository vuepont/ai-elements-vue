---
title: Persona
description: An animated AI visual component powered by Rive that responds to different states like listening, thinking, and speaking.
---

The `Persona` component displays an animated AI visual that responds to different conversational states. Built with Rive WebGL2, it provides smooth, high-performance animations for various AI interaction states including idle, listening, thinking, speaking, and asleep. The component supports multiple visual variants to match different design aesthetics.

:::ComponentLoader{label="Preview" componentName="PersonaObsidian"}
:::

## Installation

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
::field{name="state" type="\"idle\" | \"listening\" | \"thinking\" | \"speaking\" | \"asleep\"" default="\"idle\""}
The current state of the AI persona. Controls which animation is displayed.
::
::field{name="variant" type="\"obsidian\" | \"mana\" | \"opal\" | \"halo\" | \"glint\" | \"command\"" default="\"obsidian\""}
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
import { Persona } from '@repo/elements/persona'
</script>

<template>
  <Persona state="listening" variant="opal" />
</template>
```

### With State Management

```vue
<script setup lang="ts">
import { Persona } from '@repo/elements/persona'
import { ref } from 'vue'

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
import { Persona } from '@repo/elements/persona'
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
import { Persona } from '@repo/elements/persona'

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
