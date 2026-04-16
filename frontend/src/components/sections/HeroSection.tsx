import { TECH_CHIP_COLOR_HEX } from '../../../../studio/constants/techChipColors'
import { splitHeroHeadline } from '../../utils/splitHeroHeadline'

interface Cta {
  _key: string
  label: string
  href: string
  variant: string
}

interface TechChip {
  _key: string
  name: string
  color?: string
}

interface Props {
  label?: string
  /** Emoji in a circle before the label; omit for text-only pill (inner pages). */
  labelIcon?: string
  headline: string
  highlightedText?: string
  /** When set (inner pages), highlight stays inline; this renders on the next line (see pricing.html). */
  headlineLine2?: string
  subtitle?: string
  ctas?: Cta[]
  techChips?: TechChip[]
  footnote?: string
}

export function HeroSection({
  label,
  labelIcon,
  headline,
  highlightedText,
  headlineLine2,
  subtitle,
  ctas,
  techChips,
  footnote,
}: Props) {
  const { lead, highlight } = splitHeroHeadline(headline, highlightedText)
  const line2 = typeof headlineLine2 === 'string' ? headlineLine2.trim() : ''

  const isHomeStyleHero = Boolean(
    (techChips && techChips.length > 0) || (ctas && ctas.length > 0) || (footnote && footnote.trim().length > 0),
  )

  return (
    <section
      className={`bg-[#0a0a0a] text-white px-6 text-center relative overflow-hidden ${
        isHomeStyleHero ? 'pt-[88px] pb-[100px]' : 'pt-[72px] pb-20'
      }`}
    >
      <div className="hero-glow" />
      <div className="relative z-[1]">
        {label && (
          <div
            className={
              labelIcon
                ? 'inline-flex items-center gap-[7px] bg-[rgba(37,99,235,0.15)] border border-[rgba(37,99,235,0.35)] rounded-full px-[14px] py-[5px] pl-[7px] text-[13px] text-white/75 mb-7'
                : 'inline-flex items-center gap-1.5 bg-[rgba(37,99,235,0.15)] border border-[rgba(37,99,235,0.3)] rounded-full px-3.5 py-1 text-xs font-medium tracking-[0.06em] uppercase text-white/70 mb-5'
            }
          >
            {labelIcon ? (
              <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-[10px]">
                {labelIcon}
              </div>
            ) : null}
            {label}
          </div>
        )}

        <h1
          className={`mx-auto text-white ${isHomeStyleHero ? 'disp--hero mb-5 max-w-[800px]' : 'disp--hero-page mb-3.5 max-w-[800px]'}`}
        >
          {isHomeStyleHero || !line2 ? (
            <>
              {lead}
              {highlight ? (
                <>
                  {lead ? <br /> : null}
                  <span className="text-[#60a5fa]">{highlight}</span>
                </>
              ) : null}
            </>
          ) : (
            <>
              {lead}
              {highlight ? <span className="text-[#60a5fa]">{highlight}</span> : null}
              <br />
              {line2}
            </>
          )}
        </h1>

        {subtitle && (
          <p
            className={`mx-auto text-white/[0.52] leading-relaxed ${
              isHomeStyleHero
                ? 'mb-10 max-w-[560px] text-[clamp(16px,2vw,18px)]'
                : 'mb-0 max-w-[520px] text-[17px]'
            }`}
          >
            {subtitle}
          </p>
        )}

        {ctas && ctas.length > 0 && (
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {ctas.map((cta) => (
              <a
                key={cta._key}
                href={cta.href}
                className={cta.variant === 'primary' ? 'btn-primary' : 'btn-ghost-dark'}
                target={cta.href?.startsWith('http') ? '_blank' : undefined}
                rel={cta.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {cta.label}
              </a>
            ))}
          </div>
        )}

        {footnote && <p className="mt-4 text-[13px] text-white/[0.28]">{footnote}</p>}

        {techChips && techChips.length > 0 && (
          <div className="mt-[52px] flex items-center justify-center gap-[10px] flex-wrap">
            {techChips.map((chip) => {
              const dotColor = chip.color
                ? TECH_CHIP_COLOR_HEX[chip.color] || chip.color
                : '#2563eb'
              return (
                <div
                  key={chip._key}
                  className="bg-white/5 border border-white/10 text-white/50 text-xs font-medium px-[14px] py-[6px] rounded-full flex items-center gap-[6px]"
                >
                  <span className="w-[6px] h-[6px] rounded-full" style={{ background: dotColor }} />
                  {chip.name}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
