/**
 * Copy from html/auto-installers.html — used when Sanity card fields are empty
 * so the live site matches the static reference.
 */
export type InstallerTagDefault = { value: string; tone?: 'green' | 'default' }

type InstallerDefaults = {
  icon?: string
  eyebrow: string
  description: string
  linkLabel: string
  tags: InstallerTagDefault[]
}

const INSTALLER_HTML: Record<string, InstallerDefaults> = {
  softaculous: {
    icon: '⚡',
    eyebrow: 'Shared hosting · cPanel · DirectAdmin',
    description:
      'The most widely used one-click installer in web hosting. Available in cPanel and DirectAdmin on most shared hosting plans — install Invoice Ninja without touching a single config file.',
    linkLabel: 'Install via Softaculous →',
    tags: [
      { value: 'One-click', tone: 'green' },
      { value: 'cPanel' },
      { value: 'DirectAdmin' },
      { value: 'Auto-updates' },
      { value: 'Shared hosting' },
    ],
  },
  cloudron: {
    icon: '☁️',
    eyebrow: 'Self-hosted app platform · VPS',
    description:
      'Cloudron is a self-hosted app platform for your own VPS. It handles installation, updates, SSL certificates, backups, and monitoring — so you get the control of self-hosting without the maintenance overhead.',
    linkLabel: 'Install via Cloudron →',
    tags: [
      { value: 'Managed updates', tone: 'green' },
      { value: 'SSL included' },
      { value: 'Backups' },
      { value: 'VPS' },
    ],
  },
  elestio: {
    icon: '🚀',
    eyebrow: 'Fully managed cloud deployment',
    description:
      'Deploy a fully managed Invoice Ninja instance on Elestio in minutes. Elestio takes care of installation, configuration, encryption, backups, and live monitoring — ideal for teams who want self-hosting without DevOps.',
    linkLabel: 'Deploy on Elestio →',
    tags: [
      { value: 'Fully managed', tone: 'green' },
      { value: 'Cloud' },
      { value: 'Live monitoring' },
      { value: 'Backups' },
    ],
  },
  umbrel: {
    icon: '☂️',
    eyebrow: 'Home server · Personal cloud',
    description:
      'Umbrel turns your home server or Raspberry Pi into a personal cloud. Browse the Umbrel App Store and install Invoice Ninja alongside other self-hosted apps like Nextcloud, Bitwarden, and more.',
    linkLabel: 'Install via Umbrel →',
    tags: [
      { value: 'App store', tone: 'green' },
      { value: 'Home server' },
      { value: 'Raspberry Pi' },
      { value: 'Privacy-first' },
    ],
  },
  installatron: {
    icon: '🔧',
    eyebrow: 'Auto-install & update manager',
    description:
      'Installatron Remote is a one-click solution to install and manage all of your Invoice Ninja websites. It automatically keeps Invoice Ninja up to date and secure with minimal effort on your part.',
    linkLabel: 'Install via Installatron →',
    tags: [
      { value: 'Auto-updates', tone: 'green' },
      { value: 'One-click' },
      { value: 'Multi-site' },
      { value: 'cPanel' },
    ],
  },
  hossted: {
    icon: '🏗️',
    eyebrow: 'Managed deployment · Any cloud',
    description:
      "Deploy Invoice Ninja instantly on your own cloud with Hossted's deployment and maintenance platform. Run open-source applications on AWS, GCP, Azure, or any provider — with ongoing managed maintenance.",
    linkLabel: 'Deploy via Hossted →',
    tags: [
      { value: 'Any cloud provider', tone: 'green' },
      { value: 'AWS' },
      { value: 'GCP' },
      { value: 'Managed' },
    ],
  },
  coolify: {
    icon: '❄️',
    eyebrow: 'Self-hostable PaaS · VPS',
    description:
      'Coolify is an open-source, self-hostable alternative to Heroku and Vercel. Run it on your own VPS and use it to deploy Invoice Ninja (and other apps) with a simple, powerful interface — no complex Docker knowledge required.',
    linkLabel: 'Deploy via Coolify →',
    tags: [
      { value: 'Open source', tone: 'green' },
      { value: 'Self-hostable' },
      { value: 'VPS' },
      { value: 'Docker' },
    ],
  },
}

export type InstallerCardDefaults = Partial<InstallerDefaults> & { tags?: InstallerTagDefault[] }

export function installerCardDefaults(name: string): InstallerCardDefaults {
  const row = INSTALLER_HTML[name.trim().toLowerCase()]
  if (!row) return {}
  return {
    icon: row.icon,
    eyebrow: row.eyebrow,
    description: row.description,
    linkLabel: row.linkLabel,
    tags: row.tags,
  }
}
