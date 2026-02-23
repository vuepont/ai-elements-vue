<script setup lang="ts">
import {
  MicSelector,
  MicSelectorContent,
  MicSelectorEmpty,
  MicSelectorInput,
  MicSelectorItem,
  MicSelectorLabel,
  MicSelectorList,
  MicSelectorTrigger,
  MicSelectorValue,
} from '@repo/elements/mic-selector'

function handleOpenChange(open: boolean) {
  console.log('MicSelector is open?', open)
}

function handleValueChange(newValue: string | undefined) {
  console.log('MicSelector value:', newValue)
}
</script>

<template>
  <div class="flex size-full flex-col items-center justify-center gap-4 p-8">
    <MicSelector
      @open-change="handleOpenChange"
      @value-change="handleValueChange"
    >
      <MicSelectorTrigger class="w-full max-w-sm">
        <MicSelectorValue />
      </MicSelectorTrigger>
      <MicSelectorContent>
        <MicSelectorInput />
        <MicSelectorEmpty />
        <MicSelectorList v-slot="{ devices }">
          <MicSelectorItem
            v-for="device in devices"
            :key="device.deviceId"
            :value="device.deviceId"
          >
            <MicSelectorLabel :device="device" />
          </MicSelectorItem>
        </MicSelectorList>
      </MicSelectorContent>
    </MicSelector>
  </div>
</template>
