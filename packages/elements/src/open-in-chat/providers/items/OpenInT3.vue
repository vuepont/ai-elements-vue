<script setup lang="ts">
import { computed } from 'vue'
import { providers } from '..'
import { useOpenInContext } from '../../context'
import OpenInItemLink from '../../OpenInItemLink.vue'

const { query } = useOpenInContext()
const href = computed(() => providers.t3.createUrl(query))
</script>

<template>
  <OpenInItemLink
    :href="href"
    :icon="providers.t3.icon"
    :title="providers.t3.title"
    v-bind="$attrs"
  />
</template>
