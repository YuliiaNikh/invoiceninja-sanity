import { Link } from 'react-router-dom'

/** html/auto-installers.html “Prefer a manual installation?” block inside the gray band. */
export function InstallerManualStrip() {
  return (
    <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-[#bfdbfe] bg-[#f0f7ff] px-8 py-6 max-[820px]:flex-col max-[820px]:items-start">
      <div className="min-w-0">
        <h4 className="mb-1 font-['Sora',sans-serif] text-base font-bold text-[#0f172a]">Prefer a manual installation?</h4>
        <p className="max-w-[560px] text-sm leading-relaxed text-[#64748b]">
          If you want full control over every step — or need a custom server setup — follow our manual installation guides
          for Ubuntu + Nginx, CentOS + Nginx, or Docker Compose.
        </p>
      </div>
      <Link
        to="getting-started"
        className="shrink-0 rounded-[9px] border-[1.5px] border-[#2563eb] px-5 py-2.5 text-sm font-medium text-[#2563eb] no-underline transition-colors hover:bg-[#2563eb] hover:text-white"
      >
        View manual install guides →
      </Link>
    </div>
  )
}
