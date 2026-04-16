import { Link, useLocation } from 'react-router-dom'

interface Props {
  settings: {
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

  return (
    <nav className="sticky top-0 z-100 bg-white border-b border-[#e2e8f0]">
      <div className="nav-inner max-w-[1160px] mx-auto px-6 h-[60px] flex items-center">
        <Link to="/" className="font-['Sora',sans-serif] text-[17px] font-bold text-[#0f172a] no-underline mr-auto flex items-center gap-[9px]">
          {settings.logo || 'Invoice Ninja'}
          <span className="font-normal text-[#64748b] text-[13px] ml-[2px]">.org</span>
        </Link>

        <ul className="hidden md:flex items-center gap-[2px] list-none">
          {settings.headerNav?.map((item) => {
            if (isExternal(item.href)) {
              return (
                <li key={item._key}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#64748b] no-underline text-sm px-[13px] py-[6px] rounded-[7px] transition-colors hover:text-[#0f172a] hover:bg-[#f8fafc]"
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
                <Link
                  to={path}
                  className={`no-underline text-sm px-[13px] py-[6px] rounded-[7px] transition-colors hover:text-[#0f172a] hover:bg-[#f8fafc] ${
                    isActive ? 'text-[#2563eb] font-medium' : 'text-[#64748b]'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2 ml-5">
          {settings.headerActions?.map((action) => {
            const cls =
              action.variant === 'primary'
                ? 'btn-filled'
                : 'text-[#64748b] text-sm no-underline px-[14px] py-[7px] rounded-[7px] transition-colors hover:text-[#0f172a]'
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
