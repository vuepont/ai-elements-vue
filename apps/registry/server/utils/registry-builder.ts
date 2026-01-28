import type { Dirent } from 'node:fs'
import type { Registry, RegistryItem } from 'shadcn-vue/schema'
import { promises as fs } from 'node:fs'
import { basename, dirname, join, relative } from 'node:path'
import { parse as parseSFC } from '@vue/compiler-sfc'
import { registryItemSchema } from 'shadcn-vue/schema'
import { Project } from 'ts-morph'

interface ComponentAssetFile {
  type: 'registry:component'
  path: string
  content: string
  target?: string
}

interface ExampleAssetFile {
  type: 'registry:block'
  path: string
  content: string
  target?: string
}

interface PackageJson {
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
}

function toTitle(slug: string) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr))
}

function validateRegistryItem(item: unknown, label: string): item is RegistryItem {
  const parsed = registryItemSchema.safeParse(item)
  if (!parsed.success) {
    console.warn(`Invalid registry item schema (${label}):`, parsed.error.issues)
    return false
  }

  // Extra runtime guarantees for our generated assets.
  if (!parsed.data.files || parsed.data.files.length === 0) {
    console.warn(`Invalid registry item: files must be non-empty array (${label})`)
    return false
  }

  return true
}

interface DependencyAnalysisResult {
  dependencies: Set<string>
  devDependencies: Set<string>
  registryDependencies: Set<string>
}

function parseImportsFromCode(code: string): string[] {
  try {
    // Use ts-morph to parse TypeScript code and extract imports
    const project = new Project({
      useInMemoryFileSystem: true,
      compilerOptions: {
        allowJs: true,
        allowSyntheticDefaultImports: true,
        esModuleInterop: true,
        moduleResolution: 2, // Node
        target: 5, // ESNext
        module: 5, // ESNext
        strict: false,
        skipLibCheck: true,
      },
    })

    // Create a temporary source file
    const sourceFile = project.createSourceFile('temp.ts', code)

    // Extract all import declarations
    const imports: string[] = []
    sourceFile.getImportDeclarations().forEach((declaration) => {
      const moduleSpecifier = declaration.getModuleSpecifierValue()
      if (moduleSpecifier) {
        imports.push(moduleSpecifier)
      }
    })

    return unique(imports)
  }
  catch (error) {
    console.error('Failed to parse imports with ts-morph:', error)
    return []
  }
}

function extractRegistrySlug(modulePath: string, basePath: string): string {
  if (!modulePath.startsWith(basePath))
    return ''

  const rest = modulePath.slice(basePath.length)
    .split('/')
    .filter(Boolean)

  return rest[0] || ''
}

// Registry base URL
const REGISTRY_BASE_URL = 'https://registry.ai-elements-vue.com'

function analyzeDependencies(
  imports: string[],
  allowedDeps: Set<string>,
  allowedDevDeps: Set<string>,
  options?: { filePath: string, currentGroup: string },
): DependencyAnalysisResult {
  const dependencies = new Set<string>()
  const devDependencies = new Set<string>()
  const registryDependencies = new Set<string>()
  const basePath = 'components/ai-elements/'

  for (const mod of imports) {
    if (mod.startsWith('./')) {
      continue
    }

    if (mod.startsWith('../') && options) {
      const currentDir = dirname(options.filePath)
      const resolved = join(currentDir, mod).split('\\').join('/')
      if (resolved.startsWith(basePath)) {
        const targetGroup = resolved.slice(basePath.length).split('/').filter(Boolean)[0]
        if (targetGroup && targetGroup !== options.currentGroup) {
          registryDependencies.add(`${REGISTRY_BASE_URL}/${targetGroup}.json`)
        }
      }
      continue
    }

    if (allowedDeps.has(mod)) {
      dependencies.add(mod)
    }

    if (allowedDevDeps.has(mod)) {
      devDependencies.add(mod)
    }

    if (mod.startsWith('@/components/ui/')) {
      const slug = extractRegistrySlug(mod, '@/components/ui/')
      if (slug)
        registryDependencies.add(slug)
    }

    if (mod.startsWith('@/components/ai-elements/')) {
      const slug = extractRegistrySlug(mod, '@/components/ai-elements/')
      if (slug) {
        if (options && slug === options.currentGroup)
          continue
        registryDependencies.add(`${REGISTRY_BASE_URL}/${slug}.json`)
      }
    }
  }

  return { dependencies, devDependencies, registryDependencies }
}

