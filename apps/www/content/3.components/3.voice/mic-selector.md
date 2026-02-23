---
title: Mic Selector
description: A composable dropdown component for selecting audio input devices with permission handling and device change detection.
icon: lucide:mic
---

The `MicSelector` component provides a flexible and composable interface for selecting microphone input devices. Built on shadcn-vue's Command and Popover components, it features automatic device detection, permission handling, dynamic device list updates, and intelligent device name parsing.

:::ComponentLoader{label="Preview" componentName="MicSelector"}
:::

## Installation

::tabs{variant="card"}
  ::div{label="AI Elements Vue"}
  ```sh
  npx ai-elements-vue@latest add mic-selector
  ```
  ::
  ::div{label="shadcn-vue CLI"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/mic-selector.json
  ```
  ::
::

## Manual Installation

Copy and paste the following code into your project.

:::code-group
```vue [MicSelector.vue] height=500 collapse
<script setup lang="ts">
import { Popover } from '@repo/shadcn-vue/components/ui/popover'
import { useVModel } from '@vueuse/core'
import { computed, provide, ref, watch } from 'vue'
import { MicSelectorKey } from './context'
import { useAudioDevices } from './useAudioDevices'

type PopoverProps = InstanceType<typeof Popover>['$props']

interface Props extends /* @vue-ignore */ PopoverProps {
  value?: string
  defaultValue?: string
  open?: boolean
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  open: undefined,
  defaultOpen: false,
})

const emit = defineEmits<{
  (e: 'update:value', value: string | undefined): void
  (e: 'update:open', open: boolean): void
  (e: 'valueChange', value: string | undefined): void
  (e: 'openChange', open: boolean): void
}>()

const value = useVModel(props, 'value', emit, {
  defaultValue: props.defaultValue,
  passive: (props.value === undefined) as any,
})

const open = useVModel(props, 'open', emit, {
  defaultValue: props.defaultOpen,
  passive: (props.open === undefined) as any,
})

const forwardedProps = computed(() => {
  const { value, defaultValue, open, defaultOpen, ...rest } = props
  return rest
})

const width = ref(200)

const { devices, hasPermission, loadDevices, loading } = useAudioDevices()

watch([open, hasPermission, loading], ([newOpen, newHasPermission, newLoading]) => {
  if (newOpen && !newHasPermission && !newLoading) {
    loadDevices()
  }
})

function setValue(newValue: string | undefined) {
  value.value = newValue
  emit('valueChange', newValue)
}

function setOpen(newOpen: boolean) {
  open.value = newOpen
  emit('openChange', newOpen)
}

function setWidth(newWidth: number) {
  width.value = newWidth
}

provide(MicSelectorKey, {
  devices,
  value,
  setValue,
  open,
  setOpen,
  width,
  setWidth,
})
</script>

<template>
  <Popover
    v-bind="forwardedProps"
    :open="open"
    @update:open="setOpen"
  >
    <slot />
  </Popover>
</template>
```

```vue [MicSelectorTrigger.vue] height=500 collapse
<script setup lang="ts">
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { PopoverTrigger } from '@repo/shadcn-vue/components/ui/popover'
import { useResizeObserver } from '@vueuse/core'
import { ChevronsUpDownIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import { useMicSelector } from './context'

type ButtonProps = InstanceType<typeof Button>['$props']

interface Props extends /* @vue-ignore */ ButtonProps {}

const props = defineProps<Props>()

const forwardedProps = computed(() => {
  const { variant, ref: _ref, ...rest } = props
  return rest
})

const { setWidth } = useMicSelector('MicSelectorTrigger')
const triggerRef = ref<InstanceType<typeof Button> | null>(null)

useResizeObserver(triggerRef, (entries) => {
  const entry = entries[0]
  const newWidth = (entry.target as HTMLElement).offsetWidth
  if (newWidth) {
    setWidth(newWidth)
  }
})
</script>

<template>
  <PopoverTrigger as-child>
    <Button
      ref="triggerRef"
      variant="outline"
      v-bind="forwardedProps"
    >
      <slot />
      <ChevronsUpDownIcon
        class="shrink-0 text-muted-foreground"
        :size="16"
      />
    </Button>
  </PopoverTrigger>
</template>
```

```vue [MicSelectorContent.vue] height=500 collapse
<script setup lang="ts">
import type { AcceptableValue } from 'reka-ui'
import type { HTMLAttributes } from 'vue'
import { Command } from '@repo/shadcn-vue/components/ui/command'
import { PopoverContent } from '@repo/shadcn-vue/components/ui/popover'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useMicSelector } from './context'

