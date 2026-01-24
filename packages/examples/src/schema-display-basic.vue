<script setup lang="ts">
import { SchemaDisplay } from '@repo/elements/schema-display'
</script>

<template>
  <SchemaDisplay description="List all users" method="GET" path="/api/users" />
</template>
