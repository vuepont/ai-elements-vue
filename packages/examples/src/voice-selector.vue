<script setup lang="ts">
import {
  VoiceSelector,
  VoiceSelectorAccent,
  VoiceSelectorAge,
  VoiceSelectorAttributes,
  VoiceSelectorBullet,
  VoiceSelectorContent,
  VoiceSelectorDescription,
  VoiceSelectorEmpty,
  VoiceSelectorGender,
  VoiceSelectorGroup,
  VoiceSelectorInput,
  VoiceSelectorItem,
  VoiceSelectorList,
  VoiceSelectorName,
  VoiceSelectorPreview,
  VoiceSelectorTrigger,
} from '@repo/elements/voice-selector'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { computed, ref } from 'vue'

interface Voice {
  id: string
  name: string
  description: string
  gender: 'male' | 'female' | 'transgender' | 'androgyne' | 'non-binary' | 'intersex'
  accent: string
  age: string
  previewUrl: string
}

const voices: Voice[] = [
  {
    id: 'liam',
    name: 'Liam',
    description: 'Energetic, Social Media Creator',
    gender: 'male',
    accent: 'american',
    age: '20-30',
    previewUrl:
      'https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/ElevenLabs_2026-01-16T21_16_50_Liam%20-%20Energetic%2C%20Social%20Media%20Creator_pre_sp100_s50_sb75_se0_b_m2.mp3',
  },
  {
    id: 'adam',
    name: 'Adam',
    description: 'Dominant, Firm',
    gender: 'male',
    accent: 'american',
    age: '30-40',
    previewUrl:
      'https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/ElevenLabs_2026-01-16T21_17_00_Adam%20-%20Dominant%2C%20Firm_pre_sp100_s50_sb75_se0_b_m2.mp3',
  },
  {
    id: 'alice',
    name: 'Alice',
    description: 'Clear, Engaging Educator',
    gender: 'female',
    accent: 'british',
    age: '30-40',
    previewUrl:
      'https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/ElevenLabs_2026-01-16T21_17_09_Alice%20-%20Clear%2C%20Engaging%20Educator_pre_sp100_s50_sb75_se0_b_m2.mp3',
  },
  {
    id: 'bill',
    name: 'Bill',
    description: 'Wise, Mature, Balanced',
    gender: 'male',
    accent: 'american',
    age: '50-60',
    previewUrl:
      'https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/ElevenLabs_2026-01-16T21_17_25_Bill%20-%20Wise%2C%20Mature%2C%20Balanced_pre_sp100_s50_sb75_se0_b_m2.mp3',
  },
  {
    id: 'jessica',
    name: 'Jessica',
    description: 'Playful, Bright, Warm',
    gender: 'female',
    accent: 'american',
    age: '20-30',
    previewUrl:
      'https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/ElevenLabs_2026-01-16T21_17_50_Jessica%20-%20Playful%2C%20Bright%2C%20Warm_pre_sp100_s50_sb75_se0_b_m2.mp3',
  },
  {
    id: 'lily',
    name: 'Lily',
    description: 'Velvety Actress',
    gender: 'female',
    accent: 'british',
    age: '30-40',
    previewUrl:
      'https://ejiidnob33g9ap1r.public.blob.vercel-storage.com/ElevenLabs_2026-01-16T21_18_03_Lily%20-%20Velvety%20Actress_pre_sp100_s50_sb75_se0_b_m2.mp3',
  },
]

const open = ref(false)
const selectedVoice = ref<string | undefined>()
const playingVoice = ref<string | null>(null)
const loadingVoice = ref<string | null>(null)
const audioRef = ref<HTMLAudioElement | null>(null)

function handleSelect(voiceId: string) {
  selectedVoice.value = voiceId
  open.value = false
}

function handlePreview(voiceId: string) {
  const voice = voices.find(v => v.id === voiceId)
  if (!voice) {
    return
  }

  // If clicking the same voice that's playing, pause it
  if (playingVoice.value === voiceId) {
    audioRef.value?.pause()
    playingVoice.value = null
    return
  }

  // Stop any currently playing audio
  if (audioRef.value) {
    audioRef.value.pause()
    audioRef.value = null
  }

  loadingVoice.value = voiceId

  const audio = new Audio(voice.previewUrl)
  audioRef.value = audio

  audio.addEventListener('canplaythrough', () => {
    loadingVoice.value = null
    playingVoice.value = voiceId
    audio.play()
  })

  audio.addEventListener('ended', () => {
    playingVoice.value = null
  })

  audio.addEventListener('error', () => {
    loadingVoice.value = null
    playingVoice.value = null
  })

  audio.load()
}

const selectedVoiceData = computed(() => voices.find(voice => voice.id === selectedVoice.value))
</script>

<template>
  <div class="flex size-full flex-col items-center justify-center">
    <VoiceSelector v-model:open="open" v-model:value="selectedVoice">
      <VoiceSelectorTrigger as-child>
        <Button class="w-full max-w-xs" variant="outline">
          <template v-if="selectedVoiceData">
            <VoiceSelectorName>{{ selectedVoiceData.name }}</VoiceSelectorName>
            <VoiceSelectorAttributes>
              <VoiceSelectorAccent :value="selectedVoiceData.accent" />
              <VoiceSelectorBullet />
              <VoiceSelectorAge>{{ selectedVoiceData.age }}</VoiceSelectorAge>
              <VoiceSelectorBullet />
              <VoiceSelectorGender :value="selectedVoiceData.gender" />
            </VoiceSelectorAttributes>
          </template>
          <span v-else class="flex-1 text-left text-sm">
            Select a voice...
          </span>
        </Button>
      </VoiceSelectorTrigger>
      <VoiceSelectorContent class="max-w-md">
        <VoiceSelectorInput placeholder="Search voices..." />
        <VoiceSelectorList>
          <VoiceSelectorEmpty>No voices found.</VoiceSelectorEmpty>
          <VoiceSelectorGroup>
            <VoiceSelectorItem
              v-for="voice in voices"
              :key="voice.id"
              :value="voice.id"
              @select="handleSelect(voice.id)"
            >
              <VoiceSelectorPreview
                :loading="loadingVoice === voice.id"
                :playing="playingVoice === voice.id"
                @play="handlePreview(voice.id)"
              />
              <VoiceSelectorName>{{ voice.name }}</VoiceSelectorName>
              <VoiceSelectorDescription>
                {{ voice.description }}
              </VoiceSelectorDescription>
              <VoiceSelectorAttributes>
                <VoiceSelectorAccent :value="voice.accent" />
                <VoiceSelectorBullet />
                <VoiceSelectorAge>{{ voice.age }}</VoiceSelectorAge>
                <VoiceSelectorBullet />
                <VoiceSelectorGender :value="voice.gender" />
              </VoiceSelectorAttributes>
            </VoiceSelectorItem>
          </VoiceSelectorGroup>
        </VoiceSelectorList>
      </VoiceSelectorContent>
    </VoiceSelector>
  </div>
</template>
