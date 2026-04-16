/** Legacy rows used `values: string[]` with "✓", "—", etc. New CMS shape uses `cells` with explicit `mode`. */
export type ComparisonCell = {
  _type?: 'comparisonCell'
  _key?: string
  mode?: 'text' | 'check' | 'dash' | 'cross'
  text?: string | null
}

export type ComparisonRow = {
  _type?: 'comparisonTableRow'
  _key: string
  feature: string
  values?: string[]
  cells?: ComparisonCell[]
}

/** Builds CMS-shaped cells from legacy string rows (seed / static HTML parity). */
export function cellsFromLegacyStrings(parts: string[], rowKey: string): ComparisonCell[] {
  return parts.map((v, i) => {
    const _key = `${rowKey}-c${i}`
    if (v === '✓') return {_type: 'comparisonCell' as const, _key, mode: 'check'}
    if (v === '—' || v === '-') return {_type: 'comparisonCell' as const, _key, mode: 'dash'}
    if (v === '✗') return {_type: 'comparisonCell' as const, _key, mode: 'cross'}
    return {_type: 'comparisonCell' as const, _key, mode: 'text', text: v}
  })
}

/** Maps Sanity cell objects (or legacy strings) to display tokens for the table renderer. */
export function rowCellsToDisplayTokens(row: ComparisonRow): string[] {
  if (row.cells?.length) {
    return row.cells.map((c) => {
      switch (c.mode) {
        case 'check':
          return '✓'
        case 'dash':
          return '—'
        case 'cross':
          return '✗'
        case 'text':
        default:
          return (c.text ?? '').trim()
      }
    })
  }
  return row.values ?? []
}
