interface Props {
  stats: { _key: string; value: string; label: string }[]
}

export function StatStrip({ stats }: Props) {
  if (!stats?.length) return null

  return (
    <div className="bg-white border-b border-[#e2e8f0] py-5 px-6">
      <div className="max-w-[1160px] mx-auto flex items-center justify-center gap-12 flex-wrap max-[500px]:gap-6">
        {stats.map((stat, i) => (
          <div key={stat._key} className="contents">
            {i > 0 && <div className="w-px h-9 bg-[#e2e8f0] max-[500px]:hidden" />}
            <div className="flex flex-col items-center gap-[2px]">
              <strong className="font-['Sora',sans-serif] text-[22px] font-bold text-[#0f172a] tracking-tight">
                {stat.value}
              </strong>
              <span className="text-xs text-[#64748b]">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
