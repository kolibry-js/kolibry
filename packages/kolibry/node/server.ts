import { join } from 'node:path'
import process from 'node:process'
import type { InlineConfig } from 'vite'
import { createServer as createViteServer, resolveConfig } from 'vite'
import { mergeViteConfigs } from './common'
import type { KolibryServerOptions, ResolvedKolibryOptions } from './options'
import { ViteKolibryPlugin } from './plugins/preset'

export async function createServer(
  options: ResolvedKolibryOptions,
  viteConfig: InlineConfig = {},
  serverOptions: KolibryServerOptions = {},
) {
  const rawConfig = await resolveConfig({}, 'serve', options.entry)
  const pluginOptions = rawConfig.kolibry || {}

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
          await ViteKolibryPlugin(options, pluginOptions, serverOptions),
        ],
      }),
      'serve',
    ),
  )

  return server
}
