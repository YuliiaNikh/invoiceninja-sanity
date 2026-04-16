import { splitHeroHeadline } from '../../utils/splitHeroHeadline'

interface Props {
  headline: string
  highlightedText?: string
  body?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  caption?: string
  variant?: string
}

export function CtaBand({ headline, highlightedText, body, primaryCta, secondaryCta, caption, variant = 'default' }: Props) {
  const { lead, highlight } = splitHeroHeadline(headline, highlightedText)

  if (variant === 'hosted') {
    return (
      <div className="sec-bg">
        <div className="max-w-[1160px] mx-auto px-6 py-10 flex items-center justify-between gap-8 flex-wrap max-[900px]:flex-col max-[900px]:items-start">
          <div>
            <h3 className="font-['Sora',sans-serif] text-xl font-bold text-[#0f172a] mb-[6px]">{headline}</h3>
            {body && <p className="text-[15px] text-[#64748b] max-w-[540px] leading-relaxed">{body}</p>}
          </div>
          <div className="flex items-center gap-[10px] flex-shrink-0 flex-wrap">
            {secondaryCta && (
              <a href={secondaryCta.href} className="btn-outline" target="_blank" rel="noopener noreferrer">
                {secondaryCta.label}
              </a>
            )}
            {primaryCta && (
              <a href={primaryCta.href} className="btn-filled" target="_blank" rel="noopener noreferrer">
                {primaryCta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <section className="bg-[#0a0a0a] text-white text-center py-20 px-6 relative overflow-hidden">
      <div className="cta-glow" />
      <div className="relative z-[1]">
        <h2 className="font-['Sora',sans-serif] text-[clamp(26px,4vw,46px)] font-bold tracking-tight leading-[1.1] max-w-[580px] mx-auto mb-4 text-white">
          {lead}
          {highlight ? (
            <>
              {lead ? <br /> : null}
              <span className="text-[#60a5fa]">{highlight}</span>
            </>
          ) : null}
        </h2>
        {body && <p className="text-base text-white/[0.48] mb-8">{body}</p>}

        <div className="flex items-center justify-center gap-3 flex-wrap">
          {primaryCta && (
            <a
              href={primaryCta.href}
              className="btn-primary text-[15px] !py-[14px] !px-7"
              target={primaryCta.href?.startsWith('http') ? '_blank' : undefined}
              rel={primaryCta.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {primaryCta.label}
            </a>
          )}
          {secondaryCta && (
            <a href={secondaryCta.href} className="btn-ghost-dark text-[15px] !py-[14px] !px-7">
              {secondaryCta.label}
            </a>
          )}
        </div>

        {caption && <p className="text-[13px] text-white/[0.24] mt-[14px]">{caption}</p>}
      </div>
    </section>
  )
}
