import type { ReactNode } from 'react'
import { asStringListItem, stringListItemKey } from '../../utils/asStringListItem'

interface Tier {
  _key: string
  name: string
  tierLabel?: string
  price: string
  period?: string
  featured?: boolean
  badge?: string
  features?: unknown[]
  cta?: { label: string; href: string }
}

interface Props {
  sectionLabel?: string
  title?: string
  subtitle?: string
  comparisonNote?: string
  tiers?: Tier[]
}

function featureDisplay(f: unknown): 'check' | 'dash' | 'footnote' {
  if (f && typeof f === 'object' && 'display' in f) {
    const d = String((f as { display?: string }).display)
    if (d === 'dash' || d === 'footnote') return d
  }
  return 'check'
}

/** `**bold**` segments from plain strings in seed data. */
function renderBoldSegments(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    const m = part.match(/^\*\*([^*]+)\*\*$/)
    if (m) {
      return (
        <strong key={i} className="font-semibold text-[#0f172a]">
          {m[1]}
        </strong>
      )
    }
    return <span key={i}>{part}</span>
  })
}

export function PricingSection({ sectionLabel, title, subtitle, comparisonNote, tiers }: Props) {
  const showHeader = Boolean(sectionLabel || title || subtitle)

  return (
    <div className="wrap sec">
      {showHeader ? (
        <div className="text-center">
          {sectionLabel && (
            <div className="lbl justify-center">
              <div className="lbl-dot" />
              {sectionLabel}
            </div>
          )}
          {title ? <h2 className="disp mx-auto">{title}</h2> : null}
          {subtitle ? <p className="ssub mx-auto">{subtitle}</p> : null}
        </div>
      ) : null}

      {tiers && tiers.length > 0 && (
        <div
          className={`mx-auto grid max-w-4xl grid-cols-1 gap-5 ${showHeader ? 'mt-12' : ''} md:grid-cols-2`}
        >
          {tiers.map((tier) => (
            <div
              key={tier._key}
              className={`relative flex flex-col rounded-2xl border p-7 ${
                tier.featured
                  ? 'border-[#2563eb] bg-[#f0f7ff] shadow-[0_4px_20px_rgba(37,99,235,0.1)]'
                  : 'border-[#e2e8f0] bg-white'
              }`}
            >
              {tier.featured && tier.badge ? (
                <div className="absolute -top-3 left-5 rounded-full bg-[#2563eb] px-3 py-0.5 text-[11px] font-semibold text-white">
                  {tier.badge}
                </div>
              ) : null}
              {tier.tierLabel ? (
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-[#64748b]">{tier.tierLabel}</div>
              ) : null}
              <div className="mb-4">
                <h3 className="font-['Sora',sans-serif] text-lg font-bold text-[#0f172a]">{tier.name}</h3>
              </div>

              <div className="mb-6">
                {tier.price === '$0' ? (
                  <span className="font-['Sora',sans-serif] text-[36px] font-bold tracking-tight text-[#0f172a]">$0</span>
                ) : tier.price.startsWith('$') ? (
                  <span className="font-['Sora',sans-serif] text-[36px] font-bold tracking-tight text-[#0f172a]">
                    <span className="align-top text-2xl">$</span>
                    {tier.price.replace(/^\$/, '')}
                  </span>
                ) : (
                  <span className="font-['Sora',sans-serif] text-[36px] font-bold tracking-tight text-[#0f172a]">
                    {tier.price}
                  </span>
                )}
                {tier.period && <div className="mt-1 text-sm text-[#64748b]">{tier.period}</div>}
              </div>

              {tier.features && tier.features.length > 0 && (
                <ul className="mb-8 flex flex-1 list-none flex-col gap-3">
                  {tier.features.map((f, i) => {
                    const text = asStringListItem(f)
                    const disp = featureDisplay(f)
                    if (disp === 'footnote') {
                      return (
                        <li
                          key={stringListItemKey(f, i)}
                          className="mt-2 border-t border-[#e2e8f0] pt-2 text-[13px] italic leading-relaxed text-[#64748b]"
                        >
                          {text}
                        </li>
                      )
                    }
                    if (disp === 'dash') {
                      return (
                        <li key={stringListItemKey(f, i)} className="flex items-start gap-2 text-sm text-[#1e293b]">
                          <span className="mt-0.5 flex-shrink-0 text-[#94a3b8]">—</span>
                          <span className="text-[#64748b]">{text}</span>
                        </li>
                      )
                    }
                    return (
                      <li key={stringListItemKey(f, i)} className="flex items-start gap-2 text-sm text-[#1e293b]">
                        <span className="mt-0.5 flex-shrink-0 text-[#16a34a]">✓</span>
                        <span>{renderBoldSegments(text)}</span>
                      </li>
                    )
                  })}
                </ul>
              )}

              {tier.cta && (
                <a
                  href={tier.cta.href}
                  className={tier.featured ? 'btn-primary justify-center' : 'btn-outline justify-center'}
                  target={tier.cta.href?.startsWith('http') ? '_blank' : undefined}
                  rel={tier.cta.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {tier.cta.label}
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {comparisonNote ? (
        <p className="mx-auto mt-5 max-w-3xl text-center text-[13px] text-[#64748b]">{comparisonNote}</p>
      ) : null}
    </div>
  )
}
