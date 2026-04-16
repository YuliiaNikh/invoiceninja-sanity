import { Link, useLocation } from 'react-router-dom'
import { LogoMark } from './LogoMark'
import { urlForLogoImage } from '../sanity/imageUrl'

interface Props {
  settings: {
    siteName: string
    logoImage?: {_type?: string; asset?: {_ref: string}} | null
    logo: string
    headerNav: { _key: string; label: string; href: string }[]
    headerActions: { _key: string; label: string; href: string; variant: string }[]
  }
}

function isExternal(href: string) {
  return href.startsWith('http') || href.startsWith('//')
}

function toInternalPath(href: string): string {
  if (!href) return '/'
  const name = href.replace(/\.html$/, '').replace(/^\//, '')
  if (name === 'index' || name === '') return '/'
  return `/${name}`
}

export function Header({ settings }: Props) {
  const location = useLocation()
  const logoSrc = urlForLogoImage(settings.logoImage ?? undefined)

  return (
    <nav className="sticky top-0 z-[100] bg-white border-b border-[#e2e8f0]">
      <div className="nav-header-inner">
        <Link to="/" className="nav-logo">
          {logoSrc ? (
            <img
              src={logoSrc}
              alt=""
              width={32}
              height={32}
              className="nav-logo-mark"
              decoding="async"
            />
          ) : (
            <LogoMark />
          )}
          {settings.logo || 'Invoice Ninja'}
          <span className="nav-logo-suffix">.org</span>
        </Link>

        <ul className="nav-links">
          {settings.headerNav?.map((item) => {
            if (isExternal(item.href)) {
              return (
                <li key={item._key}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                </li>
              )
            }

            const path = toInternalPath(item.href)
            const isActive = location.pathname === path
            return (
              <li key={item._key}>
                <Link to={path} className={isActive ? 'active' : undefined}>
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="nav-actions">
          {settings.headerActions?.map((action) => {
            const isPrimary = action.variant === 'primary'
            const cls = isPrimary ? 'btn-header-blue' : 'btn-header-ghost'
            return (
              <a key={action._key} href={action.href} className={cls} target="_blank" rel="noopener noreferrer">
                {action.label}
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
