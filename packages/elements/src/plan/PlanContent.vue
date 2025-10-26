<script setup lang="ts">
import { CardContent } from '@repo/shadcn-vue/components/ui/card'
import { CollapsibleContent } from '@repo/shadcn-vue/components/ui/collapsible'
</script>

<template>
  <CollapsibleContent as-child>
    <CardContent data-slot="plan-content">
      <slot />
    </CardContent>
  </CollapsibleContent>
</template>
