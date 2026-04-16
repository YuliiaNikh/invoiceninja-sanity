import { PortableText } from '@portabletext/react'

interface Props {
  sectionLabel?: string
  title?: string
  body?: unknown[]
}

export function RichTextSection({ sectionLabel, title, body }: Props) {
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