type PopoverContentProps = InstanceType<typeof PopoverContent>['$props']
type CommandProps = InstanceType<typeof Command>['$props']

interface Props extends /* @vue-ignore */ CommandProps {
  class?: HTMLAttributes['class']
  popoverOptions?: PopoverContentProps
}

const props = defineProps<Props>()

const { width, value, setValue } = useMicSelector('MicSelectorContent')

function handleValueChange(newValue: AcceptableValue) {
  if (typeof newValue === 'string') {
    setValue(newValue)
  }
}
</script>

<template>
  <PopoverContent
    :class="cn('p-0', props.class)"
    :style="{ width: `${width}px` }"
    v-bind="props.popoverOptions"
  >
    <Command
      :model-value="value"
      v-bind="$attrs"
      @update:model-value="handleValueChange"
    >
      <slot />
    </Command>
  </PopoverContent>
</template>
```

```vue [MicSelectorInput.vue] height=500 collapse
<script setup lang="ts">
import { CommandInput } from '@repo/shadcn-vue/components/ui/command'

type CommandInputProps = InstanceType<typeof CommandInput>['$props']

interface Props extends /* @vue-ignore */ CommandInputProps {}

const props = defineProps<Props>()
</script>

<template>
  <CommandInput
    placeholder="Search microphones..."
    v-bind="props"
  />
</template>
```

```vue [MicSelectorList.vue] height=500 collapse
<script setup lang="ts">
import { CommandGroup, CommandList } from '@repo/shadcn-vue/components/ui/command'
import { useMicSelector } from './context'

type CommandListProps = InstanceType<typeof CommandList>['$props']

interface Props extends /* @vue-ignore */ CommandListProps {}

const props = defineProps<Props>()

const { devices } = useMicSelector('MicSelectorList')
</script>

<template>
  <CommandList v-bind="props">
    <CommandGroup v-if="devices.length > 0">
      <slot :devices="devices" />
    </CommandGroup>
  </CommandList>
</template>
```

```vue [MicSelectorEmpty.vue] height=500 collapse
<script setup lang="ts">
import { CommandEmpty } from '@repo/shadcn-vue/components/ui/command'

type CommandEmptyProps = InstanceType<typeof CommandEmpty>['$props']

interface Props extends /* @vue-ignore */ CommandEmptyProps {}

const props = defineProps<Props>()
</script>

<template>
  <CommandEmpty v-bind="props">
    <slot>No microphone found.</slot>
  </CommandEmpty>
</template>
```

```vue [MicSelectorItem.vue] height=500 collapse
<script setup lang="ts">
import { CommandItem } from '@repo/shadcn-vue/components/ui/command'
import { computed } from 'vue'
import { useMicSelector } from './context'

type CommandItemProps = InstanceType<typeof CommandItem>['$props']

interface Props extends /* @vue-ignore */ CommandItemProps {
  value: string
}

const props = defineProps<Props>()

const forwardedProps = computed(() => {
  const { value, ...rest } = props
  return rest
})

const { setValue, setOpen } = useMicSelector('MicSelectorItem')

function handleSelect() {
  setValue(props.value)
  setOpen(false)
}
</script>

