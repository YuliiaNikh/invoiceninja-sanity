import { PortableText } from '@portabletext/react'
import { Link } from 'react-router-dom'
import { asStringListItem, stringListItemKey } from '../../utils/asStringListItem'
import { installerCardDefaults } from '../../utils/installerCardDefaults'
import { InstallerManualStrip } from './InstallerManualStrip'

interface StatItem {
  _key?: string
  value: string
  label: string
}

interface Card {
  _key: string
  icon?: string
  name: string
  eyebrow?: string
  description?: string
  tags?: unknown[]
  href?: string
  badge?: string
  featured?: boolean
  linkLabel?: string
  statItems?: StatItem[]
  hideDocLink?: boolean
}

interface Props {
  sectionLabel?: string
  title: string
  subtitle?: string
  theme?: string
  variant?: string
  columnsDesktop?: string | number
  cards?: Card[]
  footerNote?: unknown[]
  disclaimer?: unknown[]
  band?: string
  /** Set by PageBuilder for page-specific layout (e.g. auto-installers manual strip). */
  pageSlug?: string
}

function PtLink({
  value,
  children,
}: {
  value?: { href?: string }
  children?: React.ReactNode
}) {
  const href = value?.href || '#'
  const ext = href.startsWith('http://') || href.startsWith('https://')
  if (ext) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-[#2563eb] no-underline hover:underline">
        {children}
      </a>
    )
  }
  return (
    <Link to={href} className="font-medium text-[#2563eb] no-underline hover:underline">
      {children}
    </Link>
  )
}

