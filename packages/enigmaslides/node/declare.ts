import type { KolibriPluginOptions } from './options'

// extend vite.config.ts
declare module 'vite' {
  interface UserConfig {
    /**
     * Custom internal plugin options for Kolibri (advanced)
     *
     * @see https://github.com/kolibrijs/kolibri/blob/main/packages/kolibri/node/options.ts#L50
     */
    kolibri?: KolibriPluginOptions
  }
}
