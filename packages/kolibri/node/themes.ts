import prompts from 'prompts'
import { parseNyxi, run } from '@nyxb/nyxi'
import isInstalledGlobally from 'is-installed-globally'
import { underline } from 'kolorist'
import fs from 'fs-extra'
import type { KolibriThemeMeta } from '@kolibrijs/types'
import { satisfies } from 'semver'
import { version } from '../package.json'
import { packageExists } from './utils'
import { isPath } from './options'

const officialThemes: Record<string, string> = {
  'none': '',
  'default': '@kolibrijs/theme-default',
  'seriph': '@kolibrijs/theme-seriph',
  'apple-basic': '@kolibrijs/theme-apple-basic',
  'shibainu': '@kolibrijs/theme-shibainu',
  'bricks': '@kolibrijs/theme-bricks',
}

export async function getThemeMeta(name: string, path: string) {
  if (!fs.existsSync(path))
    return {}

  if (path) {
    const { kolibri = {}, engines = {} } = await fs.readJSON(path)

    if (engines.kolibri && !satisfies(version, engines.kolibri, { includePrerelease: true }))
      throw new Error(`[kolibri] theme "${name}" requires Kolibri version range "${engines.kolibri}" but found "${version}"`)

    return kolibri as KolibriThemeMeta
  }
  return undefined
}

export function resolveThemeName(name: string) {
  if (!name || name === 'none')
    return ''
  if (name.startsWith('@kolibrijs/theme-') || name.startsWith('kolibri-theme-'))
    return name
  if (isPath(name))
    return name

  // search for local packages first
  if (packageExists(`@kolibrijs/theme-${name}`))
    return `@kolibrijs/theme-${name}`
  if (packageExists(`kolibri-theme-${name}`))
    return `kolibri-theme-${name}`
  if (packageExists(name))
    return name

  // fallback to prompt install
  if (officialThemes[name] != null)
    return officialThemes[name]
  if (name.indexOf('@') === 0 && name.includes('/'))
    return name
  return `kolibri-theme-${name}`
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
