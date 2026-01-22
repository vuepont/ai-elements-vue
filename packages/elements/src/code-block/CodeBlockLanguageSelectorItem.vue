<script setup lang="ts">
import { SelectItem } from '@repo/shadcn-vue/components/ui/select'

type CodeBlockLanguageSelectorItemProps = InstanceType<typeof SelectItem>['$props']

interface Props extends /* @vue-ignore */ CodeBlockLanguageSelectorItemProps {}

const props = defineProps<Props>()
</script>

<template>
  <SelectItem v-bind="{ ...props, ...$attrs }">
    <slot />
  </SelectItem>
</template>