<template>
  <CommandItem
    class="hover:bg-accent hover:text-accent-foreground"
    v-bind="forwardedProps"
    :value="props.value"
    @select="handleSelect"
  >
    <slot />
  </CommandItem>
</template>
```

```vue [MicSelectorLabel.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  device: MediaDeviceInfo
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const deviceIdRegex = /\([\da-f]{4}:[\da-f]{4}\)$/i

const parsedLabel = computed(() => {
  const matches = props.device.label.match(deviceIdRegex)

  if (!matches) {
    return { name: props.device.label, deviceId: null }
  }

  const [, deviceId] = matches
  const name = props.device.label.replace(deviceIdRegex, '')
  return { name, deviceId }
})
</script>

<template>
  <span :class="cn(props.class)">
    <span>{{ parsedLabel.name }}</span>
    <span v-if="parsedLabel.deviceId" class="text-muted-foreground"> ({{ parsedLabel.deviceId }})</span>
  </span>
</template>
```

```vue [MicSelectorValue.vue] height=500 collapse
<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'
import { useMicSelector } from './context'
import MicSelectorLabel from './MicSelectorLabel.vue'

interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { devices, value } = useMicSelector('MicSelectorValue')

const currentDevice = computed(() => {
  return devices.value.find(d => d.deviceId === value.value)
})
</script>

<template>
  <span
    v-if="!currentDevice"
    :class="cn('flex-1 text-left', props.class)"
  >
    Select microphone...
  </span>
  <MicSelectorLabel
    v-else
    :class="cn('flex-1 text-left', props.class)"
    :device="currentDevice"
  />
</template>
```

```ts [context.ts]
import type { InjectionKey, Ref } from 'vue'
import { inject } from 'vue'

export interface MicSelectorContextValue {
  devices: Ref<MediaDeviceInfo[]>
  value: Ref<string | undefined>
  setValue: (value: string | undefined) => void
  open: Ref<boolean | undefined>
  setOpen: (open: boolean) => void
  width: Ref<number>
  setWidth: (width: number) => void
}

export const MicSelectorKey: InjectionKey<MicSelectorContextValue> = Symbol('MicSelector')

export function useMicSelector(componentName: string): MicSelectorContextValue {
  const context = inject(MicSelectorKey)

  if (!context) {
    throw new Error(`${componentName} must be used within MicSelector`)
  }

  return context
}
```

```ts [useAudioDevices.ts]
import { onMounted, onUnmounted, ref } from 'vue'

export function useAudioDevices() {
  const devices = ref<MediaDeviceInfo[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)
  const hasPermission = ref(false)

  async function loadDevicesWithoutPermission() {
    try {
      loading.value = true
      error.value = null

      const deviceList = await navigator.mediaDevices.enumerateDevices()
      const audioInputs = deviceList.filter(
        device => device.kind === 'audioinput' && device.deviceId !== '' && device.label !== '',
      )

      devices.value = audioInputs
    }
    catch (err) {
      const message
        = err instanceof Error ? err.message : 'Failed to get audio devices'

      error.value = message
      console.error('Error getting audio devices:', message)
    }
    finally {
      loading.value = false
    }
  }

  async function loadDevicesWithPermission() {
    if (loading.value) {
      return
    }

    try {
      loading.value = true
      error.value = null

      const tempStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      })

      for (const track of tempStream.getTracks()) {
        track.stop()
      }

      const deviceList = await navigator.mediaDevices.enumerateDevices()
      const audioInputs = deviceList.filter(
        device => device.kind === 'audioinput' && device.deviceId !== '' && device.label !== '',
      )

      devices.value = audioInputs
      hasPermission.value = true
    }
    catch (err) {
      const message
        = err instanceof Error ? err.message : 'Failed to get audio devices'

      error.value = message
      console.error('Error getting audio devices:', message)
    }
    finally {
      loading.value = false
    }
  }

  function handleDeviceChange() {
    if (hasPermission.value) {
      loadDevicesWithPermission()
    }
    else {
      loadDevicesWithoutPermission()
    }
  }

  onMounted(() => {
    loadDevicesWithoutPermission()
    navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange)
  })

  onUnmounted(() => {
    navigator.mediaDevices.removeEventListener(
      'devicechange',
      handleDeviceChange,
    )
  })

  return {
    devices,
    error,
    hasPermission,
    loadDevices: loadDevicesWithPermission,
    loading,
  }
}
```

```ts [index.ts]
export * from './context'
export { default as MicSelector } from './MicSelector.vue'
export { default as MicSelectorContent } from './MicSelectorContent.vue'
export { default as MicSelectorEmpty } from './MicSelectorEmpty.vue'
export { default as MicSelectorInput } from './MicSelectorInput.vue'
export { default as MicSelectorItem } from './MicSelectorItem.vue'
export { default as MicSelectorLabel } from './MicSelectorLabel.vue'
export { default as MicSelectorList } from './MicSelectorList.vue'
export { default as MicSelectorTrigger } from './MicSelectorTrigger.vue'
export { default as MicSelectorValue } from './MicSelectorValue.vue'
export * from './useAudioDevices'
```
:::

## Features

- Fully composable architecture with granular control components
- Automatic audio input device enumeration
- Permission-based device name display
- Real-time device change detection via `devicechange` events
- Intelligent device label parsing with ID extraction
- Controlled and uncontrolled component patterns
- Responsive width matching between trigger and content
- Built on shadcn-vue Command and Popover components
- Full TypeScript support with proper types for all components

## Props

### `<MicSelector />`

Root Popover component that provides context for all child components.

:::field-group
  ::field{name="v-model:value" type="string"}
  The selected device ID (controlled).
  ::
  ::field{name="defaultValue" type="string"}
  The default selected device ID (uncontrolled).
  ::
  ::field{name="v-model:open" type="boolean"}
  The open state of the popover (controlled).
  ::
  ::field{name="defaultOpen" type="boolean" default="false"}
  The default open state (uncontrolled).
  ::
  ::field{name="...props" type="PopoverProps"}
  Any other props are spread to the Popover component.
  ::
:::

### `<MicSelectorTrigger />`

Button that opens the microphone selector popover. Automatically tracks its width to match the popover content.

:::field-group
  ::field{name="...props" type="ButtonProps"}
  Any other props are spread to the Button component.
  ::
:::

### `<MicSelectorValue />`

Displays the currently selected microphone name or a placeholder.

:::field-group
  ::field{name="...props" type="HTMLAttributes"}
  Any other props are spread to the span element.
  ::
:::

### `<MicSelectorContent />`

Container for the Command component, rendered inside the popover.

:::field-group
  ::field{name="popoverOptions" type="PopoverContentProps"}
  Props to pass to the underlying PopoverContent component.
  ::
  ::field{name="...props" type="CommandProps"}
  Any other props are spread to the Command component.
  ::
:::

### `<MicSelectorInput />`

Search input for filtering microphones.

:::field-group
  ::field{name="...props" type="CommandInputProps"}
  Any other props are spread to the CommandInput component.
  ::
:::

### `<MicSelectorList />`

Wrapper for the list of microphone items. Uses scoped slots to provide access to device data.

:::field-group
  ::field{name="v-slot" type="{ devices: MediaDeviceInfo[] }"}
  Scoped slot that receives the array of available devices.
  ::
  ::field{name="...props" type="CommandListProps"}
  Any other props are spread to the CommandList component.
  ::
:::

### `<MicSelectorEmpty />`

Message shown when no microphones match the search.

:::field-group
  ::field{name="...props" type="CommandEmptyProps"}
  Any other props are spread to the CommandEmpty component.
  ::
:::

### `<MicSelectorItem />`

Selectable item representing a microphone.

:::field-group
  ::field{name="value" type="string"}
  The device ID for this item.
  ::
  ::field{name="...props" type="CommandItemProps"}
  Any other props are spread to the CommandItem component.
  ::
:::

### `<MicSelectorLabel />`

Displays a formatted microphone label with intelligent device ID parsing. Automatically extracts and styles device IDs in the format `(XXXX:XXXX)`.

:::field-group
  ::field{name="device" type="MediaDeviceInfo"}
  The `MediaDeviceInfo` object for the device.
  ::
  ::field{name="...props" type="HTMLAttributes"}
  Any other props are spread to the span element.
  ::
:::

## Emits

### `<MicSelector />`

:::field-group
  ::field{name="update:value" type="string | undefined"}
  Emitted when the selected device changes (for v-model).
  ::
  ::field{name="valueChange" type="string | undefined"}
  Callback emitted when the selected device changes.
  ::
  ::field{name="update:open" type="boolean"}
  Emitted when the open state changes (for v-model).
  ::
  ::field{name="openChange" type="boolean"}
  Callback emitted when the open state changes.
  ::
:::

## Composables

### `useAudioDevices()`

A custom composable for managing audio input devices. This composable is used internally by the `MicSelector` component but can also be used independently.

```vue
<script setup lang="ts">
import { useAudioDevices } from '@repo/elements/mic-selector'

