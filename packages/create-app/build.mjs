import { copyFileSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs'
import * as url from 'node:url'
import { resolve } from 'node:path'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const __templateDir = resolve(__dirname, 'template')

const shouldCreateTemplateDict = () => !existsSync(__templateDir)

// key: copy to (relative ./template)
// value: origin (relative ./template)
const needCopyFiles = {
  'slides.md': '../../../demo/starter/slides.md',
  'pages/multiple-entries.md': '../../../demo/starter/pages/multiple-entries.md',
}

function copyDirectorySync(src, dest) {
  if (!existsSync(dest))
    mkdirSync(dest, { recursive: true })

  const entries = readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = resolve(src, entry.name)
    const destPath = resolve(dest, entry.name)

    entry.isDirectory() ? copyDirectorySync(srcPath, destPath) : copyFileSync(srcPath, destPath)
  }
}

function main() {
  if (shouldCreateTemplateDict())
    mkdirSync(__templateDir)

  Object.keys(needCopyFiles).forEach((relativeTargetPath) => {
    const sourcePath = resolve(__dirname, needCopyFiles[relativeTargetPath])
    const targetPath = resolve(__templateDir, relativeTargetPath)
    const exist = existsSync(targetPath)
    if (exist)
      rmSync(targetPath)
    copyFileSync(sourcePath, targetPath)
  })

  const assetsSourceDir = resolve(__dirname, '../../../demo/starter/assets')
  copyDirectorySync(assetsSourceDir, __templateDir) // Kopiert den assets-Ordner in das template-Verzeichnis

  // eslint-disable-next-line no-console
  console.log('done...')
}

main()
