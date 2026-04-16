import {rowCellsToDisplayTokens, type ComparisonRow} from '../../utils/comparisonTableCells'

interface Props {
  sectionLabel?: string
  title: string
  subtitle?: string
  /** Header for the first column (default “Feature”; auto-installers use “Installer”). */
  firstColumnLabel?: string
  columns?: string[]
  rows?: ComparisonRow[]
}

/** Vector check in the same blue as html/auto-installers.html `.chk` (uses `currentColor`). */
function TableCheckIcon() {
  return (
    <span className="chk compare-chk" role="img" aria-label="Included">
      <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          d="M1 5.5L5 9.5L13 1"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

function renderCell(val: string) {
  /* Dash / cross still match html/auto-installers.html; check uses SVG icon. */
  if (val === '✓') return <TableCheckIcon />
  if (val === '✗') return <span className="compare-cross">✗</span>
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
                    {rowCellsToDisplayTokens(row).map((val, i) => (
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
