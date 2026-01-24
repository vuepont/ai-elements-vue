<script setup lang="ts">
import {
  TestResults,
  TestResultsDuration,
  TestResultsHeader,
  TestResultsSummary,
} from '@repo/elements/test-results'
</script>

<template>
  <TestResults
    :summary="{
      passed: 10,
      failed: 2,
      skipped: 1,
      total: 13,
      duration: 3500,
    }"
  >
    <TestResultsHeader>
      <TestResultsSummary />
      <TestResultsDuration />
    </TestResultsHeader>
  </TestResults>
</template>
