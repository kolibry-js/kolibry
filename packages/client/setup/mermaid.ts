/* __imports__ */

import type { MermaidOptions } from '@kolibrijs/types'
import { defineMermaidSetup } from '@kolibrijs/types'

export default defineMermaidSetup(() => {
  // eslint-disable-next-line prefer-const
  let injection_return: MermaidOptions = {
    theme: 'default',
  }

  /* __injections__ */

  return injection_return
})
