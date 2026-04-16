import { cellsFromLegacyStrings } from '../utils/comparisonTableCells'

/** Mirrors html/auto-installers.html comparison table when not yet in Sanity. */
export const AUTO_INSTALLERS_COMPARISON_SECTION = {
  _key: 'fallback-comparison-auto-installers',
  _type: 'comparisonTable' as const,
  sectionLabel: 'Compare installers',
  title: 'Which installer is right for you?',
  subtitle: 'Different platforms suit different environments and technical comfort levels.',
  firstColumnLabel: 'Installer',
  columns: ['Best for', 'Auto-updates', 'SSL included', 'Backups', 'Technical level'],
  rows: [
    {
      _key: 'cr1',
      feature: 'Softaculous',
      cells: cellsFromLegacyStrings(['Shared hosting users', '✓', '—', '—', 'Beginner'], 'cr1'),
    },
    {
      _key: 'cr2',
      feature: 'Cloudron',
      cells: cellsFromLegacyStrings(['VPS owners who want managed apps', '✓', '✓', '✓', 'Intermediate'], 'cr2'),
    },
    {
      _key: 'cr3',
      feature: 'Elestio',
      cells: cellsFromLegacyStrings(['Teams wanting fully managed cloud', '✓', '✓', '✓', 'Beginner'], 'cr3'),
    },
    {
      _key: 'cr4',
      feature: 'Umbrel',
      cells: cellsFromLegacyStrings(['Home servers & personal clouds', '✓', '—', '—', 'Beginner'], 'cr4'),
    },
    {
      _key: 'cr5',
      feature: 'Installatron',
      cells: cellsFromLegacyStrings(['Multi-site managers on cPanel', '✓', '—', '—', 'Beginner'], 'cr5'),
    },
    {
      _key: 'cr6',
      feature: 'Hossted',
      cells: cellsFromLegacyStrings(['Cloud deployments (AWS, GCP, Azure)', '✓', '✓', '✓', 'Intermediate'], 'cr6'),
    },
    {
      _key: 'cr7',
      feature: 'Coolify',
      cells: cellsFromLegacyStrings(['Developers who want a self-hosted PaaS', '✓', '✓', '✓', 'Intermediate'], 'cr7'),
    },
    {
      _key: 'cr8',
      feature: 'Manual (Docker)',
      cells: cellsFromLegacyStrings(['Full control & custom setups', '—', '—', '—', 'Advanced'], 'cr8'),
    },
  ],
}
