<script setup lang="ts">
import { computed } from 'vue'
import { providers } from '..'
import { useOpenInContext } from '../../context'
import OpenInItemLink from '../../OpenInItemLink.vue'

const { query } = useOpenInContext()
const href = computed(() => providers.scira.createUrl(query))
</script>

<template>
  <OpenInItemLink
    :href="href"
    :icon="providers.scira.icon"
    :title="providers.scira.title"
    v-bind="$attrs"
  />
</template>
