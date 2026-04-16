interface Row {
  _key: string
  feature: string
  values?: string[]
}

interface Props {
  sectionLabel?: string
  title: string
  columns?: string[]
  rows?: Row[]
}

export function ComparisonTable({ sectionLabel, title, columns, rows }: Props) {
  return (
    <div className="wrap sec">
      {sectionLabel && (
        <div className="lbl">
          <div className="lbl-dot" />
          {sectionLabel}
        </div>
      )}
      <h2 className="disp">{title}</h2>

      {columns && rows && (
        <div className="mt-10 overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-[#e2e8f0]">
                <th className="text-left py-3 pr-6 font-semibold text-[#0f172a]">Feature</th>
                {columns.map((col, i) => (
                  <th key={i} className="text-center py-3 px-4 font-semibold text-[#0f172a]">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row._key} className="border-b border-[#e2e8f0]">
                  <td className="py-3 pr-6 text-[#1e293b]">{row.feature}</td>
                  {row.values?.map((val, i) => (
                    <td key={i} className="text-center py-3 px-4">
                      {val === '✓' ? (
                        <span className="text-[#16a34a] font-bold">✓</span>
                      ) : val === '✗' ? (
                        <span className="text-[#64748b]">✗</span>
                      ) : (
                        <span className="text-[#1e293b]">{val}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
