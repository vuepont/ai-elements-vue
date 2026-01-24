<script setup lang="ts">
import { SchemaDisplay } from '@repo/elements/schema-display'
</script>

<template>
  <SchemaDisplay
    method="POST"
    path="/api/posts"
    :request-body="[
      {
        name: 'author',
        type: 'object',
        properties: [
          { name: 'id', type: 'string' },
          { name: 'name', type: 'string' },
        ],
      },
      { name: 'title', type: 'string', required: true },
    ]"
  />
</template>