const ptComponents = {
  marks: {
    link: ({ value: v, children }: { value?: { href?: string }; children?: React.ReactNode }) => (
      <PtLink value={v}>{children}</PtLink>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => <strong>{children}</strong>,
  },
}

function resolveDesktopColumns(columnsDesktop: unknown, variant?: string): 2 | 3 | 4 {
  const parsed =
    typeof columnsDesktop === 'number'
      ? columnsDesktop
      : typeof columnsDesktop === 'string'
        ? parseInt(columnsDesktop, 10)
        : NaN
  if (parsed === 2 || parsed === 3 || parsed === 4) return parsed
  if (variant === 'installer') return 3
  if (variant === 'install' || variant === 'integration') return 4
  if (variant === 'partner' || variant === 'community') return 2
  return 3
}

function desktopGridClass(cols: 2 | 3 | 4, variant?: string): string {
  if (variant === 'community') {
    if (cols === 2) return 'grid-cols-1 md:grid-cols-2'
  }
  if (variant === 'partner') {
    return 'grid-cols-1 md:grid-cols-2'
  }
  if (cols === 4) return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  if (cols === 3) return 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2'
}

export function CardGrid({
  sectionLabel,
  title,
  subtitle,
  theme = 'light',
  variant,
  columnsDesktop,
  cards,
  footerNote,
  disclaimer,
  band = 'surface',
  pageSlug,
}: Props) {
  const isDark = theme === 'dark'
  const useSurfaceBand = !isDark && band !== 'none'

  const desktopCols = resolveDesktopColumns(columnsDesktop, variant)
  /** Reference html/auto-installers.html: large “installer” cards (not compact install tiles). */
  const installerPageLayout =
    variant === 'installer' || (variant === 'install' && desktopCols === 3)

  const gridCols =
    installerPageLayout && desktopCols === 3
      ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      : desktopGridClass(desktopCols, variant)
  const gapClass = installerPageLayout
    ? 'gap-5'
    : variant === 'community'
      ? 'gap-5'
      : variant === 'partner'
        ? 'gap-4'
        : 'gap-3'
  const mtGrid = variant === 'community' || variant === 'partner' ? 'mt-10' : 'mt-10'

  const inner = (
    <>
      {sectionLabel && (
        <div className={`lbl ${isDark ? '!text-[#60a5fa]' : ''}`}>
          <div className={`lbl-dot ${isDark ? '!bg-[#60a5fa]' : ''}`} />
          {sectionLabel}
        </div>
      )}
      <h2 className={`disp ${isDark ? 'text-white' : ''}`}>{title}</h2>
      {subtitle && (
        <p
          className={
            installerPageLayout && !isDark
              ? 'mb-0 mt-0 max-w-[620px] text-[16px] leading-[1.65] text-[#64748b]'
              : `ssub ${isDark ? 'text-white/50' : ''} !mb-0`
          }
        >
          {subtitle}
        </p>
      )}

      {cards && cards.length > 0 && (
        <div
          className={`grid ${gridCols} ${gapClass} ${mtGrid} ${installerPageLayout ? 'items-stretch' : ''}`}
        >
          {cards.map((card) => {
            const Wrapper = card.href && variant !== 'community' && variant !== 'partner' ? 'a' : 'div'
            const wrapperProps =
              card.href && variant !== 'community' && variant !== 'partner'
                ? {
                    href: card.href,
                    target: card.href.startsWith('http') ? ('_blank' as const) : undefined,
                    rel: card.href.startsWith('http') ? 'noopener noreferrer' : undefined,
                  }
                : {}

            if (isDark) {
              return (
                <Wrapper
                  key={card._key}
                  {...wrapperProps}
                  className="rounded-2xl border border-white/[0.08] bg-[#0a0a0a] p-7 text-center no-underline transition-colors hover:border-[#2563eb]"
                >
                  {card.icon && <div className="mb-[14px] text-[36px]">{card.icon}</div>}
                  <div className="mb-[6px] font-['Sora',sans-serif] text-lg font-bold text-white">{card.name}</div>
                  {card.description && (
                    <div className="mb-[18px] text-[13px] leading-normal text-white/45">{card.description}</div>
                  )}
                  {card.tags && card.tags.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-[6px]">
                      {card.tags.map((tag, i) => (
                        <span
                          key={stringListItemKey(tag, i)}
                          className="rounded-full border border-[rgba(37,99,235,0.3)] bg-[rgba(37,99,235,0.15)] px-[10px] py-[3px] text-[11px] text-[#60a5fa]"
                        >
                          {asStringListItem(tag)}
                        </span>
                      ))}
                    </div>
                  )}
                </Wrapper>
              )
            }

            if (variant === 'community') {
              const feat = Boolean(card.featured)
              return (
                <div
                  key={card._key}
                  className={`flex flex-col rounded-2xl border p-8 transition-[box-shadow,border-color] duration-200 ${
                    feat
                      ? 'border-white/[0.08] bg-[#0a0a0a] hover:border-[#2563eb]'
                      : 'border-[#e2e8f0] bg-white hover:border-[#2563eb] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)]'
                  }`}
                >
                  {card.icon ? <div className={`mb-4 text-[36px] leading-none ${feat ? '' : ''}`}>{card.icon}</div> : null}
                  <div
                    className={`mb-2 font-['Sora',sans-serif] text-xl font-bold ${feat ? 'text-white' : 'text-[#0f172a]'}`}
                  >
                    {card.name}
                  </div>
                  {card.description ? (
                    <p className={`mb-5 flex-1 text-[14.5px] leading-[1.7] ${feat ? 'text-white/50' : 'text-[#64748b]'}`}>
                      {card.description}
                    </p>
                  ) : null}
                  {card.statItems && card.statItems.length > 0 ? (
                    <div className={`mb-5 flex gap-6 ${feat ? '' : 'text-[#64748b]'}`}>
                      {card.statItems.map((s, si) => (
                        <div key={s._key || si} className={feat ? 'text-[12px] text-white/40' : 'text-[12px] text-[#64748b]'}>
                          <strong
                            className={`mb-0.5 block font-['Sora',sans-serif] text-lg font-bold tracking-tight ${feat ? 'text-white/[0.8]' : 'text-[#0f172a]'}`}
                          >
                            {s.value}
                          </strong>
                          {s.label}
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {card.href ? (
                    <a
                      href={card.href}
                      target={card.href.startsWith('http') ? '_blank' : undefined}
                      rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={
                        feat
                          ? 'mt-5 inline-flex w-fit items-center gap-1.5 rounded-[9px] border border-[#2563eb] bg-[#2563eb] px-5 py-2.5 text-sm font-medium text-white no-underline transition-colors hover:bg-[#1d4ed8]'
                          : 'mt-4 inline-flex w-fit items-center gap-1.5 rounded-[9px] border-[1.5px] border-[#cbd5e1] px-5 py-2.5 text-sm font-medium text-[#1e293b] no-underline transition-all hover:border-[#2563eb] hover:text-[#2563eb]'
                      }
                    >
                      {card.linkLabel || `Visit ${card.name} →`}
                    </a>
                  ) : null}
                </div>
              )
            }

            if (variant === 'partner') {
              return (
                <div
                  key={card._key}
                  className="flex flex-col rounded-2xl border border-[#e2e8f0] bg-white p-[26px] transition-[box-shadow,border-color] duration-200 hover:border-[#2563eb] hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)]"
                >
                  <div className="mb-2 font-['Sora',sans-serif] text-[17px] font-bold text-[#0f172a]">{card.name}</div>
                  {card.description ? (
                    <p className="mb-0 flex-1 text-[14px] leading-[1.7] text-[#64748b]">{card.description}</p>
                  ) : null}
                  {card.tags && card.tags.length > 0 ? (
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {card.tags.map((rawTag, ti) => (
                        <span
                          key={stringListItemKey(rawTag, ti)}
                          className="rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-2.5 py-0.5 text-[11px] font-medium text-[#64748b]"
                        >
                          {asStringListItem(rawTag)}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {card.href ? (
                    <a
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1 text-[13px] font-medium text-[#2563eb] no-underline hover:underline"
                    >
                      Visit {card.name} →
                    </a>
                  ) : null}
                </div>
              )
            }

            if (variant === 'integration') {
              return (
                <Wrapper
                  key={card._key}
                  {...wrapperProps}
                  className="flex items-center gap-3 rounded-2xl border border-[#e2e8f0] bg-white px-5 py-[18px] no-underline transition-colors hover:border-[#2563eb] hover:shadow-[0_4px_16px_rgba(37,99,235,0.08)]"
                >
                  {card.icon && <div className="flex-shrink-0 text-[22px]">{card.icon}</div>}
                  <div>
                    <div className="font-['Sora',sans-serif] text-sm font-semibold text-[#0f172a]">{card.name}</div>
                    {card.description && (
                      <div className="mt-0.5 text-xs leading-snug text-[#64748b]">{card.description}</div>
                    )}
                  </div>
                  <div className="ml-auto flex-shrink-0 text-[13px] text-[#64748b]">→</div>
                </Wrapper>
              )
            }

            if (variant === 'doc') {
              const rowLabel = card.linkLabel || 'Learn more →'
              return (
                <Wrapper
                  key={card._key}
                  {...wrapperProps}
                  className="flex flex-col rounded-2xl border border-[#e2e8f0] bg-white p-6 no-underline transition-shadow hover:border-[#2563eb] hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)]"
                >
                  {card.icon && <div className="mb-3 text-[28px]">{card.icon}</div>}
                  <div className="mb-1.5 font-['Sora',sans-serif] text-[15px] font-bold text-[#0f172a]">{card.name}</div>
                  {card.description && (
                    <div className="flex-1 text-[13.5px] leading-relaxed text-[#64748b]">{card.description}</div>
                  )}
                  {!card.hideDocLink ? (
                    <div className="mt-3.5 text-[13px] font-medium text-[#2563eb]">{rowLabel}</div>
                  ) : null}
                </Wrapper>
              )
            }

            if (installerPageLayout) {
              const defaults = installerCardDefaults(card.name)
              /* On auto-installers, known platforms always use html/auto-installers.html copy. */
              const useHtmlReference = pageSlug === 'auto-installers' && Boolean(defaults.description)
              const iconText = useHtmlReference
                ? defaults.icon || (card.icon && String(card.icon).trim())
                : (card.icon && String(card.icon).trim()) || defaults.icon
              const eyebrowText = useHtmlReference
                ? defaults.eyebrow
                : (card.eyebrow && String(card.eyebrow).trim()) || defaults.eyebrow
              const descriptionText = useHtmlReference
                ? defaults.description
                : (card.description && String(card.description).trim()) || defaults.description
              const tagList = useHtmlReference
                ? defaults.tags ?? []
                : card.tags && card.tags.length > 0
                  ? card.tags
                  : (defaults.tags ?? [])
              const link = useHtmlReference
                ? defaults.linkLabel || `Install via ${card.name} →`
                : (card.linkLabel && String(card.linkLabel).trim()) ||
                  defaults.linkLabel ||
                  `Install via ${card.name} →`
              return (
                <div
                  key={card._key}
                  className={`relative flex h-full min-h-0 flex-col rounded-2xl border bg-white p-7 transition-[box-shadow,border-color] duration-200 hover:border-[#2563eb] hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] ${
                    card.featured ? 'border-2 border-[#2563eb]' : 'border border-[#e2e8f0]'
                  }`}
                >
                  {card.featured && card.badge ? (
                    <div className="absolute -top-3 left-5 rounded-full bg-[#2563eb] px-3 py-0.5 text-[11px] font-semibold text-white">
                      {card.badge}
                    </div>
                  ) : null}
                  {iconText ? (
                    <div className="mb-[14px] text-[36px] leading-[1.6]">{iconText}</div>
                  ) : null}
                  <div className="mb-1.5 font-['Sora',sans-serif] text-[18px] font-bold leading-tight text-[#0f172a]">
                    {card.name}
                  </div>
                  {eyebrowText ? (
                    <div className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#64748b]">
                      {eyebrowText}
                    </div>
                  ) : null}
                  {descriptionText ? (
                    <p className="mb-0 min-h-0 flex-1 text-[14px] leading-[1.7] text-[#64748b]">{descriptionText}</p>
                  ) : (
                    <div className="min-h-0 flex-1" aria-hidden />
                  )}
                  {tagList.length > 0 ? (
                    <div className="mt-[14px] flex flex-wrap gap-1.5">
                      {tagList.map((rawTag, ti) => {
                        const rawTone =
                          rawTag && typeof rawTag === 'object' && 'tone' in rawTag
                            ? (rawTag as { tone?: string | null }).tone
                            : undefined
                        const tone = rawTone == null || rawTone === '' ? undefined : rawTone
                        /* html: first tag uses .inst-tag.green unless editor sets tone to "default" */
                        const green = tone === 'green' || (ti === 0 && tone !== 'default')
                        return (
                          <span
                            key={stringListItemKey(rawTag, ti)}
                            className={
                              green
                                ? 'rounded-full border border-[#bbf7d0] bg-[#dcfce7] px-[9px] py-[3px] text-[11px] font-medium text-[#16a34a]'
                                : 'rounded-full border border-[#e2e8f0] bg-[#f8fafc] px-[9px] py-[3px] text-[11px] font-medium text-[#64748b]'
                            }
                          >
                            {asStringListItem(rawTag)}
                          </span>
                        )
                      })}
                    </div>
                  ) : null}
                  {card.href ? (
                    <a
                      href={card.href}
                      target={card.href.startsWith('http') ? '_blank' : undefined}
                      rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`mt-[18px] inline-flex w-fit items-center gap-[5px] text-[13px] font-medium no-underline transition-colors ${
                        card.featured
                          ? 'rounded-lg bg-[#2563eb] px-[18px] py-2.5 text-white hover:bg-[#1d4ed8] hover:no-underline'
                          : 'text-[#2563eb] hover:underline'
                      }`}
                    >
                      {link}
                    </a>
                  ) : null}
                </div>
              )
            }

            return (
              <Wrapper
                key={card._key}
                {...wrapperProps}
                className={`rounded-2xl border p-5 text-center no-underline transition-shadow hover:border-[#2563eb] hover:shadow-[0_4px_20px_rgba(0,0,0,0.07)] ${
                  card.featured ? 'border-[#2563eb] bg-[#f0f7ff]' : 'border-[#e2e8f0] bg-white'
                }`}
              >
                {card.icon && <div className="mb-2.5 text-[28px]">{card.icon}</div>}
                <div className="mb-1 font-['Sora',sans-serif] text-sm font-semibold text-[#0f172a]">{card.name}</div>
                {card.description && <div className="text-xs leading-normal text-[#64748b]">{card.description}</div>}
                {card.badge && <div className="mt-2 text-[11px] font-medium text-[#2563eb]">{card.badge}</div>}
              </Wrapper>
            )
          })}
        </div>
      )}

      {installerPageLayout && pageSlug === 'auto-installers' ? <InstallerManualStrip /> : null}

      {variant === 'integration' && footerNote && footerNote.length > 0 ? (
        <div className="mt-5 text-center text-[13px] text-[#64748b] [&_a]:font-medium [&_a]:text-[#2563eb] [&_a]:no-underline hover:[&_a]:underline [&_p]:m-0">
          <PortableText value={footerNote as never} components={ptComponents} />
        </div>
      ) : null}

      {variant === 'partner' && disclaimer && disclaimer.length > 0 ? (
        <div className="mt-8 rounded-[10px] border border-[#e2e8f0] bg-[#f8fafc] px-5 py-3.5 text-[12.5px] leading-relaxed text-[#64748b] [&_a]:font-medium [&_a]:text-[#2563eb] [&_a]:no-underline hover:[&_a]:underline">
          <PortableText value={disclaimer as never} components={ptComponents} />
        </div>
      ) : null}
    </>
  )

  if (isDark) {
    return (
      <div className="border-t border-white/5 bg-[#0a0a0a] py-20">
        <div className="wrap">
          <div className="">{inner}</div>
        </div>
      </div>
    )
  }

  if (useSurfaceBand) {
    return (
      <div className="sec-bg">
        <div className="wrap sec">{inner}</div>
      </div>
    )
  }

  return <div className="wrap sec">{inner}</div>
}
