/**
 * Tech chip dot colors: matches frontend `_variables.scss` tokens plus brand presets.
 * Stored in Sanity as the `value` string, or any `#rrggbb` from the custom picker.
 */
export type TechChipColorOption = {
  value: string
  title: string
  hex: string
}

export const TECH_CHIP_COLOR_OPTIONS: TechChipColorOption[] = [
  {value: 'blue', title: 'Blue', hex: '#2563eb'},
  {value: 'blue-dark', title: 'Blue dark', hex: '#1d4ed8'},
  {value: 'blue-light', title: 'Blue light', hex: '#60a5fa'},
  {value: 'ink', title: 'Ink', hex: '#0f172a'},
  {value: 'ink-2', title: 'Ink 2', hex: '#1e293b'},
  {value: 'muted', title: 'Muted', hex: '#64748b'},
  {value: 'green', title: 'Green', hex: '#16a34a'},
  {value: 'border', title: 'Border gray', hex: '#e2e8f0'},
  {value: 'laravel', title: 'Laravel', hex: '#f05340'},
  {value: 'flutter', title: 'Flutter', hex: '#54c5f8'},
  {value: 'react', title: 'React', hex: '#61dafb'},
  {value: 'docker', title: 'Docker', hex: '#22c55e'},
  {value: 'api', title: 'API / violet', hex: '#a78bfa'},
]

export const TECH_CHIP_COLOR_HEX: Record<string, string> = Object.fromEntries(
  TECH_CHIP_COLOR_OPTIONS.map((o) => [o.value, o.hex]),
)

export function isValidTechChipColor(val: unknown): boolean {
  if (val === undefined || val === null || val === '') return true
  if (typeof val !== 'string') return false
  if (TECH_CHIP_COLOR_HEX[val]) return true
  return /^#[0-9A-Fa-f]{6}$/.test(val)
}
