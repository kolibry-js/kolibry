import type { KolibryPluginOptions } from './options'

// extend vite.config.ts
declare module 'vite' {
  interface UserConfig {
    /**
     * Custom internal plugin options for Kolibry (advanced)
     *
     * @see https://github.com/kolibry-js/kolibry/blob/main/packages/kolibry/node/options.ts#L50
     */
    kolibry?: KolibryPluginOptions
  }
}
