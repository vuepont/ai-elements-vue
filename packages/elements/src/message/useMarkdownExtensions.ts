import type { Extensions, MarkdownProviderContext } from 'vue-stream-markdown'
import { code } from '@stream-markdown/code'
import { math } from '@stream-markdown/math'
import { mermaid } from '@stream-markdown/mermaid'
import { useMarkdownProvider } from 'vue-stream-markdown'

export function useMarkdownExtensions(): {
  provider: MarkdownProviderContext | undefined
  extensions: Extensions | undefined
} {
  const provider = useMarkdownProvider()
  const extensions = provider
    ? undefined
    : {
        code: code(),
        math: math(),
        mermaid: mermaid({ config: { securityLevel: 'strict' } }),
      }

  return { provider, extensions }
}
