---
title: Audio Player
description: A composable audio player component built on media-chrome, with shadcn styling and flexible controls.
icon: lucide:play
---

The `AudioPlayer` component provides a flexible and customizable audio playback interface built on top of media-chrome. It features a composable architecture that allows you to build audio experiences with custom controls, metadata display, and seamless integration with AI-generated audio content.

:::ComponentLoader{label="Preview" componentName="AudioPlayer"}
:::

## Installation

::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add audio-player
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/audio-player.json
  ```
  ::
::

## Configuration

Since this component uses Web Components (via `media-chrome`), you must configure your Vue compiler to recognize `media-` tags to avoid "Failed to resolve component" warnings.

::tabs{variant="card"}
  ::div{label="Nuxt"}
  ```ts [nuxt.config.ts]
  export default defineNuxtConfig({
    vue: {
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('media-'),
      },
    },
  })
  ```
  ::
  ::div{label="Vite / Vue"}
  ```ts [vite.config.ts]
  import vue from '@vitejs/plugin-vue'
  import { defineConfig } from 'vite'

  export default defineConfig({
    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: tag => tag.startsWith('media-'),
          },
        },
      }),
    ],
  })
  ```
  ::
::

## Manual Installation

Copy and paste the following code into your project.

:::code-group
```vue [AudioPlayer.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import 'media-chrome'

interface Props {
  class?: HTMLAttributes['class']
  style?: HTMLAttributes['style']
}

const props = defineProps<Props>()
</script>

<template>
  <media-controller
    audio
    data-slot="audio-player"
    :class="props.class"
    :style="[
      {
        '--media-background-color': 'transparent',
        '--media-button-icon-height': '1rem',
        '--media-button-icon-width': '1rem',
        '--media-control-background': 'transparent',
        '--media-control-hover-background': 'var(--color-accent)',
        '--media-control-padding': '0',
        '--media-font': 'var(--font-sans)',
        '--media-font-size': '10px',
        '--media-icon-color': 'currentColor',
        '--media-preview-time-background': 'var(--color-background)',
        '--media-preview-time-border-radius': 'var(--radius-md)',
        '--media-preview-time-text-shadow': 'none',
        '--media-primary-color': 'var(--color-primary)',
        '--media-range-bar-color': 'var(--color-primary)',
        '--media-range-track-background': 'var(--color-secondary)',
        '--media-secondary-color': 'var(--color-secondary)',
        '--media-text-color': 'var(--color-foreground)',
        '--media-tooltip-arrow-display': 'none',
        '--media-tooltip-background': 'var(--color-background)',
        '--media-tooltip-border-radius': 'var(--radius-md)',
      },
      props.style,
    ]"
  >
    <slot />
  </media-controller>
</template>
```

```vue [AudioPlayerElement.vue] height=500 collapse
<script setup lang="ts">
import type { Experimental_SpeechResult as SpeechResult } from 'ai'
import type { AudioHTMLAttributes } from 'vue'
import { computed } from 'vue'

interface Props extends /* @vue-ignore */ AudioHTMLAttributes {
  src?: string
  data?: SpeechResult['audio']
}

const props = defineProps<Props>()

const audioSrc = computed(() => {
  if (props.src) {
    return props.src
  }
  if (props.data) {
    return `data:${props.data.mediaType};base64,${props.data.base64}`
  }
  return undefined
})
</script>

<template>
  <audio
    v-bind="{ ...$attrs, slot: 'media' }"
    data-slot="audio-player-element"
    :src="audioSrc"
  />
</template>
```

```vue [AudioPlayerControlBar.vue] height=500 collapse
<script setup lang="ts">
import { ButtonGroup } from '@repo/shadcn-vue/components/ui/button-group'

interface Props {}

defineProps<Props>()
</script>

<template>
  <media-control-bar data-slot="audio-player-control-bar">
    <ButtonGroup orientation="horizontal">
      <slot />
    </ButtonGroup>
  </media-control-bar>
