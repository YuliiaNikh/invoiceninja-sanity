/**
 * Seeds pages using your Sanity CLI session (no SANITY_API_WRITE_TOKEN file).
 *
 *   cd studio && npx sanity exec scripts/seed-pages-exec.mjs --with-user-token
 *
 * Requires: `npx sanity login` first, and a role that can create/replace documents.
 */
import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { getCliClient } from 'sanity/cli'

const __dirname = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)
const { buildDocuments } = require(join(__dirname, 'seed-pages.cjs'))

const client = getCliClient({ apiVersion: '2024-01-01' })

async function run() {
  const docs = buildDocuments()
  for (const doc of docs) {
    await client.createOrReplace(doc)
    console.log('Upserted', doc._id, doc.slug?.current || doc.slug)
  }
  console.log(`Done. ${docs.length} pages.`)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
