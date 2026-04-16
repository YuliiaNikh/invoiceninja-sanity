import { useState } from 'react'
import { PortableText } from '@portabletext/react'

interface FaqItem {
  _key: string
  question: string
  answer?: unknown[]
}

interface Props {
  sectionLabel?: string
  title: string
  subtitle?: string
  items?: FaqItem[]
}

export function FaqSection({ sectionLabel, title, subtitle, items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="wrap sec">
      {sectionLabel && (
        <div className="lbl">
          <div className="lbl-dot" />
          {sectionLabel}
        </div>
      )}
      <h2 className="disp">{title}</h2>
      {subtitle && <p className="ssub">{subtitle}</p>}

      {items && items.length > 0 && (
        <div className="mt-10 max-w-[720px]">
          {items.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={item._key} className="border-b border-[#e2e8f0]">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left py-5 flex items-center justify-between gap-4 bg-transparent border-none cursor-pointer"
                >
                  <span className="font-['Sora',sans-serif] text-[15px] font-semibold text-[#0f172a]">
                    {item.question}
                  </span>
                  <span className="text-[#64748b] text-xl flex-shrink-0 transition-transform" style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}>
                    +
                  </span>
                </button>
                {isOpen && item.answer && (
                  <div className="pb-5 text-sm text-[#64748b] leading-relaxed prose prose-sm max-w-none">
                    <PortableText value={item.answer as never} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
