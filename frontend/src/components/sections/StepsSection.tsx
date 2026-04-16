import { asStringListItem, stringListItemKey } from '../../utils/asStringListItem'

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
  steps?: Step[]
}

export function StepsSection({ sectionLabel, title, steps }: Props) {
  return (
    <div className="wrap sec">
      {sectionLabel && (
        <div className="lbl">
          <div className="lbl-dot" />
          {sectionLabel}
        </div>
      )}
      <h2 className="disp">{title}</h2>

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
                  <p className="text-[14.5px] leading-relaxed text-[#64748b]">{step.body}</p>
                )}
                {step.chips && step.chips.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {step.chips.map((chip, j) => (
                      <span
                        key={stringListItemKey(chip, j)}
                        className="inline-flex items-center rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-2 text-[13px] font-medium text-[#1e293b]"
                      >
                        {asStringListItem(chip)}
                      </span>
                    ))}
                  </div>
                )}
                {step.codeSnippet && (
                  <pre className="overflow-x-auto rounded-xl bg-[#0a0a0a] p-4 font-['Courier_New',monospace] text-[13px] text-white/80">
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
