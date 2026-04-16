import { asStringListItem, stringListItemKey } from '../../utils/asStringListItem'

interface Tier {
  _key: string
  name: string
  price: string
  period?: string
  featured?: boolean
  badge?: string
  features?: unknown[]
  cta?: { label: string; href: string }
}

interface Props {
  sectionLabel?: string
  title: string
  subtitle?: string
  tiers?: Tier[]
}

export function PricingSection({ sectionLabel, title, subtitle, tiers }: Props) {
  return (
    <div className="wrap sec">
      <div className="text-center">
        {sectionLabel && (
          <div className="lbl justify-center">
            <div className="lbl-dot" />
            {sectionLabel}
          </div>
        )}
        <h2 className="disp mx-auto">{title}</h2>
        {subtitle && <p className="ssub mx-auto">{subtitle}</p>}
      </div>

      {tiers && tiers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {tiers.map((tier) => (
            <div
              key={tier._key}
              className={`rounded-2xl p-7 border flex flex-col ${
                tier.featured
                  ? 'border-[#2563eb] bg-[#f0f7ff] shadow-[0_4px_20px_rgba(37,99,235,0.1)]'
                  : 'border-[#e2e8f0] bg-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <h3 className="font-['Sora',sans-serif] text-lg font-bold text-[#0f172a]">{tier.name}</h3>
                {tier.badge && (
                  <span className="text-[11px] font-semibold px-3 py-[3px] rounded-full bg-[#2563eb] text-white">
                    {tier.badge}
                  </span>
                )}
              </div>

              <div className="mb-6">
                <span className="font-['Sora',sans-serif] text-[36px] font-bold text-[#0f172a] tracking-tight">
                  {tier.price}
                </span>
                {tier.period && <span className="text-sm text-[#64748b] ml-1">{tier.period}</span>}
              </div>

              {tier.features && tier.features.length > 0 && (
                <ul className="list-none flex flex-col gap-3 mb-8 flex-1">
                  {tier.features.map((f, i) => (
                    <li key={stringListItemKey(f, i)} className="flex items-start gap-2 text-sm text-[#1e293b]">
                      <span className="text-[#16a34a] mt-[2px] flex-shrink-0">✓</span>
                      {asStringListItem(f)}
                    </li>
                  ))}
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
    </div>
  )
}
