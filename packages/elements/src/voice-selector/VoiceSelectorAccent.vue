<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed } from 'vue'

interface Props {
  class?: HTMLAttributes['class']
  value?: string
}

const props = defineProps<Props>()

const emoji = computed(() => {
  switch (props.value) {
    case 'american':
      return '🇺🇸'
    case 'british':
      return '🇬🇧'
    case 'australian':
      return '🇦🇺'
    case 'canadian':
      return '🇨🇦'
    case 'irish':
      return '🇮🇪'
    case 'scottish':
      return '🏴󠁧󠁢󠁳󠁣󠁴󠁿'
    case 'indian':
      return '🇮🇳'
    case 'south-african':
      return '🇿🇦'
    case 'new-zealand':
      return '🇳🇿'
    case 'spanish':
      return '🇪🇸'
    case 'french':
      return '🇫🇷'
    case 'german':
      return '🇩🇪'
    case 'italian':
      return '🇮🇹'
    case 'portuguese':
      return '🇵🇹'
    case 'brazilian':
      return '🇧🇷'
    case 'mexican':
      return '🇲🇽'
    case 'argentinian':
      return '🇦🇷'
    case 'japanese':
      return '🇯🇵'
    case 'chinese':
      return '🇨🇳'
    case 'korean':
      return '🇰🇷'
    case 'russian':
      return '🇷🇺'
    case 'arabic':
      return '🇸🇦'
    case 'dutch':
      return '🇳🇱'
    case 'swedish':
      return '🇸🇪'
    case 'norwegian':
      return '🇳🇴'
    case 'danish':
      return '🇩🇰'
    case 'finnish':
      return '🇫🇮'
    case 'polish':
      return '🇵🇱'
    case 'turkish':
      return '🇹🇷'
    case 'greek':
      return '🇬🇷'
    default:
      return null
  }
})
</script>

<template>
  <span
    :class="cn('text-muted-foreground text-xs', props.class)"
    v-bind="$attrs"
  >
    <slot>
      {{ emoji }}
    </slot>
  </span>
</template>
