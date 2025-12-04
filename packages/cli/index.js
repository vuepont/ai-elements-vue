#!/usr/bin/env node

const { spawnSync } = require('node:child_process')
const processModule = require('node:process')

function getCommandPrefix() {
  if (processModule.env.npm_config_user_agent) {
    const userAgent = processModule.env.npm_config_user_agent

    if (userAgent.includes('pnpm')) {
      return 'pnpm dlx'
    }
    if (userAgent.includes('yarn')) {
      return 'yarn dlx'
    }
    if (userAgent.includes('bun')) {
      return 'bunx'
    }
  }

  return 'npx -y'
}

const commandPrefix = getCommandPrefix()

const args = processModule.argv.slice(2)

if (args.length >= 2 && args[0] === 'add') {
  const component = args[1]
  const targetUrl = new URL(`/${component}.json`, 'https://registry.ai-elements-vue.com').toString()

  const fullCommand = `${commandPrefix} shadcn-vue@latest add ${targetUrl}`
  const result = spawnSync(fullCommand, {
    stdio: 'inherit',
    shell: true,
  })

  if (result.error) {
    console.error('Failed to execute command:', result.error.message)
    processModule.exit(1)
  }
  else if (result.status !== 0) {
    console.error(`Command failed with exit code ${result.status}`)
    processModule.exit(1)
  }
}
else {
  const targetUrl = new URL('/all.json', 'https://registry.ai-elements-vue.com').toString()

  fetch(targetUrl)
    .then(response => response.json())
    .then((data) => {
      const components = data.items.filter(item => item.type === 'registry:component')

      const componentUrls = components.map(item =>
        new URL(`/${item.name}.json`, 'https://registry.ai-elements-vue.com').toString(),
      )

      const fullCommand = `${commandPrefix} shadcn-vue@latest add ${componentUrls.join(' ')}`
      const result = spawnSync(fullCommand, {
        stdio: 'inherit',
        shell: true,
      })

      if (result.error) {
        console.error('Failed to execute command:', result.error.message)
        processModule.exit(1)
      }
      else if (result.status !== 0) {
        console.error(`Command failed with exit code ${result.status}`)
        processModule.exit(1)
      }
    })
}
