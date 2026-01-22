<script setup lang="ts">
import type { BundledLanguage } from 'shiki'
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockHeader,
  CodeBlockLanguageSelector,
  CodeBlockLanguageSelectorContent,
  CodeBlockLanguageSelectorItem,
  CodeBlockLanguageSelectorTrigger,
  CodeBlockLanguageSelectorValue,
  CodeBlockTitle,
} from '@repo/elements/code-block'
import { FileIcon } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const codeExamples = {
  typescript: {
    filename: 'greet.ts',
    code: `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));`,
  },
  python: {
    filename: 'greet.py',
    code: `def greet(name: str) -> str:
    return f"Hello, {name}!"

print(greet("World"))`,
  },
  rust: {
    filename: 'greet.rs',
    code: `fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    println!("{}", greet("World"));
}`,
  },
  go: {
    filename: 'greet.go',
    code: `package main

import "fmt"

func greet(name string) string {
    return fmt.Sprintf("Hello, %s!", name)
}

func main() {
    fmt.Println(greet("World"))
}`,
  },
} as const

type Language = keyof typeof codeExamples

const languages: { value: Language, label: string }[] = [
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'rust', label: 'Rust' },
  { value: 'go', label: 'Go' },
]

const language = ref<Language>('typescript')
const currentExample = computed(() => codeExamples[language.value])

function handleCopy() {
  // eslint-disable-next-line no-console
  console.log('Copied code to clipboard')
}

function handleError() {
  console.error('Failed to copy code to clipboard')
}
</script>

<template>
  <CodeBlock :code="currentExample.code" :language="language as BundledLanguage">
    <CodeBlockHeader>
      <CodeBlockTitle>
        <FileIcon :size="14" />
        <CodeBlockFilename>{{ currentExample.filename }}</CodeBlockFilename>
      </CodeBlockTitle>
      <CodeBlockActions>
        <CodeBlockLanguageSelector v-model="language">
          <CodeBlockLanguageSelectorTrigger>
            <CodeBlockLanguageSelectorValue />
          </CodeBlockLanguageSelectorTrigger>
          <CodeBlockLanguageSelectorContent>
            <CodeBlockLanguageSelectorItem
              v-for="lang in languages"
              :key="lang.value"
              :value="lang.value"
            >
              {{ lang.label }}
            </CodeBlockLanguageSelectorItem>
          </CodeBlockLanguageSelectorContent>
        </CodeBlockLanguageSelector>
        <CodeBlockCopyButton
          @copy="handleCopy"
          @error="handleError"
        />
      </CodeBlockActions>
    </CodeBlockHeader>
  </CodeBlock>
</template>
