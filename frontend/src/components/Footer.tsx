interface Props {
  settings: {
    logo: string
    footerColumns: { _key: string; heading: string; links: { _key: string; label: string; href: string }[] }[]
    socialLinks: { _key: string; platform: string; href: string }[]
    legalLinks: { _key: string; label: string; href: string }[]
  }
}

function SocialIcon({ platform }: { platform: string }) {
  const p = platform.toLowerCase()
  if (p.includes('github'))
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    )
  if (p.includes('twitter') || p === 'x')
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.735-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    )
  if (p.includes('forum') || p.includes('community'))
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    )
  return <span className="text-xs">🔗</span>
}

export function Footer({ settings }: Props) {
  return (
    <footer className="bg-[#f8fafc] border-t border-[#e2e8f0] pt-12 pb-7 px-6">
      <div className="max-w-[1160px] mx-auto mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[220px_repeat(4,1fr)] gap-10">
        <div>
          <span className="font-['Sora',sans-serif] text-base font-bold text-[#0f172a] flex items-center gap-2 mb-[10px]">
            {settings.logo || 'Invoice Ninja'}
          </span>
          <p className="text-[13px] text-[#64748b] leading-relaxed max-w-[190px] mb-4">
            Source-code available invoicing software for the self-host community. Building business tools since 2014.
          </p>
          <div className="flex gap-2">
            {settings.socialLinks?.map((s) => (
              <a
                key={s._key}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                title={s.platform}
                className="w-8 h-8 rounded-lg border border-[#e2e8f0] bg-white flex items-center justify-center text-[#64748b] transition-colors hover:border-[#2563eb] hover:text-[#2563eb] hover:bg-[#f0f7ff]"
              >
                <SocialIcon platform={s.platform} />
              </a>
            ))}
          </div>
        </div>

        {settings.footerColumns?.map((col) => (
          <div key={col._key}>
            <div className="text-[11px] font-semibold tracking-[0.07em] uppercase text-[#0f172a] mb-[14px]">
              {col.heading}
            </div>
            <ul className="list-none flex flex-col gap-[10px]">
              {col.links?.map((link) => (
                <li key={link._key}>
                  <a
                    href={link.href}
                    target={link.href?.startsWith('http') ? '_blank' : undefined}
                    rel={link.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-[13.5px] text-[#64748b] no-underline hover:text-[#2563eb]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="max-w-[1160px] mx-auto border-t border-[#e2e8f0] pt-[22px] flex justify-between items-center flex-wrap gap-3">
        <p className="text-[13px] text-[#64748b]">
          © {new Date().getFullYear()} Invoice Ninja LLC. Source-code available under the{' '}
          <a href="https://www.elastic.co/licensing/elastic-license" target="_blank" rel="noopener noreferrer" className="text-[#2563eb] no-underline hover:underline">
            Elastic License v2
          </a>
          .
        </p>
        <div className="flex gap-5">
          {settings.legalLinks?.map((link) => (
            <a key={link._key} href={link.href} target="_blank" rel="noopener noreferrer" className="text-[13px] text-[#64748b] no-underline hover:text-[#2563eb]">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
