---
title: Response
description:
icon: lucide:message-square-text
---

The `Response` component renders a Markdown response from a large language model. It uses [streamdown-vue](https://github.com/Saluana/streamdown-vue) under the hood to render the markdown.

:::ComponentLoader{label="Response" componentName="Response"}
:::

## Install using CLI

::tabs{variant="card"}
  ::div{label="ai-elements-vue"}
  ```sh
  npx ai-elements-vue@latest add response
  ```
  ::
  ::div{label="shadcn-vue"}

  ```sh
  npx shadcn-vue@latest add https://registry.ai-elements-vue.com/response.json
  ```
  ::
::

## Install Manually

Copy and paste the following code in the same folder.

:::code-group
  ```vue [Response.vue]
  <script setup lang="ts">
  import { StreamMarkdown } from 'streamdown-vue'
  import { computed, useAttrs, useSlots } from 'vue'
  import 'katex/dist/katex.min.css'

  interface Props {
    content?: string
  }

  const props = defineProps<Props>()
  const attrs = useAttrs()
  const slots = useSlots()

  const classes = computed(() => [
    'size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0',
    (attrs as any).class || '',
  ].filter(Boolean).join(' '))

  const slotContent = computed<string | undefined>(() => {
    const nodes = slots.default?.() || []
    let text = ''
    for (const node of nodes) {
      if (typeof node.children === 'string')
        text += node.children
    }
    return text || undefined
  })

  const md = computed(() => (slotContent.value ?? props.content ?? '') as string)
  </script>

  <template>
    <StreamMarkdown :class="classes" :content="md" v-bind="attrs" />
  </template>
  ```

  ```ts [index.ts]
  export { default as Response } from './Response.vue'
  ```
:::

After adding the component, you'll need to add the following to your `tailwind.css` file:

```css
@source "../node_modules/streamdown-vue/dist/*.js";
```

This will ensure that the Streamdown styles are applied to your project. See [Streamdown's documentation](https://streamdown.ai/) for more details.

## Usage

```ts
import { Response } from '@/components/ai-elements/response'
```

```vue
<Response>
**Hi there.** I am an AI model designed to help you.
</Response>
```

## Usage with AI SDK

Populate a markdown response with messages from [`useChat`](https://ai-sdk.dev/docs/reference/ai-sdk-ui/use-chat).

Add the following component to your frontend:

```vue [pages/index.vue]
<script setup lang="ts">
import { useChat } from '@ai-sdk/vue'
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation'
import { Message, MessageContent } from '@/components/ai-elements/message'
import { Response } from '@/components/ai-elements/response'

const { messages } = useChat()
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 relative size-full rounded-lg border h-[600px]">
    <div class="flex flex-col h-full">
      <Conversation>
        <ConversationContent>
          <Message v-for="m in messages" :key="m.id" :from="m.role">
            <MessageContent>
              <Response v-for="(p, i) in m.parts" :key="i">
                {{ p.type === 'text' ? p.text : '' }}
              </Response>
            </MessageContent>
          </Message>
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
    </div>
  </div>
</template>
```

## Features

- Renders markdown content with support for paragraphs, links, and code blocks
- Supports GFM features like tables, task lists, and strikethrough text via remark-gfm
- Supports rendering Math Equations via rehype-katex
- **Smart streaming support** - automatically completes incomplete formatting during real-time text streaming
- Code blocks are rendered with syntax highlighting for various programming languages
- Code blocks include a button to easily copy code to clipboard
- Adapts to different screen sizes while maintaining readability
- Seamlessly integrates with both light and dark themes
- Customizable appearance through class props and Tailwind CSS utilities
- Built with accessibility in mind for all users

## Props

### `<Response />`

:::field-group
  ::field{name="content" type="string" defaultValue="''"}
  The full (or partially streamed) markdown source.
  ::

  ::field{name="class / className" type="string" defaultValue="''"}
  Optional wrapper classes; both accepted.
  ::

  ::field{name="components" type="Record<string, Component>" defaultValue="{}"}
  Map to override built-ins (e.g. { p: MyP }).
  ::

  ::field{name="remarkPlugins" type="any[]" defaultValue="[]"}
  Extra remark plugins.
  ::

  ::field{name="rehypePlugins" type="any[]" defaultValue="[]"}
  Extra rehype plugins.
  ::

  ::field{name="defaultOrigin" type="string?"}
  Base URL to resolve relative links/images before allow-list checks.
  ::

  ::field{name="allowedImagePrefixes" type="string[]" defaultValue="['https://','http://']"}
  Allowed (lowercased) URL prefixes for `<img>`. Blocked => image dropped.
  ::

  ::field{name="allowedLinkPrefixes" type="string[]" defaultValue="['https://','http://']"}
  Allowed prefixes for `<a href>`. Blocked => link text only.
  ::

  ::field{name="parseIncompleteMarkdown" type="boolean" defaultValue="true"}
  Reserved toggle for internal repair; typically you repair outside using utilities.
  ::

  ::field{name="shikiTheme" type="string" defaultValue="'github-light'"}
  Shiki theme used for syntax highlighting.
  ::
:::
