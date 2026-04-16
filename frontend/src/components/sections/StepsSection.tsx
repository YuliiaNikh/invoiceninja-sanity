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
        <div className="mt-10 relative">
          {steps.map((step, i) => (
            <div key={step._key} className="flex gap-6 mb-10 last:mb-0 relative">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#2563eb] text-white flex items-center justify-center font-['Sora',sans-serif] font-bold text-lg flex-shrink-0">
                  {step.number ?? i + 1}
                </div>
                {i < steps.length - 1 && <div className="w-[2px] flex-1 bg-[#e2e8f0] mt-2" />}
              </div>

              <div className="pb-2 flex-1">
                <h3 className="font-['Sora',sans-serif] text-lg font-bold text-[#0f172a] mb-2">{step.title}</h3>
                {step.body && <p className="text-sm text-[#64748b] leading-relaxed mb-3">{step.body}</p>}
                {step.chips && step.chips.length > 0 && (
                  <div className="flex gap-2 flex-wrap mb-3">
                    {step.chips.map((chip, j) => (
                      <span
                        key={stringListItemKey(chip, j)}
                        className="text-[11px] font-medium bg-[#eff6ff] text-[#2563eb] px-3 py-1 rounded-full border border-[#bfdbfe]"
                      >
                        {asStringListItem(chip)}
                      </span>
                    ))}
                  </div>
                )}
                {step.codeSnippet && (
                  <pre className="bg-[#0a0a0a] text-white/80 text-[13px] rounded-xl p-4 overflow-x-auto font-['Courier_New',monospace]">
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
