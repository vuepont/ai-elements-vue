<script setup lang="ts">
import type { Experimental_SpeechResult as SpeechResult } from 'ai'
import {
  AudioPlayer,
  AudioPlayerControlBar,
  AudioPlayerDurationDisplay,
  AudioPlayerElement,
  AudioPlayerMuteButton,
  AudioPlayerPlayButton,
  AudioPlayerSeekBackwardButton,
  AudioPlayerSeekForwardButton,
  AudioPlayerTimeDisplay,
  AudioPlayerTimeRange,
  AudioPlayerVolumeRange,
} from '@repo/elements/audio-player'
import { onMounted, ref } from 'vue'

const audioData = ref<SpeechResult['audio'] | null>(null)

async function fetchData() {
  const response = await fetch(
    'https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/ElevenLabs_2025-11-10T22_07_46_Hayden_pvc_sp108_s50_sb75_se0_b_m2.mp3',
  )
  const arrayBuffer = await response.arrayBuffer()

  // Convert ArrayBuffer to base64 using a browser-friendly method
  const uint8Array = new Uint8Array(arrayBuffer)
  let binary = ''
  const len = uint8Array.byteLength
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(uint8Array[i])
  }
  const base64 = window.btoa(binary)

  audioData.value = {
    base64,
    format: 'mp3',
    mediaType: 'audio/mpeg',
    uint8Array,
  }
}

onMounted(() => {
  if (!audioData.value) {
    fetchData()
  }
})
</script>

<template>
  <div class="flex size-full items-center justify-center p-8">
    <div v-if="!audioData">
      Loading...
    </div>
    <AudioPlayer v-else>
      <AudioPlayerElement :data="audioData" />
      <AudioPlayerControlBar>
        <AudioPlayerPlayButton />
        <AudioPlayerSeekBackwardButton :seek-offset="10" />
        <AudioPlayerSeekForwardButton :seek-offset="10" />
        <AudioPlayerTimeDisplay />
        <AudioPlayerTimeRange />
        <AudioPlayerDurationDisplay />
        <AudioPlayerMuteButton />
        <AudioPlayerVolumeRange />
      </AudioPlayerControlBar>
    </AudioPlayer>
  </div>
</template>
