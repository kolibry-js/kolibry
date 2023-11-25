import fs from 'fs-extra'
import { satisfies } from 'semver'
import type { KolibriConfig } from '@kolibrijs/types'
import { version } from '../package.json'
import { packageExists, resolveImportPath } from './utils'
import { isPath } from './options'

export async function getPackageJson(root: string): Promise<Record<string, any>> {
  try {
    const file = resolveImportPath(`${root}/package.json`, true)
    if (file && fs.existsSync(file))
      return await fs.readJSON(file)
    return {}
  }
  catch (e) {
    return {}
  }
}

export async function getAddons(userRoot: string, config: KolibriConfig): Promise<string[]> {
  const { kolibri = {} } = await getPackageJson(userRoot)
  const configAddons = Array.isArray(config.addons) ? config.addons : []
  const addons = configAddons.concat(Array.isArray(kolibri?.addons) ? kolibri.addons : [])
  return (await getRecursivePlugins(addons.map(resolvePluginName), 3)).filter(Boolean)
}

export async function getRecursivePlugins(addons: string[], depth: number): Promise<string[]> {
  const addonsArray = await Promise.all(addons.map(async (addon) => {
    const { kolibri = {}, engines = {} } = await getPackageJson(addon)
    checkEngine(addon, engines)

    let addons = Array.isArray(kolibri?.addons) ? kolibri.addons : []
    if (addons.length > 0 && depth)
      addons = await getRecursivePlugins(addons.map(resolvePluginName), depth - 1)
    addons.push(addon)

    return addons
  }))
  return addonsArray.flat()
}

export async function checkEngine(name: string, engines: { kolibri?: string }) {
  if (engines.kolibri && !satisfies(version, engines.kolibri, { includePrerelease: true }))
    throw new Error(`[kolibri] addon "${name}" requires Kolibri version range "${engines.kolibri}" but found "${version}"`)
}

export function resolvePluginName(name: string) {
  if (!name)
    return ''
  if (isPath(name))
    return name
  if (packageExists(`kolibri-addon-${name}`))
    return `kolibri-addon-${name}`
  return name
}
