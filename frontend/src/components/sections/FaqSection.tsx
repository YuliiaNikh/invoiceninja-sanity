import { useState, type ReactNode } from 'react'
import { PortableText } from '@portabletext/react'
import { Link } from 'react-router-dom'

interface FaqItem {
  _key: string
  question: string
  answer?: unknown[]
}

interface Props {
  sectionLabel?: string
  title: string
  subtitle?: string
  /** `grid` matches html/pricing.html (two-column cards, answers always visible). */
  layout?: string
  items?: FaqItem[]
}

function FaqLink({
  value,
  children,
}: {
  value?: { href?: string }
  children?: ReactNode
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

const faqPtComponents = {
  marks: {
    link: ({ value: v, children }: { value?: { href?: string }; children?: ReactNode }) => (
      <FaqLink value={v}>{children}</FaqLink>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => <strong>{children}</strong>,
  },
}

export function FaqSection({ sectionLabel, title, subtitle, layout = 'accordion', items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const isGrid = layout === 'grid'

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

      {items && items.length > 0 && isGrid && (
        <div className="faq-grid">
          {items.map((item) => (
            <div key={item._key} className="faq-item">
              <div className="faq-q">{item.question}</div>
              {item.answer && item.answer.length > 0 ? (
                <div className="faq-a [&_p]:m-0">
                  <PortableText value={item.answer as never} components={faqPtComponents} />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {items && items.length > 0 && !isGrid && (
        <div className="mt-10 max-w-[720px]">
          {items.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={item._key} className="border-b border-[#e2e8f0]">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 border-none bg-transparent py-5 text-left"
                >
                  <span className="font-['Sora',sans-serif] text-[15px] font-semibold text-[#0f172a]">
                    {item.question}
                  </span>
                  <span
                    className="flex-shrink-0 text-xl text-[#64748b] transition-transform"
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'none' }}
                  >
                    +
                  </span>
                </button>
                {isOpen && item.answer && (
                  <div className="prose prose-sm max-w-none pb-5 text-sm leading-relaxed text-[#64748b]">
                    <PortableText value={item.answer as never} components={faqPtComponents} />
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
