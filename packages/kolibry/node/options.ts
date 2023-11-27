import { dirname, join, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import type Vue from '@vitejs/plugin-vue'
import type VueJsx from '@vitejs/plugin-vue-jsx'
import type Icons from 'unplugin-icons/vite'
import type Components from 'unplugin-vue-components/vite'
import type Markdown from 'unplugin-vue-markdown/vite'
import type WindiCSS from 'vite-plugin-windicss'
import type { VitePluginConfig as UnoCSSConfig } from 'unocss/vite'
import type RemoteAssets from 'vite-plugin-remote-assets'
import type ServerRef from 'vite-plugin-vue-server-ref'
import type { ArgumentsType } from '@nyxb/utils'
import { uniq } from '@nyxb/utils'
import type { KolibryMarkdown } from '@kolibry/types'
import _debug from 'debug'
import { parser } from './parser'
import { packageExists, resolveImportPath } from './utils'
import { getThemeMeta, promptForThemeInstallation, resolveThemeName } from './themes'
import { getAddons } from './addons'

const debug = _debug('kolibry:options')
const __dirname = dirname(fileURLToPath(import.meta.url))

export interface KolibryEntryOptions {
  /**
   * Markdown entry
   *
   * @default 'slides.md'
   */
  entry?: string

  /**
   * Theme id
   */
  theme?: string

  /**
   * Remote password
   */
  remote?: string

  /**
   * Root path
   *
   * @default process.cwd()
   */
  userRoot?: string

  /**
   * Enable inspect plugin
   */
  inspect?: boolean
}

export interface ResolvedKolibryOptions {
  data: KolibryMarkdown
  entry: string
  userRoot: string
  cliRoot: string
  clientRoot: string
  theme: string
  themeRoots: string[]
  addonRoots: string[]
  roots: string[]
  mode: 'dev' | 'build' | 'export'
  remote?: string
  inspect?: boolean
}

export interface KolibryPluginOptions extends KolibryEntryOptions {
  vue?: ArgumentsType<typeof Vue>[0]
  vuejsx?: ArgumentsType<typeof VueJsx>[0]
  markdown?: ArgumentsType<typeof Markdown>[0]
  components?: ArgumentsType<typeof Components>[0]
  windicss?: ArgumentsType<typeof WindiCSS>[0]
  icons?: ArgumentsType<typeof Icons>[0]
  remoteAssets?: ArgumentsType<typeof RemoteAssets>[0]
  serverRef?: ArgumentsType<typeof ServerRef>[0]
  unocss?: UnoCSSConfig
}

export interface KolibryServerOptions {
  onDataReload?: (newData: KolibryMarkdown, data: KolibryMarkdown) => void
}

export function getClientRoot() {
  return dirname(resolveImportPath('@kolibry/client/package.json', true))
}

export function getCLIRoot() {
  return resolve(__dirname, '..')
}

export function isPath(name: string) {
  return name.startsWith('/') || /^\.\.?[\/\\]/.test(name)
}

export function getThemeRoots(name: string, entry: string) {
  if (!name)
    return []

  // TODO: handle theme inherit
  return [getRoot(name, entry)]
}

export function getAddonRoots(addons: string[], entry: string) {
  if (addons.length === 0)
    return []
  return addons.map(name => getRoot(name, entry))
}

export function getRoot(name: string, entry: string) {
  if (isPath(name))
    return resolve(dirname(entry), name)
  return dirname(resolveImportPath(`${name}/package.json`, true))
}

export function getUserRoot(options: KolibryEntryOptions) {
  const { entry: rawEntry = 'slides.md', userRoot = process.cwd() } = options
  const fullEntry = resolve(userRoot, rawEntry)
  return { entry: fullEntry, userRoot: dirname(fullEntry) }
}

export async function resolveOptions(
  options: KolibryEntryOptions,
  mode: ResolvedKolibryOptions['mode'],
  promptForInstallation = true,
): Promise<ResolvedKolibryOptions> {
  const { remote, inspect } = options
  const {
    entry,
    userRoot,
  } = getUserRoot(options)
  const data = await parser.load(entry)
  const theme = resolveThemeName(options.theme || data.config.theme)

  if (promptForInstallation) {
    if (await promptForThemeInstallation(theme) === false)
      process.exit(1)
  }
  else {
    if (!packageExists(theme)) {
      console.error(`Theme "${theme}" not found, have you installed it?`)
      process.exit(1)
    }
  }

  const clientRoot = getClientRoot()
  const cliRoot = getCLIRoot()
  const themeRoots = getThemeRoots(theme, entry)
  const addons = await getAddons(userRoot, data.config)
  const addonRoots = getAddonRoots(addons, entry)
  const roots = uniq([clientRoot, ...themeRoots, ...addonRoots, userRoot])

  if (themeRoots.length) {
    const themeMeta = await getThemeMeta(theme, join(themeRoots[0], 'package.json'))
    data.themeMeta = themeMeta
    if (themeMeta)
      data.config = parser.resolveConfig(data.headmatter, themeMeta, options.entry)
  }

  debug({
    config: data.config,
    mode,
    entry,
    theme,
    userRoot,
    clientRoot,
    cliRoot,
    themeRoots,
    addonRoots,
    roots,
    remote,
  })

  return {
    data,
    mode,
    entry,
    theme,
    userRoot,
    clientRoot,
    cliRoot,
    themeRoots,
    addonRoots,
    roots,
    remote,
    inspect,
  }
}
