import type { EnigmaSlidevPluginOptions } from './options'

// extend vite.config.ts
declare module 'vite' {
  interface UserConfig {
    /**
     * Custom internal plugin options for EnigmaSlidev (advanced)
     *
     * @see https://github.com/nyxb/slidev/blob/main/packages/enigmaslidev/node/options.ts#L50
     */
    enigmaslidev?: EnigmaSlidevPluginOptions
  }
}
