import { useEffect, useState, type ReactNode } from 'react'
import { client } from '../sanity/client'
import { SETTINGS_QUERY } from '../sanity/queries'
import { Header } from './Header'
import { Footer } from './Footer'

interface Settings {
  siteName: string
  logo: string
  headerNav: { _key: string; label: string; href: string }[]
  headerActions: { _key: string; label: string; href: string; variant: string }[]
  footerColumns: { _key: string; heading: string; links: { _key: string; label: string; href: string }[] }[]
  socialLinks: { _key: string; platform: string; href: string }[]
  legalLinks: { _key: string; label: string; href: string }[]
}

export function Layout({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings | null>(null)

  useEffect(() => {
    client.fetch<Settings>(SETTINGS_QUERY).then(setSettings)
  }, [])

  if (!settings) {
    return (
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="text-[color:var(--muted,#64748b)]">Loading…</div>
      </div>
    )
  }

  return (
    <>
      <Header settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  )
}
