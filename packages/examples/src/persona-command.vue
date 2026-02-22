<script setup lang="ts">
import type { PersonaState } from '@repo/elements/persona'
import { Persona } from '@repo/elements/persona'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { ButtonGroup } from '@repo/shadcn-vue/components/ui/button-group'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@repo/shadcn-vue/components/ui/tooltip'
import {
  BrainIcon,
  CircleIcon,
  EyeClosedIcon,
  MegaphoneIcon,
  MicIcon,
} from 'lucide-vue-next'
import { ref } from 'vue'

const states = [
  {
    icon: CircleIcon,
    label: 'Idle',
    state: 'idle' as PersonaState,
  },
  {
    icon: MicIcon,
    label: 'Listening',
    state: 'listening' as PersonaState,
  },
  {
    icon: BrainIcon,
    label: 'Thinking',
    state: 'thinking' as PersonaState,
  },
  {
    icon: MegaphoneIcon,
    label: 'Speaking',
    state: 'speaking' as PersonaState,
  },
  {
    icon: EyeClosedIcon,
    label: 'Asleep',
    state: 'asleep' as PersonaState,
  },
]

const currentState = ref<PersonaState>('idle')

function handleStateChange(state: PersonaState) {
  currentState.value = state
}
</script>

<template>
  <div class="flex size-full flex-col items-center justify-center gap-4">
    <!-- Using the new Persona component directly -->
    <Persona
      class="size-32"
      :state="currentState"
      variant="command"
    />

    <TooltipProvider>
      <ButtonGroup orientation="horizontal">
        <Tooltip v-for="state in states" :key="state.state">
          <TooltipTrigger as-child>
            <Button
              size="icon-sm"
              :variant="currentState === state.state ? 'default' : 'outline'"
              @click="handleStateChange(state.state)"
            >
              <component :is="state.icon" class="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>{{ state.label }}</TooltipContent>
        </Tooltip>
      </ButtonGroup>
    </TooltipProvider>
  </div>
</template>
