<script setup lang="ts">
import type { Component } from 'vue'
import { DropdownMenuItem } from '@repo/shadcn-vue/components/ui/dropdown-menu'
import { ExternalLinkIcon } from 'lucide-vue-next'

interface Props {
  href: string
  title: string
  icon: Component
}

defineProps<Props>()
</script>

<template>
  <DropdownMenuItem v-bind="$attrs" as-child>
    <a
      :href="href"
      class="flex items-center gap-2"
      rel="noopener"
      target="_blank"
    >
      <span class="shrink-0">
        <component :is="icon" />
      </span>
      <span class="flex-1">{{ title }}</span>
      <ExternalLinkIcon class="size-4 shrink-0" />
    </a>
  </DropdownMenuItem>
</template>
