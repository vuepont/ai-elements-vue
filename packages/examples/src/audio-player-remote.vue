<script setup lang="ts">
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
</script>

<template>
  <div class="flex size-full items-center justify-center p-8">
    <AudioPlayer>
      <AudioPlayerElement src="https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/ElevenLabs_2025-11-10T22_07_46_Hayden_pvc_sp108_s50_sb75_se0_b_m2.mp3" />
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
