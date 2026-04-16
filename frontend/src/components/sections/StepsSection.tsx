import { stringListItemKey } from '../../utils/asStringListItem'

interface StepChip {
  _key?: string
  value?: string
  href?: string
  variant?: string
}

interface Step {
  _key: string
  number?: number
  title: string
  body?: string
  chips?: unknown[]
  codeSnippet?: string
}

interface Props {
  sectionLabel?: string
  title: string
  subtitle?: string
  /** Join with the section above (no top padding; label gets top margin like static HTML). */
  compactTop?: boolean
  steps?: Step[]
}

function parseChip(item: unknown): StepChip | null {
  if (typeof item === 'string') return {value: item}
  if (item && typeof item === 'object' && 'value' in item) {
    const o = item as Record<string, unknown>
    const value = o.value
    return {
      _key: typeof o._key === 'string' ? o._key : undefined,
      value: typeof value === 'string' ? value : value == null ? '' : String(value),
      href: typeof o.href === 'string' ? o.href : undefined,
      variant: typeof o.variant === 'string' ? o.variant : undefined,
    }
  }
  return null
}

function renderBodyWithInlineCode(text: string) {
  const parts = text.split(/(`[^`]+`)/g)
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      const code = part.slice(1, -1)
      return (
        <code
          key={i}
          className="rounded border border-[#e2e8f0] bg-[#f8fafc] px-[7px] py-0.5 font-mono text-[13px] text-[#1e293b]"
        >
          {code}
        </code>
      )
    }
    return <span key={i}>{part}</span>
  })
}

export function StepsSection({ sectionLabel, title, subtitle, compactTop, steps }: Props) {
  const wrapClass = compactTop ? 'wrap sec !pt-0' : 'wrap sec'

  return (
    <div className={wrapClass}>
      {sectionLabel && (
        <div className={`lbl ${compactTop ? '!mt-14' : ''}`}>
          <div className="lbl-dot" />
          {sectionLabel}
        </div>
      )}
      <h2 className="disp">{title}</h2>
      {subtitle ? <p className="ssub !mb-10 max-w-[620px] text-base">{subtitle}</p> : null}

      {steps && steps.length > 0 && (
        <div className="relative mt-10 before:pointer-events-none before:absolute before:left-[23px] before:top-6 before:bottom-6 before:z-0 before:w-0.5 before:bg-[#e2e8f0] before:content-['']">
          {steps.map((step, i) => (
            <div
              key={step._key}
              className="relative z-[1] flex gap-6 items-start pb-10 last:pb-0"
            >
              <div className="relative z-[2] flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2563eb] font-['Sora',sans-serif] text-base font-bold text-white shadow-[0_0_0_4px_#ffffff]">
                {step.number ?? i + 1}
              </div>

              <div className="min-w-0 flex-1 space-y-3 pt-2.5">
                <h3 className="font-['Sora',sans-serif] text-lg font-bold leading-snug text-[#0f172a]">
                  {step.title}
                </h3>
                {step.body && (
                  <p className="text-[14.5px] leading-relaxed text-[#64748b]">{renderBodyWithInlineCode(step.body)}</p>
                )}
                {step.chips && step.chips.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {step.chips.map((raw, j) => {
                      const chip = parseChip(raw)
                      if (!chip?.value) return null
                      const isPrimary = chip.variant === 'primary'
                      const base =
                        'inline-flex items-center rounded-lg border px-3.5 py-2 text-[13px] no-underline transition-colors'
                      const style = isPrimary
                        ? 'border-[#bfdbfe] bg-[#eff6ff] font-medium text-[#2563eb] hover:border-[#2563eb] hover:text-[#2563eb]'
                        : 'border-[#e2e8f0] bg-[#f8fafc] font-medium text-[#1e293b] hover:border-[#2563eb] hover:text-[#2563eb]'
                      const cls = `${base} ${style}`
                      const key = stringListItemKey(raw, j)
                      if (chip.href) {
                        const ext = chip.href.startsWith('http://') || chip.href.startsWith('https://')
                        return ext ? (
                          <a
                            key={key}
                            href={chip.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cls}
                          >
                            {chip.value}
                          </a>
                        ) : (
                          <a key={key} href={chip.href} className={cls}>
                            {chip.value}
                          </a>
                        )
                      }
                      return (
                        <span key={key} className={cls}>
                          {chip.value}
                        </span>
                      )
                    })}
                  </div>
                )}
                {step.codeSnippet && (
                  <pre className="mt-2 overflow-x-auto rounded-[9px] bg-[#0a0a0a] px-[18px] py-3.5 font-['Courier_New',monospace] text-[13px] text-[#86efac]">
                    <code>{step.codeSnippet}</code>
                  </pre>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
