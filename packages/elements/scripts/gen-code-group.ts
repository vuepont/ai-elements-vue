import fs from 'node:fs'
import path from 'node:path'

const srcDir = path.join(__dirname, '..', 'src')
const componentDirs = fs
  .readdirSync(srcDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)

// Read all component directories in the src directory
// For each directory, read all files and generate a .code-group.md file

for (const componentDir of componentDirs) {
  const componentPath = path.join(srcDir, componentDir)
  const files = fs
    .readdirSync(componentPath)
    .filter(
      file =>
        file !== '.code-group.md'
        && fs.statSync(path.join(componentPath, file)).isFile(),
    )
    .sort()

  if (files.length === 0) {
    continue
  }

  // Generate code group content
  const codeBlocks: string[] = []

  for (const file of files) {
    const filePath = path.join(componentPath, file)
    const content = fs.readFileSync(filePath, 'utf-8')
    const ext = path.extname(file).slice(1) // Remove the dot

    // Determine language based on extension
    let lang = ext
    if (ext === 'vue') {
      lang = 'vue'
    }
    else if (ext === 'ts' || ext === 'tsx') {
      lang = 'ts'
    }
    else if (ext === 'js' || ext === 'jsx') {
      lang = 'js'
    }
    else if (ext === 'md') {
      lang = 'md'
    }
    else {
      lang = ext
    }

    codeBlocks.push(`\`\`\`${lang} [${file}]\n${content}\n\`\`\``)
  }

  // Write .code-group.md file
  const codeGroupContent = `:::code-group\n${codeBlocks.join('\n\n')}\n:::\n`
  const codeGroupPath = path.join(componentPath, '.code-group.md')
  fs.writeFileSync(codeGroupPath, codeGroupContent, 'utf-8')

  console.log(`Generated ${codeGroupPath} for ${componentDir}`)
}

console.log('Done!')
