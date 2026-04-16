interface Card {
  _key: string
  icon?: string
  title: string
  body?: string
}

interface Props {
  sectionLabel?: string
  title: string
  subtitle?: string
  theme?: string
  cards?: Card[]
}

export function FeatureGrid({ sectionLabel, title, subtitle, theme = 'light', cards }: Props) {
  const isDark = theme === 'dark'

  return (
    <div className={isDark ? 'bg-[#0a0a0a] border-t border-white/5' : ''}>
      <div className="wrap sec">
        {sectionLabel && (
          <div className={`lbl ${isDark ? '!text-[#60a5fa]' : ''}`}>
            <div className={`lbl-dot ${isDark ? '!bg-[#60a5fa]' : ''}`} />
            {sectionLabel}
          </div>
        )}
        <h2 className={`disp ${isDark ? 'text-white' : ''}`}>{title}</h2>
        {subtitle && <p className={`ssub ${isDark ? 'text-white/50' : ''}`}>{subtitle}</p>}

        {cards && cards.length > 0 && (
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12 ${!subtitle ? 'mt-12' : ''}`}>
            {cards.map((card) => (
              <div
                key={card._key}
                className={
                  isDark
                    ? 'bg-[#0a0a0a] border border-white/[0.08] rounded-2xl p-7 text-center transition-colors hover:border-[#2563eb]'
                    : 'bg-white border border-[#e2e8f0] rounded-2xl p-7 transition-shadow hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] hover:border-[#2563eb]'
                }
              >
                {card.icon && <div className="text-[28px] mb-[14px]">{card.icon}</div>}
                <h3 className={`font-['Sora',sans-serif] text-base font-bold mb-2 ${isDark ? 'text-white' : 'text-[#0f172a]'}`}>
                  {card.title}
                </h3>
                {card.body &&
                  (() => {
                    const lines = card.body
                      .split('\n')
                      .map((l) => l.trim())
                      .filter(Boolean)
                    if (lines.length > 1) {
                      return (
                        <ul className={`list-none flex flex-col gap-1.5 text-sm ${isDark ? 'text-white/45' : 'text-[#64748b]'}`}>
                          {lines.map((line, idx) => (
                            <li key={`${card._key}-${idx}`} className="flex items-start gap-2">
                              <span className={`mt-0.5 font-bold text-xs ${isDark ? 'text-[#60a5fa]' : 'text-[#2563eb]'}`}>✓</span>
                              <span className="leading-relaxed">{line}</span>
                            </li>
                          ))}
                        </ul>
                      )
                    }
                    return (
                      <p className={`text-sm leading-relaxed ${isDark ? 'text-white/45' : 'text-[#64748b]'}`}>
                        {card.body}
                      </p>
                    )
                  })()}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
