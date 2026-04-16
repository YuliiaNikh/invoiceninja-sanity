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
      return <strong key={i}>{m[1]}</strong>
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
        <div className={showHeader ? 'pricing-grid pricing-grid--after-heading' : 'pricing-grid'}>
          {tiers.map((tier) => (
            <article key={tier._key} className={`price-card${tier.featured ? ' featured' : ''}`}>
              {tier.featured && tier.badge ? <div className="featured-badge">{tier.badge}</div> : null}
              {tier.tierLabel ? <div className="price-tier">{tier.tierLabel}</div> : null}
              <div className="price-name">{tier.name}</div>

              <div className="price-amount">
                {tier.price === '$0' ? (
                  <span className="price-num">$0</span>
                ) : tier.price.startsWith('$') ? (
                  <>
                    <span className="price-currency">$</span>
                    <span className="price-num">{tier.price.replace(/^\$/, '')}</span>
                  </>
                ) : (
                  <span className="price-num">{tier.price}</span>
                )}
              </div>
              {tier.period ? <div className="price-period">{tier.period}</div> : null}
              <div className="price-rule" />

              {tier.features && tier.features.length > 0 && (
                <ul className="price-feats">
                  {tier.features.map((f, i) => {
                    const text = asStringListItem(f)
                    const disp = featureDisplay(f)
                    if (disp === 'footnote') {
                      return (
                        <li key={stringListItemKey(f, i)} className="price-feat-footnote">
                          {text}
                        </li>
                      )
                    }
                    if (disp === 'dash') {
                      return (
                        <li key={stringListItemKey(f, i)}>
                          <span className="dash" aria-hidden>
                            —
                          </span>
                          <span>{text}</span>
                        </li>
                      )
                    }
                    return (
                      <li key={stringListItemKey(f, i)}>
                        <span className="chk">✓</span>
                        <span>{renderBoldSegments(text)}</span>
                      </li>
                    )
                  })}
                </ul>
              )}

              {tier.cta ? (
                <a
                  href={tier.cta.href}
                  className="price-btn"
                  target={tier.cta.href?.startsWith('http') ? '_blank' : undefined}
                  rel={tier.cta.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {tier.cta.label}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      )}

      {comparisonNote ? (
        <p className="mx-auto mt-5 max-w-3xl text-center text-[13px] text-[#64748b]">{comparisonNote}</p>
      ) : null}
    </div>
  )
}
