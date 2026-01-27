<script setup lang="ts">
import { InputGroupInput } from '@repo/shadcn-vue/components/ui/input-group'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { useSnippetContext } from './context'

type InputGroupInputProps = InstanceType<typeof InputGroupInput>['$props']

interface Props extends /* @vue-ignore */ Omit<InputGroupInputProps, 'readonly' | 'modelValue' | 'value'> {}

const props = defineProps<Props>()

const { code } = useSnippetContext('SnippetInput')
</script>

<template>
  <InputGroupInput
    :class="cn('text-foreground', props.class)"
    readonly
    :model-value="code"
    v-bind="$attrs"
  />
</template>
