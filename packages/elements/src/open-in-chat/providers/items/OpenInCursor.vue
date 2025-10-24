<script setup lang="ts">
import { computed } from 'vue'
import { providers } from '..'
import { useOpenInContext } from '../../context'
import OpenInItemLink from '../../OpenInItemLink.vue'

const { query } = useOpenInContext()
const href = computed(() => providers.cursor.createUrl(query))
</script>

<template>
  <OpenInItemLink
    :href="href"
    :icon="providers.cursor.icon"
    :title="providers.cursor.title"
    v-bind="$attrs"
  />
</template>
