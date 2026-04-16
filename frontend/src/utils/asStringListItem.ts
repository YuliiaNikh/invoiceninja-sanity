/** CMS list entries stored as `{ _key, value }` (Sanity array item objects) or plain strings. */
export function asStringListItem(item: unknown): string {
  if (typeof item === 'string') return item
  if (item && typeof item === 'object' && 'value' in item) {
    const v = (item as { value: unknown }).value
    return typeof v === 'string' ? v : v == null ? '' : String(v)
  }
  return ''
}

export function stringListItemKey(item: unknown, index: number): string {
  if (item && typeof item === 'object' && '_key' in item) {
    const k = (item as { _key?: unknown })._key
    if (typeof k === 'string' && k) return k
  }
  return String(index)
}