async function walkComponentFiles(dir: string, rootDir: string): Promise<string[]> {
  const out: string[] = []
  let entries: Dirent[] = []
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  }
  catch {
    return out
  }
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      const nested = await walkComponentFiles(full, rootDir)
      out.push(...nested)
    }
    else if (entry.isFile()) {
      // Include all .vue files
      if (entry.name.endsWith('.vue')) {
        out.push(full)
      }
      // Include all .ts files except the root src/index.ts
      else if (entry.name.endsWith('.ts')) {
        const isRootIndex = full === join(rootDir, 'index.ts')
        if (!isRootIndex) {
          out.push(full)
        }
      }
    }
  }
  return out
}

export async function generateRegistryAssets(ctx: { rootDir: string }) {
  const rootDir = ctx.rootDir
  const elementsDir = join(rootDir, '..', '..', 'packages', 'elements')
  const srcDir = join(elementsDir, 'src')
  const examplesDir = join(rootDir, '..', '..', 'packages', 'examples', 'src')

  // read package.json for dependency sets
  let pkg: PackageJson = {}
  try {
    const raw = await fs.readFile(join(elementsDir, 'package.json'), 'utf-8')
    pkg = JSON.parse(raw) as PackageJson
  }
  catch {}

  // read examples package.json for additional dependencies
  let examplesPkg: PackageJson = {}
  try {
    const raw = await fs.readFile(join(rootDir, '..', '..', 'packages', 'examples', 'package.json'), 'utf-8')
    examplesPkg = JSON.parse(raw) as PackageJson
  }
  catch {}

  const internalDeps = new Set(Object.keys(pkg.dependencies || {}).filter((d: string) => d.startsWith('@repo') && d !== '@repo/shadcn-vue'))

  // Merge dependencies from both elements and examples packages
  const allDeps = { ...pkg.dependencies, ...examplesPkg.dependencies }
  const allDevDeps = { ...pkg.devDependencies, ...examplesPkg.devDependencies }

  const allowedDeps = new Set(Object.keys(allDeps || {}).filter((d: string) => !['vue', '@repo/shadcn-vue', ...Array.from(internalDeps)].includes(d)))
  const allowedDevDeps = new Set(Object.keys(allDevDeps || {}).filter((d: string) => !['typescript'].includes(d)))

  const componentFiles = await walkComponentFiles(srcDir, srcDir)
  const files: ComponentAssetFile[] = []
  for (const abs of componentFiles) {
    const raw = await fs.readFile(abs, 'utf-8')
    const parsed = raw
      .replace(/@repo\/shadcn-vue\//g, '@/')
      .replace(/@repo\/elements\//g, '@/components/ai-elements/')
    const rel = relative(srcDir, abs).split('\\').join('/')
    files.push({ type: 'registry:component', path: `components/ai-elements/${rel}`, content: parsed })
  }

  const exampleFiles: ExampleAssetFile[] = []
  try {
    const entries = await fs.readdir?.(examplesDir, { withFileTypes: true })
    if (entries) {
      const candidates = entries.filter(e => e.isFile() && e.name.endsWith('.vue')).map(e => join(examplesDir, e.name))
      for (const abs of candidates) {
        const raw = await fs.readFile(abs, 'utf-8')
        const parsed = raw.replace(/@repo\/elements\//g, '@/components/ai-elements/')
        const name = basename(abs)
        exampleFiles.push({ type: 'registry:block', path: `components/ai-elements/examples/${name}`, content: parsed })
      }
    }
  }
  catch {}

  const groupMap = new Map<string, ComponentAssetFile[]>()
  for (const f of files) {
    const rel = f.path.replace('components/ai-elements/', '')
    const group = rel.split('/')[0]
    if (!groupMap.has(group))
      groupMap.set(group, [])
    groupMap.get(group)!.push(f)
  }

  const componentItems: RegistryItem[] = Array.from(groupMap.keys()).map(group => ({
    name: group,
    type: 'registry:component',
    title: toTitle(group),
    description: `AI-powered ${group.replace('-', ' ')} components.`,
    files: groupMap.get(group)!.map((f) => {
      return {
        path: f.path,
        type: f.type,
        ...(f.target ? { target: f.target } : {}),
      }
    }),
  }))

  const exampleItems: RegistryItem[] = exampleFiles.map((ef) => {
    const fileName = basename(ef.path)
    const name = fileName.replace('.vue', '')
    return {
      name: `example-${name}`,
      type: 'registry:block',
      title: `${toTitle(name)} Example`,
      description: `Example implementation of ${name.replace('-', ' ')}.`,
      files: [{ path: ef.path, type: ef.type }],
    }
  })

  const indexJson: Registry = {
    name: 'ai-elements-vue',
    homepage: 'https://ai-elements-vue.com',
    items: [...componentItems, ...exampleItems],
  }

  const outBase = join(rootDir, 'server', 'assets', 'registry')
  await fs.mkdir(join(outBase, 'components'), { recursive: true })
  await fs.mkdir(join(outBase, 'examples'), { recursive: true })
  await fs.writeFile(join(outBase, 'index.json'), JSON.stringify(indexJson, null, 2), 'utf-8')

  for (const [group, groupFiles] of groupMap) {
    const groupDeps = new Set<string>()
    const groupDevDeps = new Set<string>()
    const groupRegistryDeps = new Set<string>()

    for (const f of groupFiles) {
      let code = ''
      // Handle Vue SFC files
      if (f.path.endsWith('.vue')) {
        const { descriptor } = parseSFC(f.content)
        code = [descriptor.script?.content || '', descriptor.scriptSetup?.content || ''].join('\n')
      }
      // Handle TypeScript files
      else if (f.path.endsWith('.ts')) {
        code = f.content
      }

      if (code) {
        const imports = parseImportsFromCode(code)
        const analysis = analyzeDependencies(imports, allowedDeps, allowedDevDeps, {
          filePath: f.path,
          currentGroup: group,
        })
        analysis.dependencies.forEach(dep => groupDeps.add(dep))
        analysis.devDependencies.forEach(dep => groupDevDeps.add(dep))
        analysis.registryDependencies.forEach(dep => groupRegistryDeps.add(dep))
      }
    }

    const itemJson = {
      $schema: 'https://shadcn-vue.com/schema/registry-item.json',
      name: group,
      type: 'registry:component',
      title: toTitle(group),
      description: `AI-powered ${group.replace('-', ' ')} components.`,
      files: groupFiles,
      dependencies: Array.from(groupDeps),
      devDependencies: Array.from(groupDevDeps),
      registryDependencies: Array.from(groupRegistryDeps),
    }

    // Validate before writing
    if (validateRegistryItem(itemJson, `component-${group}`)) {
      await fs.writeFile(join(outBase, 'components', `${group}.json`), JSON.stringify(itemJson, null, 2), 'utf-8')
    }
    else {
      console.error(`Skipping invalid component: ${group}`)
    }
  }

  for (const ef of exampleFiles) {
    const fileName = basename(ef.path)
    const name = fileName.replace('.vue', '')

    // Analyze dependencies for example files
    const { descriptor } = parseSFC(ef.content)
    const code = [descriptor.script?.content || '', descriptor.scriptSetup?.content || ''].join('\n')
    const imports = parseImportsFromCode(code)
    const analysis = analyzeDependencies(imports, allowedDeps, allowedDevDeps)

    const itemJson = {
      $schema: 'https://shadcn-vue.com/schema/registry-item.json',
      name: `example-${name}`,
      type: 'registry:block',
      title: `${toTitle(name)} Example`,
      description: `Example implementation of ${name.replace('-', ' ')}.`,
      files: [ef],
      dependencies: Array.from(analysis.dependencies),
      devDependencies: Array.from(analysis.devDependencies),
      registryDependencies: Array.from(analysis.registryDependencies),
    }

    // Validate before writing
    if (validateRegistryItem(itemJson, `example-${name}`)) {
      await fs.writeFile(join(outBase, 'examples', `${name}.json`), JSON.stringify(itemJson, null, 2), 'utf-8')
    }
    else {
      console.error(`Skipping invalid example: ${name}`)
    }
  }

  // eslint-disable-next-line no-console
  console.info('[nitro] registry server assets generated at', outBase)
}
