import type { Plugin } from 'vite'
import { objectEntries } from '@nyxb/utils'
import type { ResolvedKolibriOptions } from '../options'
import { getDefine } from './extendConfig'

export function createFixPlugins(
  options: ResolvedKolibriOptions,
): Plugin[] {
  const define = objectEntries(getDefine(options))
  return [
    {
      name: 'kolibri:flags',
      enforce: 'pre',
      transform(code, id) {
        if (id.match(/\.vue($|\?)/)) {
          const original = code
          define.forEach(([from, to]) => {
            code = code.replace(new RegExp(from, 'g'), to)
          })
          if (original !== code)
            return code
        }
      },
    },
  ]
}
