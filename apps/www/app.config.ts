export default defineAppConfig({
  shadcnDocs: {
    site: {
      name: 'AI Elements Vue',
      description: 'AI Elements Vue is a component library built on top of shadcn-vue to help you build AI-native applications faster.',
    },
    theme: {
      customizable: true,
      color: 'zinc',
      radius: 0.5,
    },
    header: {
      title: 'AI Elements Vue',
      showTitle: true,
      darkModeToggle: true,
      languageSwitcher: {
        enable: false,
        triggerType: 'icon',
        dropdownType: 'select',
      },
      logo: {
        light: '/logo.svg',
        dark: '/logo-dark.svg',
      },
      nav: [{
        title: 'Docs',
        links: [{
          title: 'Getting Started',
          to: '/overview/introduction',
          description: 'What is AI Elements Vue and why you should use it',
          target: '_self',
        }, {
          title: 'Examples',
          to: '/examples',
          description: 'Real-world examples showing how to build applications with AI Elements Vue',
          target: '_self',
        }, {
          title: 'Components',
          to: '/components/chatbot',
          description: 'Explore the components and usage examples of AI Elements Vue',
          target: '_self',
        }],
      }, {
        title: 'Credits',
        links: [{
          title: 'AI Elements',
          to: 'https://ai-sdk.dev/elements/overview',
          description: 'AI Elements is a component library and custom registry built on top of shadcn/ui to help you build AI-native applications faster',
          target: '_blank',
        }, {
          title: 'Shadcn Vue',
          to: 'https://shadcn-vue.com',
          description: 'Re-usable components built with Reka UI, and Tailwind CSS',
          target: '_blank',
        }],
      }, {
        title: 'Community',
        links: [{
          title: 'GitHub',
          to: 'https://github.com/vuepont/ai-elements-vue',
          description: 'View the source code on GitHub',
          target: '_blank',
        }, {
          title: 'Discord',
          to: 'https://discord.gg/SWzhwGMxsZ',
          description: 'Join our Discord server to get help and connect with other developers',
          target: '_blank',
        }],
      }],
      links: [{
        icon: 'lucide:github',
        to: 'https://github.com/vuepont/ai-elements-vue',
        target: '_blank',
      }],
    },
    aside: {
      useLevel: true,
      levelStyle: 'aside',
      collapse: true,
      collapseLevel: 1,
      folderStyle: 'default',
    },
    main: {
      padded: true,
      breadCrumb: true,
      showTitle: true,
      codeCopyToast: false,
      codeCopyIcon: 'lucide:clipboard',
      editLink: {
        enable: true,
        pattern: 'https://github.com/vuepont/ai-elements-vue/edit/main/apps/www/content/:path',
        text: 'Edit this page',
        icon: 'lucide:square-pen',
        placement: ['docsFooter'],
      },
      backToTop: true,
    },
    footer: {
      credits: 'Copyright © 2025',
      links: [{
        icon: 'lucide:github',
        to: 'https://github.com/vuepont/ai-elements-vue',
        target: '_blank',
      }, {
        icon: 'simple-icons:discord',
        to: 'https://discord.gg/SWzhwGMxsZ',
        target: '_blank',
      }],
    },
    toc: {
      enable: true,
      enableInMobile: true,
      enableInHomepage: false,
      progressBar: true,
      title: 'On this page',
      links: [{
        title: 'Star on GitHub',
        icon: 'lucide:star',
        to: 'https://github.com/vuepont/ai-elements-vue',
        target: '_blank',
      }, {
        title: 'Create Issues',
        icon: 'lucide:circle-dot',
        to: 'https://github.com/vuepont/ai-elements-vue/issues',
        target: '_blank',
      }],
    },
    search: {
      enable: true,
      inAside: false,
    },
  },
})
