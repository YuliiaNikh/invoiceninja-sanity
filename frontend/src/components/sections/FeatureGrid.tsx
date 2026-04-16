import { PortableText } from '@portabletext/react'
import { Link } from 'react-router-dom'

interface Card {
  _key: string
  icon?: string
  title: string
  body?: string
  tags?: string[]
  linkLabel?: string
  linkHref?: string
}

interface FollowLink {
  _key?: string
  label: string
  href: string
}

interface Props {
  sectionLabel?: string
  title?: string
  subtitle?: string
  theme?: string
  /** Drop bottom `.sec` padding when the next section continues the same band (e.g. requirements → steps). */
  compactBottom?: boolean
  cards?: Card[]
  licenseTitle?: string
  licenseBody?: unknown[]
  followLinks?: FollowLink[]
}

function PtLink({
  value,
  children,
}: {
  value?: {href?: string}
  children?: React.ReactNode
}) {
  const href = value?.href || '#'
  const ext = href.startsWith('http://') || href.startsWith('https://')
  if (ext) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#60a5fa] hover:underline">
        {children}
      </a>
    )
  }
  return (
    <Link to={href} className="text-[#60a5fa] hover:underline">
      {children}
    </Link>
  )
}

export function FeatureGrid({
  sectionLabel,
  title,
  subtitle,
  theme = 'light',
  compactBottom,
  cards,
  licenseTitle,
  licenseBody,
  followLinks,
}: Props) {
  const isDark = theme === 'dark'
  const isSurface = theme === 'surface'

  const inner = (
    <>
      {sectionLabel && (
        <div className={`lbl ${isDark ? '!text-[#60a5fa]' : ''}`}>
          <div className={`lbl-dot ${isDark ? '!bg-[#60a5fa]' : ''}`} />
          {sectionLabel}
        </div>
      )}
      {title ? <h2 className={`disp ${isDark ? 'text-white' : ''}`}>{title}</h2> : null}
      {subtitle && <p className={`ssub ${isDark ? 'text-white/50' : ''} ${isSurface ? '' : ''}`}>{subtitle}</p>}

      {cards && cards.length > 0 && (
        <div
          className={`grid grid-cols-1 gap-5 ${
            isDark
              ? 'mt-10 sm:grid-cols-2 lg:grid-cols-3'
              : isSurface
                ? 'mt-8 sm:grid-cols-2 lg:grid-cols-3'
                : 'mt-12 sm:grid-cols-2 lg:grid-cols-3'
          }`}
        >
          {cards.map((card) => {
            const isCodebaseCard = isDark && (Boolean(card.tags?.length) || Boolean(card.linkHref))

            if (isCodebaseCard) {
              return (
                <div
                  key={card._key}
                  className="flex flex-col rounded-2xl border border-white/[0.08] bg-[#0a0a0a] p-7 text-center transition-colors hover:border-[#2563eb]"
                >
                  {card.icon && <div className="mb-3 text-[32px] leading-none">{card.icon}</div>}
                  <div className="mb-2 font-['Sora',sans-serif] text-[15px] font-bold text-white">{card.title}</div>
                  {card.body && (
                    <p className="mb-4 flex-1 text-left text-[13px] leading-relaxed text-white/45">{card.body}</p>
                  )}
                  {card.tags && card.tags.length > 0 && (
                    <div className="mb-4 flex flex-wrap justify-center gap-1.5">
                      {card.tags.map((t, i) => (
                        <span
                          key={`${card._key}-t${i}`}
                          className="rounded border border-white/[0.12] bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-[#60a5fa]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  {card.linkHref && card.linkLabel ? (
                    <a
                      href={card.linkHref}
                      target={card.linkHref.startsWith('http') ? '_blank' : undefined}
                      rel={card.linkHref.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="mt-auto text-[13px] font-medium text-[#60a5fa] no-underline hover:underline"
                    >
                      {card.linkLabel}
                    </a>
                  ) : null}
                </div>
              )
            }

            return (
              <div
                key={card._key}
                className={
                  isDark
                    ? 'rounded-2xl border border-white/[0.08] bg-[#0a0a0a] p-7 text-center transition-colors hover:border-[#2563eb]'
                    : isSurface
                      ? 'rounded-2xl border border-[#e2e8f0] bg-white p-[22px]'
                      : 'rounded-2xl border border-[#e2e8f0] bg-white p-7 transition-shadow hover:border-[#2563eb] hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)]'
                }
              >
                {card.icon && (
                  <div className={`${isSurface ? 'mb-2.5 text-2xl' : 'mb-[14px] text-[28px]'}`}>{card.icon}</div>
                )}
                <h3
                  className={`font-['Sora',sans-serif] font-bold ${isSurface ? 'mb-1.5 text-sm text-[#0f172a]' : 'mb-2 text-base'} ${isDark ? 'text-white' : 'text-[#0f172a]'}`}
                >
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
                        <ul
                          className={`list-none flex flex-col gap-1.5 text-sm ${isDark ? 'text-white/45' : 'text-[#64748b]'}`}
                        >
                          {lines.map((line, idx) => (
                            <li key={`${card._key}-${idx}`} className="flex items-start gap-2">
                              <span className={`mt-0.5 text-xs font-bold ${isDark ? 'text-[#60a5fa]' : 'text-[#2563eb]'}`}>
                                ✓
                              </span>
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
            )
          })}
        </div>
      )}

      {isDark && licenseTitle && licenseBody && licenseBody.length > 0 ? (
        <div
          className="mt-10 rounded-2xl border border-[rgba(37,99,235,0.25)] border-l-[3px] border-l-[#2563eb] p-6 text-left"
          style={{ background: 'rgba(37, 99, 235, 0.08)' }}
        >
          <h4 className="mb-2 font-['Sora',sans-serif] text-[15px] font-bold text-white/[0.85]">{licenseTitle}</h4>
          <div className="text-[13px] leading-relaxed text-white/[0.45] [&_p]:m-0 [&_p+p]:mt-2">
            <PortableText
              value={licenseBody as never}
              components={{
                marks: {
                  link: ({ value: v, children }) => <PtLink value={v as { href?: string }}>{children}</PtLink>,
                  strong: ({ children }) => <strong>{children}</strong>,
                },
              }}
            />
          </div>
        </div>
      ) : null}

      {followLinks && followLinks.length > 0 ? (
        <div className="mt-7 flex flex-wrap gap-3">
          {followLinks.map((l, i) => {
            const ext = l.href.startsWith('http://') || l.href.startsWith('https://')
            const cls =
              'inline-flex items-center gap-1 rounded-[9px] border-[1.5px] border-[#cbd5e1] px-5 py-2.5 text-sm font-medium text-[#2563eb] no-underline transition-colors hover:border-[#2563eb]'
            return ext ? (
              <a key={l._key || i} href={l.href} target="_blank" rel="noopener noreferrer" className={cls}>
                {l.label}
              </a>
            ) : (
              <Link key={l._key || i} to={l.href} className={cls}>
                {l.label}
              </Link>
            )
          })}
        </div>
      ) : null}
    </>
  )

  const secPad = compactBottom ? 'wrap sec !pb-0' : 'wrap sec'

  if (isSurface) {
    return (
      <div className="sec-bg">
        <div className={secPad}>{inner}</div>
      </div>
    )
  }

  return (
    <div className={isDark ? 'bg-[#0a0a0a] border-t border-white/5' : ''}>
      <div className={secPad}>{inner}</div>
    </div>
  )
}
