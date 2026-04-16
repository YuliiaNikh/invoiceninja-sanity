import { AUTO_INSTALLERS_COMPARISON_SECTION } from '../constants/autoInstallersComparison'

type Section = { _key: string; _type: string; [key: string]: unknown }

/** Aligns older pricing documents with html/pricing.html without requiring a re-seed. */
function applyPricingHtmlParity(sections: Section[]): Section[] {
  return sections.map((s) => {
    if (s._type === 'heroSection') {
      const headline = String(s.headline ?? '').trim()
      const highlight = String(s.highlightedText ?? '').trim()
      const hasLine2 = Boolean((s as { headlineLine2?: string }).headlineLine2)
      if (headline === 'Self-hosting is' && highlight === 'free.' && !hasLine2) {
        return { ...s, headlineLine2: 'Always.' }
      }
    }
    if (s._type === 'featureGrid' && s.title === 'What the White Label license removes' && s.theme === 'light') {
      return { ...s, theme: 'surface' }
    }
    if (s._type === 'faqSection' && s.title === 'Common questions about pricing' && !(s as { layout?: string }).layout) {
      return { ...s, layout: 'grid' }
    }
    return s
  })
}

/** Injects static sections from html/*.html when the CMS document does not yet include them. */
export function mergePageSectionFallbacks(sections: Section[] | undefined, slug: string): Section[] | undefined {
  if (!sections?.length) return sections

  let next = slug === 'pricing' ? applyPricingHtmlParity([...sections]) : [...sections]

  if (slug !== 'auto-installers') return next
  if (next.some((s) => s._type === 'comparisonTable')) return next

  const ctaIdx = next.findIndex((s) => s._type === 'ctaBand')
  const insertAt = ctaIdx === -1 ? next.length : ctaIdx
  next.splice(insertAt, 0, { ...AUTO_INSTALLERS_COMPARISON_SECTION })
  return next
}
