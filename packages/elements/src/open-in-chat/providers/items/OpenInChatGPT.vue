<script setup lang="ts">
import { computed } from 'vue'
import { providers } from '..'
import { useOpenInContext } from '../../context'
import OpenInItemLink from '../../OpenInItemLink.vue'

const { query } = useOpenInContext()
const href = computed(() => providers.chatgpt.createUrl(query))
</script>

<template>
  <OpenInItemLink
    :href="href"
    :icon="providers.chatgpt.icon"
    :title="providers.chatgpt.title"
    v-bind="$attrs"
  />
</template>