</template>
```

```vue [AudioPlayerPlayButton.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <Button
    as-child
    size="icon-sm"
    variant="outline"
  >
    <media-play-button
      :class="cn('bg-transparent', props.class)"
      data-slot="audio-player-play-button"
    />
  </Button>
</template>
```

```vue [AudioPlayerSeekBackwardButton.vue] height=500 collapse
<script setup lang="ts">
import type { MediaSeekBackwardButton } from 'media-chrome'
import { Button } from '@repo/shadcn-vue/components/ui/button'

interface Props extends /* @vue-ignore */ Partial<MediaSeekBackwardButton> {
  seekOffset?: number
}

const props = withDefaults(defineProps<Props>(), {
  seekOffset: 10,
})
</script>

<template>
  <Button
    as-child
    size="icon-sm"
    variant="outline"
  >
    <media-seek-backward-button
      data-slot="audio-player-seek-backward-button"
      :seekoffset="props.seekOffset"
    />
  </Button>
</template>
```

```vue [AudioPlayerSeekForwardButton.vue] height=500 collapse
<script setup lang="ts">
import type { MediaSeekForwardButton } from 'media-chrome'
import { Button } from '@repo/shadcn-vue/components/ui/button'

interface Props extends /* @vue-ignore */ Partial<MediaSeekForwardButton> {
  seekOffset?: number
}

const props = withDefaults(defineProps<Props>(), {
  seekOffset: 20,
})
</script>

<template>
  <Button
    as-child
    size="icon-sm"
    variant="outline"
  >
    <media-seek-forward-button
      data-slot="audio-player-seek-forward-button"
      :seekoffset="props.seekOffset"
    />
  </Button>
</template>
```

```vue [AudioPlayerTimeDisplay.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ButtonGroupText } from '@repo/shadcn-vue/components/ui/button-group'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <ButtonGroupText
    as-child
    class="bg-transparent"
  >
    <media-time-display
      :class="cn('tabular-nums', props.class)"
      data-slot="audio-player-time-display"
    />
  </ButtonGroupText>
</template>
```

```vue [AudioPlayerTimeRange.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ButtonGroupText } from '@repo/shadcn-vue/components/ui/button-group'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <ButtonGroupText
    as-child
    class="bg-transparent"
  >
    <media-time-range
      :class="cn('', props.class)"
      data-slot="audio-player-time-range"
    />
  </ButtonGroupText>
</template>
```

```vue [AudioPlayerDurationDisplay.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ButtonGroupText } from '@repo/shadcn-vue/components/ui/button-group'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <ButtonGroupText
    as-child
    class="bg-transparent"
  >
    <media-duration-display
      :class="cn('tabular-nums', props.class)"
      data-slot="audio-player-duration-display"
    />
  </ButtonGroupText>
</template>
```

```vue [AudioPlayerMuteButton.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ButtonGroupText } from '@repo/shadcn-vue/components/ui/button-group'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <ButtonGroupText
    as-child
    class="bg-transparent"
  >
    <media-mute-button
      :class="cn('', props.class)"
      data-slot="audio-player-mute-button"
    />
  </ButtonGroupText>
</template>
```

```vue [AudioPlayerVolumeRange.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { ButtonGroupText } from '@repo/shadcn-vue/components/ui/button-group'
import { cn } from '@repo/shadcn-vue/lib/utils'

interface Props {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()
</script>

<template>
  <ButtonGroupText
    as-child
    class="bg-transparent"
  >
    <media-volume-range
      :class="cn('', props.class)"
      data-slot="audio-player-volume-range"
    />
  </ButtonGroupText>
</template>
```

```ts [index.ts]
export { default as AudioPlayer } from './AudioPlayer.vue'
export { default as AudioPlayerControlBar } from './AudioPlayerControlBar.vue'
export { default as AudioPlayerDurationDisplay } from './AudioPlayerDurationDisplay.vue'
export { default as AudioPlayerElement } from './AudioPlayerElement.vue'
export { default as AudioPlayerMuteButton } from './AudioPlayerMuteButton.vue'
export { default as AudioPlayerPlayButton } from './AudioPlayerPlayButton.vue'
export { default as AudioPlayerSeekBackwardButton } from './AudioPlayerSeekBackwardButton.vue'
export { default as AudioPlayerSeekForwardButton } from './AudioPlayerSeekForwardButton.vue'
export { default as AudioPlayerTimeDisplay } from './AudioPlayerTimeDisplay.vue'
export { default as AudioPlayerTimeRange } from './AudioPlayerTimeRange.vue'
export { default as AudioPlayerVolumeRange } from './AudioPlayerVolumeRange.vue'
```
:::

## Features

- Built on media-chrome for reliable audio playback
- Fully composable architecture with granular control components
- ButtonGroup integration for cohesive control layout
- Individual control components (play, seek, volume, etc.)
- Flexible layout with customizable control bars
- CSS custom properties for deep theming
- Shadcn-vue Button component styling
- Responsive design that works across devices
- Full TypeScript support with proper types for all components

## Variants

### AI SDK Speech Result

The `AudioPlayer` component can be used to play audio from an AI SDK Speech Result.

:::ComponentLoader{label="Preview" componentName="AudioPlayer"}
:::

### Remote Audio

The `AudioPlayer` component can be used to play remote audio files.

:::ComponentLoader{label="Preview" componentName="AudioPlayerRemote"}
:::

## Props

### `<AudioPlayer />`

Root MediaController component.

:::field-group
  ::field{name="class" type="HTMLAttributes['class']"}
  Additional CSS classes to apply.
  ::
  ::field{name="style" type="HTMLAttributes['style']"}
  Custom CSS properties to override media-chrome theming variables.
  ::
  ::field{name="...props" type="MediaControllerProps"}
  Any other props are spread to the media-controller element.
  ::
:::

### `<AudioPlayerElement />`

The audio element that contains the media source. Accepts either a remote URL or AI SDK Speech Result data.

:::field-group
  ::field{name="src" type="string"}
  The URL of the audio file to play (for remote audio).
  ::
  ::field{name="data" type="SpeechResult['audio']"}
  AI SDK Speech Result audio data with base64 encoding (for AI-generated audio).
  ::
  ::field{name="...props" type="AudioHTMLAttributes"}
  Any other props are spread to the audio element.
  ::
:::

### `<AudioPlayerControlBar />`

Container for control buttons, wraps children in a ButtonGroup.

:::field-group
  ::field{name="...props" type="MediaControlBarProps"}
  Any other props are spread to the media-control-bar element.
  ::
:::

### `<AudioPlayerPlayButton />`

Play/pause button wrapped in a shadcn-vue Button component.

:::field-group
  ::field{name="class" type="string"}
  Additional CSS classes to apply.
  ::
:::

### `<AudioPlayerSeekBackwardButton />`

Seek backward button wrapped in a shadcn-vue Button component.

:::field-group
  ::field{name="seekOffset" type="number" default="10"}
  The number of seconds to seek backward.
  ::
:::

### `<AudioPlayerSeekForwardButton />`

Seek forward button wrapped in a shadcn-vue Button component.

:::field-group
  ::field{name="seekOffset" type="number" default="20"}
  The number of seconds to seek forward.
  ::
:::

### `<AudioPlayerTimeDisplay />`

Displays the current playback time, wrapped in ButtonGroupText.

### `<AudioPlayerTimeRange />`

Seek slider for controlling playback position, wrapped in ButtonGroupText.

### `<AudioPlayerDurationDisplay />`

Displays the total duration of the audio, wrapped in ButtonGroupText.

### `<AudioPlayerMuteButton />`

Mute/unmute button, wrapped in ButtonGroupText.

### `<AudioPlayerVolumeRange />`

Volume slider control, wrapped in ButtonGroupText.

## Behavior

### Custom Theming

The component uses CSS custom properties for theming. You can override these by passing a `style` prop to the `<AudioPlayer />` component:

```vue
<AudioPlayer :style="{ '--media-primary-color': 'red' }">
  ...
</AudioPlayer>
```

### Composable Controls

The components are designed to be used together within the `AudioPlayer` context. You can reorder or omit any control component to fit your needs.

## Accessibility

- Built on accessible media-chrome components
- Supports keyboard navigation
- Proper ARIA roles and labels for all controls
- Screen reader friendly time and volume displays

## Notes

- Requires `media-chrome` package to be installed
- Audio playback requires a user interaction in most browsers (autoplay is often blocked)
- For base64 audio, ensure the correct `mediaType` is provided in the data object
- Component uses VueUse's `useResizeObserver` internally for some layouts
