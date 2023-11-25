/* __imports__ */

import type { MermaidOptions } from '@enigmaslidev/types'
import { defineMermaidSetup } from '@enigmaslidev/types'

export default defineMermaidSetup(() => {
  // eslint-disable-next-line prefer-const
  let injection_return: MermaidOptions = {
    theme: 'default',
  }

  /* __injections__ */

  return injection_return
})
