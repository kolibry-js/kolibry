import { join } from 'node:path'
import process from 'node:process'
import type { InlineConfig } from 'vite'
import { createServer as createViteServer, resolveConfig } from 'vite'
import { mergeViteConfigs } from './common'
import type { ResolvedEnigmaSlidevOptions, EnigmaSlidevServerOptions } from './options'
import { ViteEnigmaSlidevPlugin } from './plugins/preset'

export async function createServer(
  options: ResolvedEnigmaSlidevOptions,
  viteConfig: InlineConfig = {},
  serverOptions: EnigmaSlidevServerOptions = {},
) {
  const rawConfig = await resolveConfig({}, 'serve', options.entry)
  const pluginOptions = rawConfig.enigmaslidev || {}

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
          await ViteEnigmaSlidevPlugin(options, pluginOptions, serverOptions),
        ],
      }),
      'serve',
    ),
  )

  return server
}
