/**
 * Hero / CTA titles use `headline` plus optional `highlightedText` in a second color.
 * If editors paste the full line into `headline` and repeat the highlight in CMS,
 * strip the duplicate so the highlight only renders once.
 */
export function splitHeroHeadline(headline: string, highlightedText?: string | null) {
  const highlight = typeof highlightedText === 'string' ? highlightedText.trim() : ''
  if (!highlight) {
    return { lead: headline, highlight: '' as const }
  }
  if (headline.includes(highlight)) {
    const lead = headline.replace(highlight, '').replace(/\s+/g, ' ').trim()
    return { lead, highlight }
  }
  return { lead: headline, highlight }
}
