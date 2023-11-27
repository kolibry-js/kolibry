import prompts from 'prompts'
import { parseNyxi, run } from '@nyxb/nyxi'
import isInstalledGlobally from 'is-installed-globally'
import { underline } from 'kolorist'
import fs from 'fs-extra'
import type { KolibryThemeMeta } from '@kolibry/types'
import { satisfies } from 'semver'
import { version } from '../package.json'
import { packageExists } from './utils'
import { isPath } from './options'

const officialThemes: Record<string, string> = {
  'none': '',
  'default': '@kolibry/theme-default',
  'seriph': '@kolibry/theme-seriph',
  'apple-basic': '@kolibry/theme-apple-basic',
  'shibainu': '@kolibry/theme-shibainu',
  'bricks': '@kolibry/theme-bricks',
}

export async function getThemeMeta(name: string, path: string) {
  if (!fs.existsSync(path))
    return {}

  if (path) {
    const { kolibry = {}, engines = {} } = await fs.readJSON(path)

    if (engines.kolibry && !satisfies(version, engines.kolibry, { includePrerelease: true }))
      throw new Error(`[kolibry] theme "${name}" requires Kolibry version range "${engines.kolibry}" but found "${version}"`)

    return kolibry as KolibryThemeMeta
  }
  return undefined
}

export function resolveThemeName(name: string) {
  if (!name || name === 'none')
    return ''
  if (name.startsWith('@kolibry/theme-') || name.startsWith('kolibry-theme-'))
    return name
  if (isPath(name))
    return name

  // search for local packages first
  if (packageExists(`@kolibry/theme-${name}`))
    return `@kolibry/theme-${name}`
  if (packageExists(`kolibry-theme-${name}`))
    return `kolibry-theme-${name}`
  if (packageExists(name))
    return name

  // fallback to prompt install
  if (officialThemes[name] != null)
    return officialThemes[name]
  if (name.indexOf('@') === 0 && name.includes('/'))
    return name
  return `kolibry-theme-${name}`
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
