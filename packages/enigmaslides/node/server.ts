import { join } from 'node:path'
import process from 'node:process'
import type { InlineConfig } from 'vite'
import { createServer as createViteServer, resolveConfig } from 'vite'
import { mergeViteConfigs } from './common'
import type { ResolvedKolibriOptions, KolibriServerOptions } from './options'
import { ViteKolibriPlugin } from './plugins/preset'

export async function createServer(
  options: ResolvedKolibriOptions,
  viteConfig: InlineConfig = {},
  serverOptions: KolibriServerOptions = {},
) {
  const rawConfig = await resolveConfig({}, 'serve', options.entry)
  const pluginOptions = rawConfig.kolibri || {}

  // default open editor to code, #312
  process.env.EDITOR = process.env.EDITOR || 'code'

  const server = await createViteServer(
    await mergeViteConfigs(
      options,
      viteConfig,
      <InlineConfig>({
        optimizeDeps: {
          entries: [
            join(options.clientRoot, 'main.ts'),
          ],
        },
        plugins: [
          await ViteKolibriPlugin(options, pluginOptions, serverOptions),
        ],
      }),
      'serve',
    ),
  )

  return server
}
