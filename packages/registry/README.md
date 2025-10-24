# AI Elements Vue

A command-line interface for installing [AI Elements Vue](https://ai-elements-vue.com) components - a component library built on top of [shadcn-vue](https://www.shadcn-vue.com/) to help you build AI-native applications faster.

## Overview

AI Elements Vue provides pre-built, customizable Vue components specifically designed for AI applications, including conversations, messages, code blocks, reasoning displays, and more. The CLI makes it easy to add these components to your Vue.js or Nuxt.js project.

## Installation

You can use the AI Elements Vue CLI directly with npx, or install it globally:

```bash
# Use directly (recommended)
npx ai-elements-vue@latest

# Or using shadcn-vue cli
npx shadcn-vue@latest add https://registry.ai-elements-vue.com/all.json
```

## Prerequisites

Before using AI Elements Vue, ensure your project meets these requirements:

- **Node.js** 18 or later
- **Vue.js, Nuxt.js** project with [AI SDK](https://ai-sdk.dev/) installed
- **shadcn-vue** initialized in your project (`npx shadcn-vue@latest init`)
- **Tailwind CSS** configured (AI Elements Vue supports CSS Variables mode only)

## Usage

### Install All Components

Install all available AI Elements Vue components at once:

```bash
npx ai-elements-vue@latest
```

This command will:
- Set up shadcn-vue if not already configured
- Install all AI Elements Vue components to your configured components directory
- Add necessary dependencies to your project

### Install Specific Components

Install individual components using the `add` command:

```bash
npx ai-elements-vue@latest add <component-name>
```

Examples:
```bash
# Install the message component
npx ai-elements-vue@latest add message

# Install the conversation component
npx ai-elements-vue@latest add conversation

# Install the code-block component
npx ai-elements-vue@latest add code-block
```

### Alternative: Use with shadcn-vue CLI

You can also install components using the standard shadcn-vue CLI:

```bash
# Install all components
npx shadcn-vue@latest add https://registry.ai-elements-vue.com/all.json

# Install a specific component
npx shadcn-vue@latest add https://registry.ai-elements-vue.com/message.json
```

## Available Components

AI Elements Vue includes the following components:

| Component | Status | Description |
|-----------|--------|-------------|
| `message` | ✅ | Individual chat messages with avatars |
| `conversation` | ✅ | Container for chat conversations |
| `response` | ✅ | Formatted AI response display |
| `prompt-input` | ✅ | Advanced input component with model selection |
| `actions` | ✅ | Interactive action buttons for AI responses |
| `branch` | ✅ | Branch visualization for conversation flows |
| `code-block` | ✅ | Syntax-highlighted code display with copy functionality |
| `image` | ✅ | AI-generated image display component |
| `inline-citation` | ❌ | Inline source citations |
| `loader` | ✅ | Loading states for AI operations |
| `reasoning` | ❌ | Display AI reasoning and thought processes |
| `source` | ❌ | Source attribution component |
| `suggestion` | ✅ | Quick action suggestions |
| `task` | ❌ | Task completion tracking |
| `tool` | ❌ | Tool usage visualization |

## How It Works

The AI Elements Vue CLI:

1. **Detects your package manager** (npm, pnpm, yarn, or bun) automatically
2. **Fetches component registry** from `https://registry.ai-elements-vue.com/all.json`
3. **Installs components** using the shadcn-vue CLI under the hood
4. **Adds dependencies** and integrates with your existing shadcn-vue setup

Components are installed to your configured shadcn-vue components directory (typically `@/components/ai-elements/`) and become part of your codebase, allowing for full customization.

## Configuration

AI Elements Vue uses your existing shadcn-vue configuration. Components will be installed to the directory specified in your `components.json` file.

## Recommended Setup

For the best experience, we recommend:

1. **AI Gateway**: Set up [Vercel AI Gateway](https://vercel.com/docs/ai-gateway) and add `AI_GATEWAY_API_KEY` to your `.env.local`
2. **CSS Variables**: Use shadcn-vue's CSS Variables mode for theming
3. **TypeScript**: Enable TypeScript for better development experience

---

Made with ❤️ by [cwandev](https://github.com/cwandev)
