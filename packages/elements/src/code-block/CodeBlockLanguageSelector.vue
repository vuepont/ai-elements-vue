<script setup lang="ts">
import { Select } from '@repo/shadcn-vue/components/ui/select'

type CodeBlockLanguageSelectorProps = InstanceType<typeof Select>['$props']

interface Props extends /* @vue-ignore */ CodeBlockLanguageSelectorProps {}

const props = defineProps<Props>()
</script>

<template>
  <Select v-bind="{ ...props, ...$attrs }">
    <slot />
  </Select>
</template>
