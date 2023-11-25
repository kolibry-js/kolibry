import prompts from 'prompts'
import { parseNyxi, run } from '@nyxb/nyxi'
import isInstalledGlobally from 'is-installed-globally'
import { underline } from 'kolorist'
import fs from 'fs-extra'
import type { EnigmaSlidevThemeMeta } from '@enigmaslidev/types'
import { satisfies } from 'semver'
import { version } from '../package.json'
import { packageExists } from './utils'
import { isPath } from './options'

const officialThemes: Record<string, string> = {
  'none': '',
  'default': '@enigmaslidev/theme-default',
  'seriph': '@enigmaslidev/theme-seriph',
  'apple-basic': '@enigmaslidev/theme-apple-basic',
  'shibainu': '@enigmaslidev/theme-shibainu',
  'bricks': '@enigmaslidev/theme-bricks',
}

export async function getThemeMeta(name: string, path: string) {
  if (!fs.existsSync(path))
    return {}

  if (path) {
    const { enigmaslidev = {}, engines = {} } = await fs.readJSON(path)

    if (engines.enigmaslidev && !satisfies(version, engines.enigmaslidev, { includePrerelease: true }))
      throw new Error(`[enigmaslidev] theme "${name}" requires EnigmaSlidev version range "${engines.enigmaslidev}" but found "${version}"`)

    return enigmaslidev as EnigmaSlidevThemeMeta
  }
  return undefined
}

export function resolveThemeName(name: string) {
  if (!name || name === 'none')
    return ''
  if (name.startsWith('@enigmaslidev/theme-') || name.startsWith('enigmaslidev-theme-'))
    return name
  if (isPath(name))
    return name

  // search for local packages first
  if (packageExists(`@enigmaslidev/theme-${name}`))
    return `@enigmaslidev/theme-${name}`
  if (packageExists(`enigmaslidev-theme-${name}`))
    return `enigmaslidev-theme-${name}`
  if (packageExists(name))
    return name

  // fallback to prompt install
  if (officialThemes[name] != null)
    return officialThemes[name]
  if (name.indexOf('@') === 0 && name.includes('/'))
    return name
  return `enigmaslidev-theme-${name}`
}

export async function promptForThemeInstallation(name: string) {
  name = resolveThemeName(name)
  if (!name)
    return name

  if (isPath(name) || packageExists(name))
    return name

  const { confirm } = await prompts({
    name: 'confirm',
    initial: 'Y',
    type: 'confirm',
    message: `The theme "${name}" was not found ${underline(isInstalledGlobally ? 'globally' : 'in your project')}, do you want to install it now?`,
  })

  if (!confirm)
    return false

  if (isInstalledGlobally)
    await run(parseNyxi, ['-g', name])
  else
    await run(parseNyxi, [name])

  return name
}
