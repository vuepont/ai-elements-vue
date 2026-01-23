<script setup lang="ts">
import {
  EnvironmentVariable,
  EnvironmentVariableCopyButton,
  EnvironmentVariableGroup,
  EnvironmentVariableName,
  EnvironmentVariableRequired,
  EnvironmentVariables,
  EnvironmentVariablesContent,
  EnvironmentVariablesHeader,
  EnvironmentVariablesTitle,
  EnvironmentVariablesToggle,
  EnvironmentVariableValue,
} from '@repo/elements/environment-variables'

const variables = [
  {
    name: 'DATABASE_URL',
    value: 'postgresql://localhost:5432/mydb',
    required: true,
  },
  { name: 'API_KEY', value: 'sk-1234567890abcdef', required: true },
  { name: 'NODE_ENV', value: 'production', required: false },
  { name: 'PORT', value: '3000', required: false },
]

function handleCopy() {
  // eslint-disable-next-line no-console
  console.log('Copied!')
}
</script>

<template>
  <EnvironmentVariables :default-show-values="false">
    <EnvironmentVariablesHeader>
      <EnvironmentVariablesTitle />
      <EnvironmentVariablesToggle />
    </EnvironmentVariablesHeader>
    <EnvironmentVariablesContent>
      <EnvironmentVariable
        v-for="variable in variables"
        :key="variable.name"
        :name="variable.name"
        :value="variable.value"
      >
        <EnvironmentVariableGroup>
          <EnvironmentVariableName />
          <EnvironmentVariableRequired v-if="variable.required" />
        </EnvironmentVariableGroup>
        <EnvironmentVariableGroup>
          <EnvironmentVariableValue />
          <EnvironmentVariableCopyButton
            copy-format="export"
            @copy="handleCopy"
          />
        </EnvironmentVariableGroup>
      </EnvironmentVariable>
    </EnvironmentVariablesContent>
  </EnvironmentVariables>
</template>
