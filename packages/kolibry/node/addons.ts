import fs from 'fs-extra'
import { satisfies } from 'semver'
import type { KolibryConfig } from '@kolibry/types'
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

export async function getAddons(userRoot: string, config: KolibryConfig): Promise<string[]> {
  const { kolibry = {} } = await getPackageJson(userRoot)
  const configAddons = Array.isArray(config.addons) ? config.addons : []
  const addons = configAddons.concat(Array.isArray(kolibry?.addons) ? kolibry.addons : [])
  return (await getRecursivePlugins(addons.map(resolvePluginName), 3)).filter(Boolean)
}

export async function getRecursivePlugins(addons: string[], depth: number): Promise<string[]> {
  const addonsArray = await Promise.all(addons.map(async (addon) => {
    const { kolibry = {}, engines = {} } = await getPackageJson(addon)
    checkEngine(addon, engines)

    let addons = Array.isArray(kolibry?.addons) ? kolibry.addons : []
    if (addons.length > 0 && depth)
      addons = await getRecursivePlugins(addons.map(resolvePluginName), depth - 1)
    addons.push(addon)

    return addons
  }))
  return addonsArray.flat()
}

export async function checkEngine(name: string, engines: { kolibry?: string }) {
  if (engines.kolibry && !satisfies(version, engines.kolibry, { includePrerelease: true }))
    throw new Error(`[kolibry] addon "${name}" requires Kolibry version range "${engines.kolibry}" but found "${version}"`)
}

export function resolvePluginName(name: string) {
  if (!name)
    return ''
  if (isPath(name))
    return name
  if (packageExists(`kolibry-addon-${name}`))
    return `kolibry-addon-${name}`
  return name
}
