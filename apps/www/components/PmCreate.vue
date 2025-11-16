<script setup lang="ts">
import { useMyPm } from '@/composables/useMyPm'

const {
  inStack = false,
  packageSpec,
  name = '.',
  sync = '_pm',
  noSync,
  optionsString = '',
} = defineProps<{
  inStack?: boolean
  packageSpec: string
  name?: string
  sync?: string
  noSync?: boolean
  optionsString?: string
}>()

const { packageManagers } = useMyPm()

const md = computed(() => `
  ::code-group{${inStack ? 'in-stack' : ''} ${noSync ? '' : `sync="${sync}"`}}
  ${
    packageManagers.value.map((pm) => {
      const code = `${pm.command}${pm.create}${packageSpec} ${name}${pm.name === 'npm' ? '-- ' : ' '}${optionsString}`
      return `\`\`\`bash [${pm.name}]\n${code}\n\`\`\`\n`
    }).join('\n')
  }
  ::
  `)
</script>

<template>
  <MDC :value="md" class="[&:not(:first-child)]:mt-5" />
</template>
