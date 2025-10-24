import type { Component } from 'vue'
import { MessageCircleIcon } from 'lucide-vue-next'
import {
  ChatGPTIcon,
  ClaudeIcon,
  CursorIcon,
  GithubIcon,
  SciraIcon,
  V0Icon,
} from './icons'

// --- Providers Object ---
export const providers = {
  github: {
    title: 'Open in GitHub',
    createUrl: (url: string) => url,
    icon: GithubIcon as Component,
  },
  scira: {
    title: 'Open in Scira',
    createUrl: (q: string) =>
      `https://scira.ai/?${new URLSearchParams({
        q,
      })}`,
    icon: SciraIcon as Component,
  },
  chatgpt: {
    title: 'Open in ChatGPT',
    createUrl: (prompt: string) =>
      `https://chatgpt.com/?${new URLSearchParams({
        hints: 'search',
        prompt,
      })}`,
    icon: ChatGPTIcon as Component,
  },
  claude: {
    title: 'Open in Claude',
    createUrl: (q: string) =>
      `https://claude.ai/new?${new URLSearchParams({
        q,
      })}`,
    icon: ClaudeIcon as Component,
  },
  t3: {
    title: 'Open in T3 Chat',
    createUrl: (q: string) =>
      `https://t3.chat/new?${new URLSearchParams({
        q,
      })}`,
    icon: MessageCircleIcon as Component,
  },
  v0: {
    title: 'Open in v0',
    createUrl: (q: string) =>
      `https://v0.app?${new URLSearchParams({
        q,
      })}`,
    icon: V0Icon as Component,
  },
  cursor: {
    title: 'Open in Cursor',
    createUrl: (text: string) => {
      const url = new URL('https://cursor.com/link/prompt')
      url.searchParams.set('text', text)
      return url.toString()
    },
    icon: CursorIcon as Component,
  },
}
