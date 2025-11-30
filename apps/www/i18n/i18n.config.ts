import { defineI18nConfig } from '@nuxtjs/i18n'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en',
  messages: {
    en: {
      // Site information
      siteName: 'AI Elements Vue',
      siteDescription: 'AI Elements Vue is a component library built on top of shadcn-vue to help you build AI-native applications faster.',

      // Navigation
      navDocs: 'Docs',
      navGettingStarted: 'Getting Started',
      navGettingStartedDesc: 'What is AI Elements Vue and why you should use it',
      navExamples: 'Examples',
      navExamplesDesc: 'Real-world examples showing how to build applications with AI Elements Vue',
      navComponents: 'Components',
      navComponentsDesc: 'Explore the components and usage examples of AI Elements Vue',
      navCredits: 'Credits',
      navCommunity: 'Community',

      // TOC
      tocTitle: 'On this page',
      tocStarGitHub: 'Star on GitHub',
      tocCreateIssues: 'Create Issues',

      // Edit link
      editPage: 'Edit this page',

      // Footer
      footerCopyright: 'Copyright © 2025',
    },
    zh: {
      // Site information
      siteName: 'AI Elements Vue',
      siteDescription: 'AI Elements Vue 是基于 shadcn-vue 构建的组件库，帮助您更快地构建 AI 原生应用。',

      // Navigation
      navDocs: '文档',
      navGettingStarted: '快速开始',
      navGettingStartedDesc: '了解 AI Elements Vue 是什么以及为什么应该使用它',
      navExamples: '示例',
      navExamplesDesc: '展示如何使用 AI Elements Vue 构建应用程序的真实示例',
      navComponents: '组件',
      navComponentsDesc: '探索 AI Elements Vue 的组件和使用示例',
      navCredits: '致谢',
      navCommunity: '社区',

      // TOC
      tocTitle: '本页内容',
      tocStarGitHub: '在 GitHub 上点赞',
      tocCreateIssues: '创建问题',

      // Edit link
      editPage: '编辑此页',

      // Footer
      footerCopyright: '版权所有 © 2025',
    },
  },
}))
