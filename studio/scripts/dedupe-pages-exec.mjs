/**
 * Removes extra `page` documents that share a slug with the canonical seed id `page-{slug}`.
 *
 *   cd studio && npm run dedupe:pages        # preview only
 *   cd studio && npm run dedupe:pages:apply  # delete duplicates
 *
 * Requires: `npm run seed:pages:cli` (or token seed) so `page-*` ids exist.
 */
import { getCliClient } from 'sanity/cli'

const client = getCliClient({ apiVersion: '2024-01-01' })
const apply = process.argv.includes('--apply')

const docs = await client.fetch(
  `*[_type == "page" && !(_id in path("drafts.**"))]{_id, "slug": slug.current}`,
)

/** @type {Map<string, { _id: string; slug: string }[]>} */
const bySlug = new Map()
for (const d of docs) {
  const slug = d.slug
  if (!slug) continue
  if (!bySlug.has(slug)) bySlug.set(slug, [])
  bySlug.get(slug).push({ _id: d._id, slug })
}

const toDelete = []
for (const [slug, list] of bySlug) {
  if (list.length < 2) continue
  const canonical = `page-${slug}`
  const hasCanonical = list.some((x) => x._id === canonical)
  if (!hasCanonical) {
    console.warn(
      `[${slug}] ${list.length} pages, no canonical "${canonical}" — skip (merge by hand or run seed first).`,
    )
    continue
  }
  for (const { _id } of list) {
    if (_id !== canonical) toDelete.push(_id)
  }
}

if (toDelete.length === 0) {
  console.log('No duplicate slugs found (or no canonical page-* id per slug).')
  process.exit(0)
}

console.log(apply ? 'Deleting:' : 'Would delete (run with --apply):')
for (const id of toDelete) console.log(' ', id)

if (!apply) {
  console.log(`\n${toDelete.length} document(s). Run: npm run dedupe:pages:apply`)
  process.exit(0)
}

for (const id of toDelete) {
  await client.delete(id)
  console.log('Deleted', id)
}
console.log('Done.')
