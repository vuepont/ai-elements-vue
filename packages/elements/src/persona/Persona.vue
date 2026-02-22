<script lang="ts" setup>
import type { EventCallback } from '@rive-app/webgl2'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { Rive } from '@rive-app/webgl2'
import { useResizeObserver } from '@vueuse/core'
import { computed, onBeforeUnmount, onMounted, ref, shallowRef, watch } from 'vue'

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

      if (riveInstance.value && riveInstance.value.stateMachineNames.length > 0) {
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
  if (!riveInstance.value || !source.value.dynamicColor || !source.value.hasModel)
    return

  // Wait for viewModel to be available
  const viewModel = riveInstance.value.viewModelInstance
  if (viewModel) {
    const colorObj = viewModel.color('color')
    if (colorObj) {
      const isDark = theme.value === 'dark'
      const [r, g, b] = isDark ? [255, 255, 255] : [0, 0, 0]
      colorObj.rgb(r, g, b)
      colorObj.internalHandleCallback?.(() => { }) // Manually trigger if required, though rgb() often flushes
    }
  }
  else {
    // If viewModel isn't loaded yet on the root instance, retry on ready
  }
}

// We also need to react if the user changes variant dynamically
watch(() => props.variant, async () => {
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

      if (riveInstance.value && riveInstance.value.stateMachineNames.length > 0) {
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
})
</script>

<template>
  <div :class="cn('size-16 shrink-0', props.class)">
    <canvas ref="canvasRef" style="width: 100%; height: 100%;" />
  </div>
</template>
