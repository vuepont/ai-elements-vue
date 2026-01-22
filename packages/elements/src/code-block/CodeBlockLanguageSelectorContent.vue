<script setup lang="ts">
import { SelectContent } from '@repo/shadcn-vue/components/ui/select'

type CodeBlockLanguageSelectorContentProps = InstanceType<typeof SelectContent>['$props']

interface Props extends /* @vue-ignore */ CodeBlockLanguageSelectorContentProps {}

withDefaults(defineProps<Props>(), {
  align: 'end',
})
</script>

<template>
  <SelectContent :align="align" v-bind="$attrs">
    <slot />
  </SelectContent>
</template>
