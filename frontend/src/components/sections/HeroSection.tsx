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
  headline: string
  highlightedText?: string
  subtitle?: string
  ctas?: Cta[]
  techChips?: TechChip[]
  footnote?: string
}

export function HeroSection({ label, headline, highlightedText, subtitle, ctas, techChips, footnote }: Props) {
  const { lead, highlight } = splitHeroHeadline(headline, highlightedText)

  return (
    <section className="bg-[#0a0a0a] text-white pt-[88px] pb-[100px] px-6 text-center relative overflow-hidden">
      <div className="hero-glow" />
      <div className="relative z-[1]">
        {label && (
          <div className="inline-flex items-center gap-[7px] bg-[rgba(37,99,235,0.15)] border border-[rgba(37,99,235,0.35)] rounded-full px-[14px] py-[5px] pl-[7px] text-[13px] text-white/75 mb-7">
            <div className="w-5 h-5 bg-[#2563eb] rounded-full flex items-center justify-center text-[10px]">🖥️</div>
            {label}
          </div>
        )}

        <h1 className="disp--hero max-w-[800px] mx-auto mb-5 text-white">
          {lead}
          {highlight ? (
            <>
              {lead ? <br /> : null}
              <span className="text-[#60a5fa]">{highlight}</span>
            </>
          ) : null}
        </h1>

        {subtitle && (
          <p className="text-[clamp(16px,2vw,18px)] text-white/[0.52] max-w-[560px] mx-auto mb-10 leading-relaxed">
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
