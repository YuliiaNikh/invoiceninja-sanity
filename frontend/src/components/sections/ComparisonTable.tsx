interface Row {
  _key: string
  feature: string
  values?: string[]
}

interface Props {
  sectionLabel?: string
  title: string
  subtitle?: string
  /** Header for the first column (default “Feature”; auto-installers use “Installer”). */
  firstColumnLabel?: string
  columns?: string[]
  rows?: Row[]
}

function renderCell(val: string) {
  if (val === '✓') return <span className="chk">✓</span>
  if (val === '✗') return <span className="text-[#64748b]">✗</span>
  if (val === '—' || val === '-') return <span className="dash">—</span>
  return <span className="compare-cell-text">{val}</span>
}

export function ComparisonTable({ sectionLabel, title, subtitle, firstColumnLabel = 'Feature', columns, rows }: Props) {
  const colHead = firstColumnLabel || 'Feature'

  return (
    <div className="border-y border-[#e2e8f0] bg-[#f8fafc]">
      <div className="wrap sec">
        {sectionLabel && (
          <div className="lbl">
            <div className="lbl-dot" />
            {sectionLabel}
          </div>
        )}
        <h2 className="disp">{title}</h2>
        {subtitle ? (
          <p className="ssub mt-3 !mb-0 max-w-[580px] text-base leading-relaxed text-[#64748b]">{subtitle}</p>
        ) : null}

        {columns && rows && (
          <div className="mt-10 overflow-x-auto">
            <table className="compare-table w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left">{colHead}</th>
                  {columns.map((col, i) => (
                    <th key={i} className="text-left">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row._key}>
                    <td>{row.feature}</td>
                    {row.values?.map((val, i) => (
                      <td key={i}>{renderCell(val)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