const { devices, loading, error, hasPermission, loadDevices } = useAudioDevices()
</script>

<template>
  <div>
    <p v-if="loading">
      Loading devices...
    </p>
    <p v-else-if="error">
      Error: {{ error }}
    </p>
    <div v-for="device in devices" :key="device.deviceId">
      {{ device.label }}
    </div>
    <button v-if="!hasPermission" @click="loadDevices">
      Grant Permission
    </button>
  </div>
</template>
```

#### Return Value

:::field-group
  ::field{name="devices" type="Ref<MediaDeviceInfo[]>"}
  Array of available audio input devices.
  ::
  ::field{name="loading" type="Ref<boolean>"}
  Whether devices are currently being loaded.
  ::
  ::field{name="error" type="Ref<string | null>"}
  Error message if device loading failed.
  ::
  ::field{name="hasPermission" type="Ref<boolean>"}
  Whether microphone permission has been granted.
  ::
  ::field{name="loadDevices" type="() => Promise<void>"}
  Function to request microphone permission and load device names.
  ::
:::

## Behavior

### Permission Handling

The component implements a two-stage permission approach:

1. **Without Permission**: Initially loads devices without requesting permission. Device labels may show as generic names (e.g., "Microphone 1").
2. **With Permission**: When the popover is opened and permission hasn't been granted, automatically requests microphone access and displays actual device names.

### Device Label Parsing

The `MicSelectorLabel` component intelligently parses device names that include hardware IDs in the format `(XXXX:XXXX)`. It splits the label into the device name and ID, styling the ID with muted text for better readability.

For example: `"MacBook Pro Microphone (1a2b:3c4d)"` becomes:

- Device name: `"MacBook Pro Microphone"`
- Device ID: `"(1a2b:3c4d)"` (styled with muted color)

### Width Synchronization

The `MicSelectorTrigger` uses a `ResizeObserver` to track its width and automatically synchronizes it with the `MicSelectorContent` popover width for a cohesive appearance.

### Device Change Detection

The component listens for `devicechange` events (e.g., plugging/unplugging microphones) and automatically updates the device list in real-time.

## Accessibility

- Uses semantic HTML with proper ARIA attributes via shadcn-vue components
- Full keyboard navigation support through Command component
- Screen reader friendly with proper labels and roles
- Searchable device list for quick selection

## Notes

- Requires a secure context (HTTPS or localhost) for microphone access
- Browser may prompt user for microphone permission on first open
- Device labels are only fully descriptive after permission is granted
- Component handles cleanup of temporary media streams during permission requests
- Uses VueUse's `useVModel` for flexible controlled/uncontrolled patterns
