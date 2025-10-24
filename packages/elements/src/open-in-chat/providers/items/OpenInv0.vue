<script setup lang="ts">
import { computed } from 'vue'
import { providers } from '..'
import { useOpenInContext } from '../../context'
import OpenInItemLink from '../../OpenInItemLink.vue'

const { query } = useOpenInContext()
const href = computed(() => providers.v0.createUrl(query))
</script>

<template>
  <OpenInItemLink
    :href="href"
    :icon="providers.v0.icon"
    :title="providers.v0.title"
    v-bind="$attrs"
  />
</template>
