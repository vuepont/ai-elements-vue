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
          description: 'Introduction to AI Elements Vue',
          target: '_self',
        }, {
          title: 'Setup',
          to: '/overview/setup',
          description: 'Follow the step-by-step guide to install AI Elements Vue in your project',
          target: '_self',
        }, {
          title: 'Usage',
          to: '/overview/usage',
          description: 'Learn how to use AI Elements Vue in your project',
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
          to: 'https://github.com/cwandev/ai-elements-vue',
          description: 'Source code for AI Elements Vue',
          target: '_blank',
        }],
      }],
      links: [{
        icon: 'lucide:github',
        to: 'https://github.com/cwandev/ai-elements-vue',
        target: '_blank',
      }],
    },
    aside: {
      useLevel: false,
      collapse: false,
    },
    main: {
      breadCrumb: true,
      showTitle: true,
    },
    footer: {
      credits: 'Copyright © 2025',
      links: [{
        icon: 'lucide:github',
        to: 'https://github.com/cwandev/ai-elements-vue',
        target: '_blank',
      }],
    },
    toc: {
      enable: true,
      links: [{
        title: 'Star on GitHub',
        icon: 'lucide:star',
        to: 'https://github.com/cwandev/ai-elements-vue',
        target: '_blank',
      }, {
        title: 'Create Issues',
        icon: 'lucide:circle-dot',
        to: 'https://github.com/cwandev/ai-elements-vue/issues',
        target: '_blank',
      }],
    },
    search: {
      enable: true,
      inAside: false,
    },
  },
})
