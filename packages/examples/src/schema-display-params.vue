<script setup lang="ts">
import { SchemaDisplay } from '@repo/elements/schema-display'
</script>

<template>
  <SchemaDisplay
    method="GET"
    :parameters="[
      { name: 'userId', type: 'string', required: true, location: 'path' },
      { name: 'include', type: 'string', location: 'query' },
    ]"
    path="/api/users/{userId}"
  />
</template>
