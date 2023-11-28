import { $, fs } from 'zx'

await fs.copyFile('README.md', 'packages/kolibry/README.md')
await $`npx pnpm -r publish --tag docs --access public --no-git-checks`
