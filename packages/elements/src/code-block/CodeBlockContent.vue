<script setup lang="ts">
import type { BundledLanguage, ThemedToken } from 'shiki'
import type { TokenizedCode } from './utils'
import { cn } from '@repo/shadcn-vue/lib/utils'
import { computed, ref, watch } from 'vue'
import { createRawTokens, highlightCode, isBold, isItalic, isUnderline } from './utils'

const props = withDefaults(
  defineProps<{
    code: string
    language: BundledLanguage
    showLineNumbers?: boolean
  }>(),
  {
    showLineNumbers: false,
  },
)

const rawTokens = computed(() => createRawTokens(props.code))
const tokenized = ref<TokenizedCode>(highlightCode(props.code, props.language) ?? rawTokens.value)

watch(
  () => [props.code, props.language],
  () => {
    // Reset to raw tokens or cached result
    tokenized.value = highlightCode(props.code, props.language) ?? rawTokens.value
    // Trigger async highlight
    highlightCode(props.code, props.language, (result) => {
      tokenized.value = result
    })
  },
  { immediate: true },
)

const preStyle = computed(() => ({
  backgroundColor: tokenized.value.bg,
  color: tokenized.value.fg,
}))

interface KeyedToken {
  token: ThemedToken
  key: string
}
interface KeyedLine {
  tokens: KeyedToken[]
  key: string
}

const keyedLines = computed<KeyedLine[]>(() =>
  tokenized.value.tokens.map((line, lineIdx) => ({
    key: `line-${lineIdx}`,
    tokens: line.map((token, tokenIdx) => ({
      token,
      key: `line-${lineIdx}-${tokenIdx}`,
    })),
  })),
)

const lineNumberClasses = cn(
  'block',
  'before:content-[counter(line)]',
  'before:inline-block',
  'before:[counter-increment:line]',
  'before:w-8',
  'before:mr-4',
  'before:text-right',
  'before:text-muted-foreground/50',
  'before:font-mono',
  'before:select-none',
)
</script>

<template>
  <div class="relative overflow-auto">
    <pre
      :class="cn('dark:!bg-[var(--shiki-dark-bg)] dark:!text-[var(--shiki-dark)] m-0 p-4 text-sm')"
      :style="preStyle"
    >
      <code
        :class="cn(
          'font-mono text-sm',
          showLineNumbers && '[counter-increment:line_0] [counter-reset:line]',
        )"
      >
        <template v-for="line in keyedLines" :key="line.key">
          <span :class="showLineNumbers ? lineNumberClasses : 'block'">
            <template v-if="line.tokens.length === 0">
              {{ '\n' }}
            </template>
            <template v-else>
              <span
                v-for="tokenObj in line.tokens"
                :key="tokenObj.key"
                class="dark:!bg-[var(--shiki-dark-bg)] dark:!text-[var(--shiki-dark)]"
                :style="{
                  color: tokenObj.token.color,
                  backgroundColor: tokenObj.token.bgColor,
                  ...tokenObj.token.htmlStyle,
                  fontStyle: isItalic(tokenObj.token.fontStyle) ? 'italic' : undefined,
                  fontWeight: isBold(tokenObj.token.fontStyle) ? 'bold' : undefined,
                  textDecoration: isUnderline(tokenObj.token.fontStyle) ? 'underline' : undefined,
                }"
              >{{ tokenObj.token.content }}</span>
            </template>
          </span>
        </template>
      </code>
    </pre>
  </div>
</template>
