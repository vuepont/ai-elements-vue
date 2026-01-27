<script setup lang="ts">
import type { ToolUIPart } from 'ai'
import { CodeBlock, CodeBlockCopyButton } from '@repo/elements/code-block'
import {
  Sandbox,
  SandboxContent,
  SandboxHeader,
  SandboxTabContent,
  SandboxTabs,
  SandboxTabsBar,
  SandboxTabsList,
  SandboxTabsTrigger,
} from '@repo/elements/sandbox'
import {
  StackTrace,
  StackTraceActions,
  StackTraceContent,
  StackTraceCopyButton,
  StackTraceError,
  StackTraceErrorMessage,
  StackTraceErrorType,
  StackTraceExpandButton,
  StackTraceFrames,
  StackTraceHeader,
} from '@repo/elements/stack-trace'
import { Button } from '@repo/shadcn-vue/components/ui/button'
import { ref } from 'vue'

const code = `import math

def calculate_primes(limit):
    """Find all prime numbers up to a given limit using Sieve of Eratosthenes."""
    sieve = [True] * (limit + 1)
    sieve[0] = sieve[1] = False
    
    for i in range(2, int(math.sqrt(limit)) + 1):
        if sieve[i]:
            for j in range(i * i, limit + 1, i):
                sieve[j] = False
    
    return [i for i, is_prime in enumerate(sieve) if is_prime]

if __name__ == "__main__":
    primes = calculate_primes(50)
    print(f"Found {len(primes)} prime numbers up to 50:")
    print(primes)`

const outputs: Record<ToolUIPart['state'], string | undefined> = {
  'input-streaming': undefined,
  'input-available': undefined,
  'output-available': `Found 15 prime numbers up to 50:
[2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]`,
  'output-error': `TypeError: Cannot read properties of undefined (reading 'map')
    at calculatePrimes (/src/utils/primes.ts:15:23)
    at runCalculation (/src/components/Calculator.tsx:42:12)
    at onClick (/src/components/Button.tsx:18:5)
    at HTMLButtonElement.dispatch (node_modules/react-dom/cjs/react-dom.development.js:3456:9)
    at node_modules/react-dom/cjs/react-dom.development.js:4245:12`,
}

const states: ToolUIPart['state'][] = [
  'input-streaming',
  'input-available',
  'output-available',
  'output-error',
]

const state = ref<ToolUIPart['state']>('output-available')
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-wrap gap-2">
      <Button
        v-for="s in states"
        :key="s"
        size="sm"
        :variant="state === s ? 'default' : 'outline'"
        @click="state = s"
      >
        {{ s }}
      </Button>
    </div>

    <Sandbox>
      <SandboxHeader :state="state" title="primes.py" />
      <SandboxContent>
        <SandboxTabs default-value="code">
          <SandboxTabsBar>
            <SandboxTabsList>
              <SandboxTabsTrigger value="code">
                Code
              </SandboxTabsTrigger>
              <SandboxTabsTrigger value="output">
                Output
              </SandboxTabsTrigger>
            </SandboxTabsList>
          </SandboxTabsBar>
          <SandboxTabContent value="code">
            <CodeBlock
              class="border-0"
              :code="state === 'input-streaming' ? '# Generating code...' : code"
              language="python"
            >
              <CodeBlockCopyButton
                class="absolute top-2 right-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                size="sm"
              />
            </CodeBlock>
          </SandboxTabContent>
          <SandboxTabContent value="output">
            <StackTrace
              v-if="state === 'output-error'"
              class="rounded-none border-0"
              :default-open="true"
              :trace="outputs[state] ?? ''"
            >
              <StackTraceHeader>
                <StackTraceError>
                  <StackTraceErrorType />
                  <StackTraceErrorMessage />
                </StackTraceError>
                <StackTraceActions>
                  <StackTraceCopyButton />
                  <StackTraceExpandButton />
                </StackTraceActions>
              </StackTraceHeader>
              <StackTraceContent>
                <StackTraceFrames />
              </StackTraceContent>
            </StackTrace>
            <CodeBlock
              v-else
              class="border-0"
              :code="outputs[state] ?? ''"
              language="log"
            >
              <CodeBlockCopyButton
                class="absolute top-2 right-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                size="sm"
              />
            </CodeBlock>
          </SandboxTabContent>
        </SandboxTabs>
      </SandboxContent>
    </Sandbox>
  </div>
</template>
