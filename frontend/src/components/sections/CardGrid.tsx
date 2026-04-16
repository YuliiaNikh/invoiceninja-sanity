import { asStringListItem, stringListItemKey } from '../../utils/asStringListItem'

interface Card {
  _key: string
  icon?: string
  name: string
  description?: string
  tags?: unknown[]
  href?: string
  badge?: string
  featured?: boolean
}

interface Props {
  sectionLabel?: string
  title: string
  subtitle?: string
  theme?: string
  variant?: string
  cards?: Card[]
}

export function CardGrid({ sectionLabel, title, subtitle, theme = 'light', variant, cards }: Props) {
  const isDark = theme === 'dark'

  const gridCols =
    variant === 'install' || variant === 'integration'
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
      : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <div className={isDark ? 'bg-[#0a0a0a] py-20 border-t border-white/5' : ''}>
      <div className={isDark ? 'wrap' : 'sec-bg'}>
        <div className={isDark ? '' : 'wrap sec'}>
          {sectionLabel && (
            <div className={`lbl ${isDark ? '!text-[#60a5fa]' : ''}`}>
              <div className={`lbl-dot ${isDark ? '!bg-[#60a5fa]' : ''}`} />
              {sectionLabel}
            </div>
          )}
          <h2 className={`disp ${isDark ? 'text-white' : ''}`}>{title}</h2>
          {subtitle && <p className={`ssub ${isDark ? 'text-white/50' : ''} !mb-0`}>{subtitle}</p>}

          {cards && cards.length > 0 && (
            <div className={`grid ${gridCols} gap-3 mt-10`}>
              {cards.map((card) => {
                const Wrapper = card.href ? 'a' : 'div'
                const wrapperProps = card.href
                  ? {
                      href: card.href,
                      target: card.href.startsWith('http') ? '_blank' as const : undefined,
                      rel: card.href.startsWith('http') ? 'noopener noreferrer' : undefined,
                    }
                  : {}

                if (isDark) {
                  return (
                    <Wrapper
                      key={card._key}
                      {...wrapperProps}
                      className="bg-[#0a0a0a] border border-white/[0.08] rounded-2xl p-7 text-center no-underline transition-colors hover:border-[#2563eb]"
                    >
                      {card.icon && <div className="text-[36px] mb-[14px]">{card.icon}</div>}
                      <div className="font-['Sora',sans-serif] text-lg font-bold text-white mb-[6px]">{card.name}</div>
                      {card.description && (
                        <div className="text-[13px] text-white/45 mb-[18px] leading-normal">{card.description}</div>
                      )}
                      {card.tags && card.tags.length > 0 && (
                        <div className="flex justify-center gap-[6px] flex-wrap">
                          {card.tags.map((tag, i) => (
                            <span
                              key={stringListItemKey(tag, i)}
                              className="text-[11px] bg-[rgba(37,99,235,0.15)] border border-[rgba(37,99,235,0.3)] text-[#60a5fa] px-[10px] py-[3px] rounded-full"
                            >
                              {asStringListItem(tag)}
                            </span>
                          ))}
                        </div>
                      )}
                    </Wrapper>
                  )
                }

                if (variant === 'integration') {
                  return (
                    <Wrapper
                      key={card._key}
                      {...wrapperProps}
                      className="bg-white border border-[#e2e8f0] rounded-2xl py-[18px] px-5 flex items-center gap-3 no-underline transition-colors hover:border-[#2563eb] hover:shadow-[0_4px_16px_rgba(37,99,235,0.08)]"
                    >
                      {card.icon && <div className="text-[22px] flex-shrink-0">{card.icon}</div>}
                      <div>
                        <div className="font-['Sora',sans-serif] text-sm font-semibold text-[#0f172a]">{card.name}</div>
                        {card.description && <div className="text-xs text-[#64748b] mt-[2px] leading-snug">{card.description}</div>}
                      </div>
                      <div className="ml-auto text-[13px] text-[#64748b] flex-shrink-0">→</div>
                    </Wrapper>
                  )
                }

                if (variant === 'doc') {
                  return (
                    <Wrapper
                      key={card._key}
                      {...wrapperProps}
                      className="bg-white border border-[#e2e8f0] rounded-2xl p-6 no-underline transition-shadow flex flex-col hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] hover:border-[#2563eb]"
                    >
                      {card.icon && <div className="text-[28px] mb-3">{card.icon}</div>}
                      <div className="font-['Sora',sans-serif] text-[15px] font-bold text-[#0f172a] mb-[6px]">{card.name}</div>
                      {card.description && <div className="text-[13.5px] text-[#64748b] leading-relaxed flex-1">{card.description}</div>}
                      <div className="text-[13px] font-medium text-[#2563eb] mt-[14px]">Learn more →</div>
                    </Wrapper>
                  )
                }

                return (
                  <Wrapper
                    key={card._key}
                    {...wrapperProps}
                    className={`border rounded-2xl p-5 text-center no-underline transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] hover:border-[#2563eb] ${
                      card.featured
                        ? 'border-[#2563eb] bg-[#f0f7ff]'
                        : 'border-[#e2e8f0] bg-white'
                    }`}
                  >
                    {card.icon && <div className="text-[28px] mb-[10px]">{card.icon}</div>}
                    <div className="font-['Sora',sans-serif] text-sm font-semibold text-[#0f172a] mb-1">{card.name}</div>
                    {card.description && <div className="text-xs text-[#64748b] leading-normal">{card.description}</div>}
                    {card.badge && <div className="text-[11px] font-medium text-[#2563eb] mt-2">{card.badge}</div>}
                  </Wrapper>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
