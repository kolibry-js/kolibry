import { $, fs } from 'zx'

await $`npx pnpm -r publish --tag docs --access public --no-git-checks`
