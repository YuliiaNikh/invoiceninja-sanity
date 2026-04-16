import type { ReactNode } from 'react'
import { PortableText } from '@portabletext/react'
import { Link } from 'react-router-dom'

interface CalloutCta {
  label: string
  href: string
}

interface Props {
  layout?: 'default' | 'calloutStrip'
  sectionLabel?: string
  title?: string
  body?: unknown[]
  calloutCta?: CalloutCta
}

function CalloutLink({ href, children }: { href: string; children: ReactNode }) {
  const isExternal = href.startsWith('http://') || href.startsWith('https://')
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[9px] border-[1.5px] border-[#2563eb] px-5 py-2.5 text-sm font-medium text-[#2563eb] no-underline transition-colors hover:bg-[#2563eb] hover:text-white"
      >
        {children}
      </a>
    )
  }
  return (
    <Link
      to={href}
      className="inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-[9px] border-[1.5px] border-[#2563eb] px-5 py-2.5 text-sm font-medium text-[#2563eb] no-underline transition-colors hover:bg-[#2563eb] hover:text-white"
    >
      {children}
    </Link>
  )
}

export function RichTextSection({ layout = 'default', sectionLabel, title, body, calloutCta }: Props) {
  if (layout === 'calloutStrip') {
    return (
      <div className="wrap -mt-12 pb-20">
        <div className="flex flex-col items-stretch justify-between gap-6 rounded-2xl border border-[#bfdbfe] bg-[#f0f7ff] px-6 py-6 sm:flex-row sm:items-center sm:gap-8 sm:px-8">
          <div className="min-w-0">
            {title ? (
              <h4 className="mb-1 font-['Sora',sans-serif] text-base font-bold text-[#0f172a]">{title}</h4>
            ) : null}
            {body && body.length > 0 ? (
              <div className="max-w-[640px] text-sm leading-relaxed text-[#64748b] [&_p]:m-0 [&_p+p]:mt-2">
                <PortableText value={body as never} />
              </div>
            ) : null}
          </div>
          {calloutCta?.href && calloutCta?.label ? (
            <CalloutLink href={calloutCta.href}>{calloutCta.label}</CalloutLink>
          ) : null}
        </div>
      </div>
    )
  }

  return (
    <div className="wrap sec">
      {sectionLabel && (
        <div className="lbl">
          <div className="lbl-dot" />
          {sectionLabel}
        </div>
      )}
      {title && <h2 className="disp">{title}</h2>}
      {body && (
        <div
          className={`prose prose-slate max-w-none text-sm text-[#64748b] leading-relaxed ${title ? 'mt-10' : sectionLabel ? 'mt-6' : ''}`}
        >
          <PortableText value={body as never} />
        </div>
      )}
    </div>
  )
}
