<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Switch } from '@repo/shadcn-vue/components/ui/switch'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { EyeIcon, EyeOffIcon } from 'lucide-vue-next'
import { useEnvironmentVariablesContext } from './context'

type SwitchProps = InstanceType<typeof Switch>['$props']

interface Props extends /* @vue-ignore */ SwitchProps {
  class?: HTMLAttributes['class']
}

const props = defineProps<Props>()

const { showValues, setShowValues } = useEnvironmentVariablesContext()
</script>

<template>
  <div :class="cn('flex items-center gap-2', props.class)">
    <span class="text-muted-foreground text-xs">
      <EyeIcon v-if="showValues" :size="14" />
      <EyeOffIcon v-else :size="14" />
    </span>
    <Switch
      aria-label="Toggle value visibility"
      :model-value="showValues"
      v-bind="$attrs"
      @update:model-value="setShowValues"
    />
  </div>
</template>
