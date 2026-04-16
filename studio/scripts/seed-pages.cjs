'use strict'

/**
 * Seeds page documents from static HTML parity (see /html/*.html).
 * Requires SANITY_API_WRITE_TOKEN with write access to the dataset.
 *
 *   cd studio && npm run seed:pages
 *   (needs SANITY_API_WRITE_TOKEN)
 *
 * Or use your CLI login (no token file):
 *   cd studio && npm run seed:pages:cli
 */

const {createClient} = require('@sanity/client')

const PROJECT_ID = process.env.SANITY_STUDIO_API_PROJECT_ID || 'j3iufmh2'
const DATASET = process.env.SANITY_STUDIO_API_DATASET || 'production'

function blockP(text, blockKey) {
  return {
    _type: 'block',
    _key: blockKey,
    style: 'normal',
    markDefs: [],
    children: [{_type: 'span', _key: `${blockKey}-s0`, text, marks: []}],
  }
}

function faqItem(q, aText, key) {
  return {
    _key: key,
    question: q,
    answer: [blockP(aText, `${key}-a`)],
  }
}

/** FAQ answer with inline link (matches html/pricing.html hosted question). */
function faqItemHostedPricing(q, key) {
  const mk = `${key}-lnk`
  return {
    _key: key,
    question: q,
    answer: [
      {
        _type: 'block',
        _key: `${key}-a`,
        style: 'normal',
        markDefs: [{_type: 'link', _key: mk, href: 'https://invoiceninja.com'}],
        children: [
          {_type: 'span', _key: `${key}-s0`, text: 'Yes — ', marks: []},
          {_type: 'span', _key: `${key}-s1`, text: 'InvoiceNinja.com', marks: [mk]},
          {
            _type: 'span',
            _key: `${key}-s2`,
            text: ' offers a fully hosted, managed version starting with a free plan. No server management required. The hosted version has its own pricing plans starting from free.',
            marks: [],
          },
        ],
      },
    ],
  }
}

function feat(icon, title, body, key) {
  return {_key: key, icon, title, body}
}

function tag(value, key, tone) {
  const o = {_key: key, value}
  if (tone === 'green') o.tone = 'green'
  return o
}

function cardInstall(icon, name, description, href, key, extra = {}) {
  return {_key: key, icon, name, description, href, ...extra}
}

function cardPartner(name, description, href, tags, key) {
  return {_key: key, icon: '', name, description, href, tags}
}

function stat(value, label, key) {
  return {_key: key, value, label}
}

function priceFeature(text, key, display) {
  const o = {_key: key, value: text}
  if (display) o.display = display
  return o
}

function compareRow(feature, values, key) {
  const cells = values.map((v, i) => {
    const ck = `${key}-c${i}`
    const s = String(v)
    if (s === '✓') return {_type: 'comparisonCell', _key: ck, mode: 'check'}
    if (s === '—' || s === '-') return {_type: 'comparisonCell', _key: ck, mode: 'dash'}
    if (s === '✗') return {_type: 'comparisonCell', _key: ck, mode: 'cross'}
    return {_type: 'comparisonCell', _key: ck, mode: 'text', text: s}
  })
  return {_type: 'comparisonTableRow', _key: key, feature, cells}
}

function section(key, obj) {
  return {_key: key, ...obj}
}

function buildDocuments() {
  const pages = []

  // --- Home (index) ---
  pages.push({
    _id: 'page-index',
    _type: 'page',
    title: 'Home',
    slug: {_type: 'slug', current: 'index'},
    seo: {
      title: 'Invoice Ninja — Self-host community',
      description:
        'Free, source-code available invoicing software you can deploy on your own server. Full control over your data, your setup, and your stack.',
    },
    sections: [
      section('idx-hero', {
        _type: 'heroSection',
        label: 'Self-host community · Source-code available',
        labelIcon: '🖥️',
        headline: 'Your invoicing software.',
        highlightedText: 'Your server. Your data.',
        subtitle:
          'Invoice Ninja is free, source-code available invoicing software you can deploy on your own server. Full control over your data, your setup, and your stack.',
        ctas: [
          {_key: 'idx-hc1', label: '⬇ Download v5.13.17', href: 'https://github.com/invoiceninja/invoiceninja/releases/latest', variant: 'primary'},
          {_key: 'idx-hc2', label: 'Getting started →', href: '/getting-started', variant: 'ghost'},
        ],
        footnote: 'Free to self-host · Source code on GitHub · 9,660+ stars',
        techChips: [
          {_key: 'idx-t1', name: 'Laravel backend', color: 'laravel'},
          {_key: 'idx-t2', name: 'Flutter desktop & mobile', color: 'flutter'},
          {_key: 'idx-t3', name: 'React web app', color: 'react'},
          {_key: 'idx-t4', name: 'Docker ready', color: 'docker'},
          {_key: 'idx-t5', name: 'REST API', color: 'api'},
        ],
      }),
      section('idx-stats', {
        _type: 'statStrip',
        stats: [
          stat('9,660+', 'GitHub stars', 'idx-s1'),
          stat('v5.13.17', 'Latest release', 'idx-s2'),
          stat('200,000+', 'Businesses worldwide', 'idx-s3'),
          stat('10+ years', 'In active development', 'idx-s4'),
          stat('MIT / ELv2', 'License', 'idx-s5'),
        ],
      }),
      section('idx-why', {
        _type: 'featureGrid',
        sectionLabel: 'Why self-host?',
        title: 'Your business data belongs on your server',
        subtitle: 'Self-hosting Invoice Ninja gives you complete control that no cloud service can match.',
        theme: 'light',
        cards: [
          feat('🔐', 'Your data, your control', 'Your invoices, clients, and financial data live on your server — not ours. No third-party access, no data sharing, no vendor lock-in. Ever.', 'idx-w1'),
          feat('🔒', 'Privacy by design', 'Ideal for businesses in regulated industries, GDPR-conscious organizations, or anyone who takes data privacy seriously. Your server, your rules.', 'idx-w2'),
          feat('💰', 'No recurring SaaS fees', 'Pay once for hosting — no monthly subscription required. Self-hosting Invoice Ninja costs as little as your server bill, nothing more.', 'idx-w3'),
          feat('🔧', 'Full customization', 'Modify, extend, and integrate however your business needs. Access the full source code, build custom integrations, and adapt the platform to your workflow.', 'idx-w4'),
          feat('🌐', 'Works offline & on-premises', 'Run Invoice Ninja entirely within your internal network — no internet dependency required. Perfect for secure enterprise environments.', 'idx-w5'),
          feat('📈', 'Scale without limits', 'No client limits, no invoice caps, no feature paywalls. Self-hosted Invoice Ninja gives you the full platform with no artificial restrictions.', 'idx-w6'),
        ],
      }),
      section('idx-code', {
        _type: 'featureGrid',
        sectionLabel: 'Our codebases',
        title: 'Three purpose-built apps. One unified platform.',
        subtitle: 'Invoice Ninja is built on three separate codebases, each optimized for its use case.',
        theme: 'dark',
        cards: [
          {
            _key: 'idx-c1',
            icon: '⚡',
            title: 'Laravel Backend',
            body: 'The core API and server-side engine that powers everything — invoice logic, payments, user management, and data storage.',
            tags: ['PHP', 'Laravel', 'MySQL', 'REST API'],
            linkLabel: 'View on GitHub →',
            linkHref: 'https://github.com/invoiceninja/invoiceninja',
          },
          {
            _key: 'idx-c2',
            icon: '📱',
            title: 'Flutter App',
            body: 'The desktop and mobile client — a single codebase that runs natively on Windows, macOS, Linux, iOS, and Android.',
            tags: ['Flutter', 'Dart', 'iOS', 'Android', 'Desktop'],
            linkLabel: 'View on GitHub →',
            linkHref: 'https://github.com/invoiceninja/admin-portal',
          },
          {
            _key: 'idx-c3',
            icon: '🌐',
            title: 'React Web App',
            body: 'The browser-based web application — a full-featured React client for users who prefer to work directly in their browser.',
            tags: ['React', 'TypeScript', 'Web'],
            linkLabel: 'View on GitHub →',
            linkHref: 'https://github.com/invoiceninja/ui',
          },
        ],
        licenseTitle: 'Source-code available · Elastic License v2 (ELv2)',
        licenseBody: [
          {
            _type: 'block',
            _key: 'idx-lic1',
            style: 'normal',
            markDefs: [
              {_key: 'idx-emlnk', _type: 'link', href: 'https://www.elastic.co/licensing/elastic-license'},
            ],
            children: [
              {_type: 'span', _key: 'idx-lic1a', marks: [], text: 'Invoice Ninja is source-code available under the '},
              {_type: 'span', _key: 'idx-lic1b', marks: ['idx-emlnk'], text: 'Elastic License v2'},
              {
                _type: 'span',
                _key: 'idx-lic1c',
                marks: [],
                text: '. You are free to self-host, modify, and use Invoice Ninja for your own business. Commercial resale or offering it as a managed service to third parties requires a separate agreement. We moved from a traditional open-source license to protect the project from commercial exploitation while keeping the source code fully accessible to the self-host community.',
              },
            ],
          },
        ],
      }),
      section('idx-install', {
        _type: 'cardGrid',
        sectionLabel: 'Installation options',
        title: 'Multiple ways to get up and running',
        subtitle: 'Whether you prefer a manual install, Docker, or a one-click auto-installer — we have you covered.',
        theme: 'light',
        variant: 'install',
        columnsDesktop: '4',
        cards: [
          cardInstall('📦', 'Download .tar', 'Manual installation from the release archive. Full control over your setup.', 'https://invoiceninja.github.io/en/installation/', 'idx-i1'),
          cardInstall('🐳', 'Docker', 'Deploy with Docker Compose. Recommended for most self-hosters.', 'https://hub.docker.com/r/invoiceninja/invoiceninja', 'idx-i2'),
          cardInstall('⚡', 'Softaculous', 'One-click install through your hosting control panel. No command line needed.', 'https://www.softaculous.com/apps/ecommerce/Invoice_Ninja', 'idx-i3'),
          cardInstall('🐧', 'Ubuntu + Nginx', 'Step-by-step guide for Ubuntu servers with Nginx as the web server.', 'https://invoiceninja.github.io/en/self-host-installation/#ubuntu-nginx', 'idx-i4'),
          cardInstall('🎩', 'CentOS + Nginx', 'Installation guide for CentOS / RHEL environments with Nginx.', 'https://invoiceninja.github.io/en/self-host-installation/#centos-nginx', 'idx-i5'),
          cardInstall('☁️', 'Cloudron', 'Self-hosted app platform. Handles installs, updates, and backups automatically.', 'https://www.cloudron.io/store/com.invoiceninja.cloudronapp.html', 'idx-i6'),
          cardInstall('🚀', 'Auto-installers', 'Elestio, Coolify, Umbrel, Installatron and more. See all options →', '/getting-started', 'idx-i7', {featured: true}),
          cardInstall('📖', 'Full documentation', 'Complete installation and configuration docs for all environments.', 'https://invoiceninja.github.io/', 'idx-i8'),
        ],
      }),
      section('idx-int', {
        _type: 'cardGrid',
        sectionLabel: 'Integrations & automations',
        title: 'Connect Invoice Ninja to your entire stack',
        subtitle: 'Use any of these automation platforms to integrate self-hosted Invoice Ninja with hundreds of other apps — no code required.',
        theme: 'light',
        variant: 'integration',
        band: 'none',
        columnsDesktop: '4',
        footerNote: [
          {
            _type: 'block',
            _key: 'idx-fn1',
            style: 'normal',
            markDefs: [
              {_key: 'idx-api', _type: 'link', href: 'https://invoiceninja.github.io/en/api-documentation/'},
              {_key: 'idx-wh', _type: 'link', href: 'https://invoiceninja.github.io/en/api-documentation/#webhooks'},
            ],
            children: [
              {_type: 'span', _key: 'idx-fna', marks: [], text: 'Also available: '},
              {_type: 'span', _key: 'idx-fnb', marks: ['idx-api'], text: 'REST API'},
              {_type: 'span', _key: 'idx-fnc', marks: [], text: ' & '},
              {_type: 'span', _key: 'idx-fnd', marks: ['idx-wh'], text: 'Webhooks'},
              {_type: 'span', _key: 'idx-fne', marks: [], text: ' for custom integrations.'},
            ],
          },
        ],
        cards: [
          {_key: 'idx-n1', icon: '⚡', name: 'Zapier', description: 'Connect to 5,000+ apps', href: 'https://zapier.com/apps/invoice-ninja/integrations'},
          {_key: 'idx-n2', icon: '🔄', name: 'Make', description: 'Visual workflow automation', href: 'https://www.make.com/en/integrations/invoice-ninja'},
          {_key: 'idx-n3', icon: '🔀', name: 'n8n', description: 'Self-hostable automation', href: 'https://n8n.io/integrations/invoice-ninja/'},
          {_key: 'idx-n4', icon: '🔗', name: 'Integrately', description: '1,000+ ready automations', href: 'https://integrately.com/integrations/invoice-ninja'},
          {_key: 'idx-n5', icon: '🔌', name: 'Pabbly', description: '750+ app connections', href: 'https://pabbly.com/connect/integrations/invoice-ninja/'},
          {_key: 'idx-n6', icon: '🛠️', name: 'Pipedream', description: 'Code-level API automation', href: 'https://pipedream.com/apps/invoice-ninja'},
          {_key: 'idx-n7', icon: '🤖', name: 'OttoKit', description: '890+ app integrations', href: 'https://ottokit.com'},
          {_key: 'idx-n8', icon: '📊', name: 'Boost.space', description: 'Centralize your business data', href: 'https://boost.space'},
        ],
      }),
      section('idx-docs', {
        _type: 'cardGrid',
        sectionLabel: 'Documentation & support',
        title: 'Everything you need to succeed',
        subtitle: 'From installation guides to API references — the self-host community has you covered.',
        theme: 'light',
        variant: 'doc',
        columnsDesktop: '3',
        cards: [
          {_key: 'idx-d1', icon: '📖', name: 'User Guide', description: 'Complete documentation covering installation, configuration, and all features of Invoice Ninja v5.', href: 'https://invoiceninja.github.io/', linkLabel: 'Read the docs →'},
          {_key: 'idx-d2', icon: '⚙️', name: 'API Documentation', description: 'Full REST API reference. Authenticate, query, and manage every aspect of Invoice Ninja programmatically.', href: 'https://api-docs.invoicing.co/', linkLabel: 'Explore the API →'},
          {_key: 'idx-d3', icon: '💬', name: 'Support Forum', description: 'Join thousands of Invoice Ninja users and developers. Ask questions, share solutions, and get help.', href: 'https://forum.invoiceninja.com/', linkLabel: 'Visit the forum →'},
          {_key: 'idx-d4', icon: '🐙', name: 'GitHub', description: 'Source code, releases, issue tracker, and contribution guidelines. Star us to stay up to date.', href: 'https://github.com/invoiceninja/invoiceninja', linkLabel: 'View on GitHub →'},
          {_key: 'idx-d5', icon: '🐛', name: 'Feature requests & bugs', description: 'Report bugs or request features directly on GitHub. Our team actively reviews and responds to issues.', href: 'https://github.com/invoiceninja/invoiceninja/issues', linkLabel: 'Open an issue →'},
          {_key: 'idx-d6', icon: '📁', name: 'Legacy v4 docs', description: 'Still running Invoice Ninja v4? The legacy documentation is preserved here for reference.', href: 'https://invoiceninja.github.io/en/v4/', linkLabel: 'View v4 docs →'},
        ],
      }),
      section('idx-hosted', {
        _type: 'ctaBand',
        variant: 'hosted',
        headline: 'Prefer a fully hosted solution?',
        body: "If you'd rather not manage your own server, InvoiceNinja.com offers a fully hosted, managed version of the same great software — with automatic updates, 99.9% uptime, and a free plan to get started.",
        secondaryCta: {label: 'Learn more', href: 'https://invoiceninja.com'},
        primaryCta: {label: 'Try hosted free →', href: 'https://app.invoicing.co/#/register'},
      }),
      section('idx-cta', {
        _type: 'ctaBand',
        variant: 'default',
        headline: 'Ready to self-host',
        highlightedText: 'Invoice Ninja?',
        body: 'Free to download. Source-code available. Your server, your data.',
        primaryCta: {label: '⬇ Download v5.13.17', href: 'https://github.com/invoiceninja/invoiceninja/releases/latest'},
        secondaryCta: {label: 'Getting Started →', href: '/getting-started'},
        caption: 'Free to self-host · Elastic License v2 · 9,660+ GitHub stars',
      }),
    ],
  })

  // --- Pricing ---
  pages.push({
    _id: 'page-pricing',
    _type: 'page',
    title: 'Pricing',
    slug: {_type: 'slug', current: 'pricing'},
    seo: {
      title: 'Pricing – Invoice Ninja Self-Hosting',
      description:
        'Invoice Ninja is free to self-host with all features included. Optional White Label license available for $40/year to remove Invoice Ninja branding from client-facing pages.',
    },
    sections: [
      section('pr-hero', {
        _type: 'heroSection',
        label: 'Pricing',
        headline: 'Self-hosting is',
        highlightedText: 'free.',
        headlineLine2: 'Always.',
        subtitle:
          'Every feature. No client limits. No invoice caps. No paywalls. One optional paid add-on for those who want a fully white-labeled experience.',
      }),
      section('pr-price', {
        _type: 'pricingSection',
        comparisonNote:
          'Both plans include every feature. The only difference is whether Invoice Ninja branding appears on client-facing pages.',
        tiers: [
          {
            _key: 'pr-t1',
            tierLabel: 'Self-hosted',
            name: 'Free',
            price: '$0',
            period: 'Free forever · no credit card',
            featured: false,
            features: [
              priceFeature('All features unlocked — no limits', 'pr-f1'),
              priceFeature('Unlimited clients & invoices', 'pr-f2'),
              priceFeature('Unlimited users', 'pr-f3'),
              priceFeature('All payment gateway integrations', 'pr-f4'),
              priceFeature('Recurring invoices & auto-billing', 'pr-f5'),
              priceFeature('Time tracking & projects', 'pr-f6'),
              priceFeature('Expenses, vendors & POs', 'pr-f7'),
              priceFeature('REST API & webhooks', 'pr-f8'),
              priceFeature('Client portal', 'pr-f9'),
              priceFeature('All invoice template designs', 'pr-f10'),
              priceFeature(
                'Invoice Ninja branding visible on client-facing pages & PDF footers',
                'pr-f11',
                'dash',
              ),
            ],
            cta: {label: '⬇ Download Free', href: 'https://github.com/invoiceninja/invoiceninja/releases/latest'},
          },
          {
            _key: 'pr-t2',
            tierLabel: 'Self-hosted add-on',
            name: 'White Label',
            price: '$40',
            period: 'per year · auto-renews annually',
            featured: true,
            badge: 'Optional add-on',
            features: [
              priceFeature('**Everything in Free, plus:**', 'pr-w0'),
              priceFeature('Invoice Ninja logo removed from invoice PDF footers', 'pr-w1'),
              priceFeature('Invoice Ninja branding removed from all client-facing pages', 'pr-w2'),
              priceFeature('Client portal fully branded as your business', 'pr-w3'),
              priceFeature('All client-facing emails — your brand only', 'pr-w4'),
              priceFeature(
                'Note: Admin-facing app UI is not affected by the White Label license — this applies to client-facing pages only.',
                'pr-w5',
                'footnote',
              ),
            ],
            cta: {label: 'Purchase White Label — $40/yr →', href: 'https://invoiceninja.invoiceninja.com/client/subscriptions/WJxboqNegE/purchase'},
          },
        ],
      }),
      section('pr-remove', {
        _type: 'featureGrid',
        sectionLabel: 'White Label',
        title: 'What the White Label license removes',
        subtitle:
          'The White Label license removes Invoice Ninja branding from every page your clients see — so your business is the only brand they experience.',
        theme: 'surface',
        cards: [
          feat('📄', 'Invoice PDF footer', 'The "Invoice Ninja" link in the footer of every generated PDF invoice is removed. Your invoice, your brand — nothing else.', 'pr-r1'),
          feat('🌐', 'Client portal', 'The client portal — where clients view invoices, make payments, and download documents — shows only your branding.', 'pr-r2'),
          feat('✅', 'Quote & approval pages', 'Quote approval and e-signature pages presented to clients are fully branded as your business.', 'pr-r3'),
          feat('💳', 'Payment pages', 'The payment checkout experience your clients see when paying an invoice shows only your brand.', 'pr-r4'),
          feat('📧', 'Client-facing emails', 'Invoice, quote, reminder, and receipt emails sent to your clients are branded exclusively as your business.', 'pr-r5'),
          feat('🔒', 'What is NOT affected', 'The admin-facing application — your own Invoice Ninja dashboard — is not affected. The White Label license applies to client-facing pages only.', 'pr-r6'),
        ],
      }),
      section('pr-faq', {
        _type: 'faqSection',
        sectionLabel: 'FAQ',
        title: 'Common questions about pricing',
        layout: 'grid',
        items: [
          faqItem(
            'Is self-hosting really completely free?',
            "Yes — 100% free with no hidden costs, no feature paywalls, and no client or invoice limits. You pay only for your own hosting server. Invoice Ninja's self-hosted version includes every feature with no restrictions.",
            'pr-q1',
          ),
          faqItem(
            'What does "client-facing" mean exactly?',
            'Client-facing pages are any pages or documents your clients see — invoice PDFs, the client portal, payment pages, quote approval pages, and emails sent to clients. The White Label license removes Invoice Ninja branding from all of these.',
            'pr-q2',
          ),
          faqItem(
            'Does the White Label license add any features?',
            'No — the White Label license does not add any features. Every feature is already included in the free self-hosted version. The license only removes Invoice Ninja branding from client-facing pages.',
            'pr-q3',
          ),
          faqItem(
            'How does the auto-renewal work?',
            'The White Label license is $40/year and renews automatically each year. You can cancel auto-renewal at any time. If you cancel, your White Label license remains active until the end of the current annual period.',
            'pr-q4',
          ),
          faqItem(
            'Is one White Label license per installation?',
            'Yes — the White Label license applies to a single self-hosted Invoice Ninja installation. If you run multiple separate installations, each requires its own license.',
            'pr-q5',
          ),
          faqItemHostedPricing('I prefer a fully hosted solution — is that available?', 'pr-q6'),
        ],
      }),
      section('pr-hosted', {
        _type: 'ctaBand',
        variant: 'hosted',
        headline: 'Prefer a fully hosted solution?',
        body: 'InvoiceNinja.com handles everything — hosting, updates, backups, and security. Free plan available. No server required.',
        secondaryCta: {label: 'See hosted pricing', href: 'https://invoiceninja.com/pricing-plans/'},
        primaryCta: {label: 'Try hosted free →', href: 'https://app.invoicing.co/#/register'},
      }),
      section('pr-cta', {
        _type: 'ctaBand',
        variant: 'default',
        headline: 'Ready to self-host',
        highlightedText: 'for free?',
        body: 'Download Invoice Ninja and get running in minutes. Every feature included.',
        primaryCta: {label: '⬇ Download Free', href: 'https://github.com/invoiceninja/invoiceninja/releases/latest'},
        secondaryCta: {label: 'Getting Started →', href: '/getting-started'},
        caption: 'Free forever · All features included · White Label $40/yr optional',
      }),
    ],
  })

  // --- Getting started ---
  pages.push({
    _id: 'page-getting-started',
    _type: 'page',
    title: 'Getting Started',
    slug: {_type: 'slug', current: 'getting-started'},
    seo: {
      title: 'Getting Started – Invoice Ninja Self-Hosting',
      description:
        'Step-by-step guide to self-hosting Invoice Ninja. Choose your installation method — Docker, Softaculous, manual install, or auto-installer.',
    },
    sections: [
      section('gs-hero', {
        _type: 'heroSection',
        label: 'Getting started',
        headline: 'Self-hosting Invoice Ninja',
        highlightedText: 'in minutes.',
        subtitle: 'Choose your installation method and follow the steps. Most setups take under 30 minutes.',
      }),
      section('gs-req', {
        _type: 'featureGrid',
        sectionLabel: 'Before you begin',
        title: 'Server requirements',
        subtitle: 'Make sure your server meets these requirements before installing.',
        theme: 'light',
        compactBottom: true,
        cards: [
          feat(
            '',
            'Software requirements',
            'PHP 8.1 or higher\nMySQL 5.7+ or MariaDB 10.3+\nNginx or Apache web server\nComposer (PHP package manager)\nNode.js & NPM (for asset compilation)\nSSL certificate (recommended)',
            'gs-r1',
          ),
          feat(
            '',
            'Minimum server specs',
            '1 GB RAM (2 GB recommended)\n1 vCPU core\n20 GB storage\nUbuntu 20.04+ or CentOS 8+\nPHP extensions: BCMath, Ctype, Fileinfo, JSON, Mbstring, OpenSSL, PDO, Tokenizer, XML, GD',
            'gs-r2',
          ),
        ],
      }),
      section('gs-steps', {
        _type: 'stepsSection',
        sectionLabel: 'Installation steps',
        title: 'Pick your installation method',
        subtitle: 'Choose the approach that best fits your technical comfort level and hosting environment.',
        compactTop: true,
        steps: [
          {
            _key: 'gs-st1',
            number: 1,
            title: 'Download the release',
            body: 'Download the latest Invoice Ninja release from GitHub. We recommend the pre-built .tar archive for most installations — it includes all compiled assets.',
            chips: [
              {
                _key: 'gs-st1c1',
                value: '⬇ Download v5.13.17',
                href: 'https://github.com/invoiceninja/invoiceninja/releases/latest',
                variant: 'primary',
              },
              {_key: 'gs-st1c2', value: 'All releases →', href: 'https://github.com/invoiceninja/invoiceninja/releases'},
              {_key: 'gs-st1c3', value: '🐳 Docker image →', href: 'https://hub.docker.com/r/invoiceninja/invoiceninja'},
            ],
          },
          {
            _key: 'gs-st2',
            number: 2,
            title: 'Choose your installation guide',
            body: 'Follow the step-by-step guide for your server environment. Our documentation covers the most common setups.',
            chips: [
              {
                _key: 'gs-st2c1',
                value: '🐧 Ubuntu + Nginx',
                href: 'https://invoiceninja.github.io/en/self-host-installation/#ubuntu-nginx',
                variant: 'primary',
              },
              {
                _key: 'gs-st2c2',
                value: '🎩 CentOS + Nginx',
                href: 'https://invoiceninja.github.io/en/self-host-installation/#centos-nginx',
              },
              {
                _key: 'gs-st2c3',
                value: '🐳 Docker Compose',
                href: 'https://invoiceninja.github.io/en/self-host-installation/#docker',
              },
              {_key: 'gs-st2c4', value: '📖 Full docs', href: 'https://invoiceninja.github.io/en/installation/'},
            ],
          },
          {
            _key: 'gs-st3',
            number: 3,
            title: 'Configure your environment',
            body: 'Copy `.env.example` to `.env` and set your database credentials, app URL, and mail configuration. Run `php artisan key:generate` to generate your application key.',
            chips: [
              {
                _key: 'gs-st3c1',
                value: 'Configuration reference →',
                href: 'https://invoiceninja.github.io/en/self-host-configuration/',
              },
            ],
          },
          {
            _key: 'gs-st4',
            number: 4,
            title: 'Run the installer',
            body: 'Navigate to your domain in a browser — the Invoice Ninja web installer will guide you through the final setup steps including database migration and initial admin account creation.',
          },
          {
            _key: 'gs-st5',
            number: 5,
            title: 'Set up the cron job',
            body: 'Add the Laravel scheduler to your crontab to enable recurring invoices, payment reminders, and other automated tasks.',
            codeSnippet: '* * * * * cd /path/to/invoiceninja && php artisan schedule:run >> /dev/null 2>&1',
          },
        ],
      }),
      section('gs-installers', {
        _type: 'cardGrid',
        sectionLabel: 'Auto-installers',
        title: 'Prefer a one-click install?',
        subtitle:
          'These platforms handle the technical setup for you — ideal if you want Invoice Ninja running without touching the command line.',
        theme: 'light',
        variant: 'install',
        columnsDesktop: '3',
        cards: [
          cardInstall('⚡', 'Softaculous', 'One-click install through cPanel or DirectAdmin. Available on most shared hosting plans.', 'https://www.softaculous.com/apps/ecommerce/Invoice_Ninja', 'gs-a1', {badge: 'Most popular'}),
          cardInstall('☂️', 'Umbrel', 'Self-hosted personal cloud. Browse the app store and install Invoice Ninja alongside other self-hosted apps.', 'https://umbrel.com/', 'gs-a2'),
          cardInstall('☁️', 'Cloudron', 'App platform for your server. Handles installation, updates, SSL, and backups automatically.', 'https://www.cloudron.io/store/com.invoiceninja.cloudronapp.html', 'gs-a3'),
          cardInstall('🚀', 'Elestio', 'Fully managed deployment in minutes. Includes configuration, encryption, backups, and live monitoring.', 'https://elestio.app/invoice-ninja', 'gs-a4', {badge: 'Managed'}),
          cardInstall('🔧', 'Installatron', 'One-click install and auto-update manager. Keeps your Invoice Ninja installation secure and up to date.', 'https://installatron.com/invoiceninja', 'gs-a5'),
          cardInstall('🏗️', 'Hossted', 'Deploy and maintain Invoice Ninja on your own cloud instantly, with managed infrastructure.', 'https://hossted.com', 'gs-a6'),
          cardInstall('❄️', 'Coolify', 'Open-source self-hostable Heroku/Vercel alternative. Deploy Invoice Ninja with superpowers.', 'https://coolify.io', 'gs-a7'),
        ],
      }),
      section('gs-cta', {
        _type: 'ctaBand',
        variant: 'default',
        headline: 'Need help getting started?',
        highlightedText: 'The community has you covered.',
        body: 'Join thousands of Invoice Ninja self-hosters on our forum and Slack.',
        primaryCta: {label: 'Visit the community →', href: '/community'},
        secondaryCta: {label: 'Read the docs', href: 'https://invoiceninja.github.io/'},
        caption: 'Forum · Slack · GitHub · API Docs',
      }),
    ],
  })

  // --- Community ---
  pages.push({
    _id: 'page-community',
    _type: 'page',
    title: 'Community',
    slug: {_type: 'slug', current: 'community'},
    seo: {
      title: 'Community — Invoice Ninja self-hosters',
      description:
        'Thousands of Invoice Ninja users and developers share knowledge, solve problems, and build together. Join the conversation.',
    },
    sections: [
      section('cm-hero', {
        _type: 'heroSection',
        label: 'Community',
        headline: 'The self-host community',
        highlightedText: 'is here to help.',
        subtitle: 'Thousands of Invoice Ninja users and developers share knowledge, solve problems, and build together. Join the conversation.',
      }),
      section('cm-channels', {
        _type: 'cardGrid',
        sectionLabel: 'Community channels',
        title: 'Find your people',
        subtitle: "Whether you prefer forums, chat, or code — there's a place for you in the Invoice Ninja community.",
        theme: 'light',
        variant: 'community',
        band: 'none',
        columnsDesktop: '2',
        cards: [
          {
            _key: 'cm-c1',
            icon: '💬',
            name: 'Support Forum',
            description:
              'The primary hub for Invoice Ninja self-hosters. Ask installation questions, share configurations, troubleshoot issues, and connect with thousands of experienced users and developers.',
            href: 'https://forum.invoiceninja.com/',
            featured: true,
            statItems: [
              {_key: 'cm-s1', value: '10,000+', label: 'Members'},
              {_key: 'cm-s2', value: 'Active', label: 'Daily'},
            ],
            linkLabel: 'Visit the forum →',
          },
          {
            _key: 'cm-c2',
            icon: '💼',
            name: 'Slack Community',
            description:
              'Real-time chat with over 5,000 Invoice Ninja members. Get quick answers, share tips, and stay up to date with the latest news from the Invoice Ninja team.',
            href: 'https://slack.invoiceninja.com/',
            linkLabel: 'Join on Slack →',
          },
          {
            _key: 'cm-c3',
            icon: '🐙',
            name: 'GitHub',
            description:
              'The source code home for Invoice Ninja. Browse the codebase, report bugs, request features, contribute code, and star us to stay up to date with releases.',
            href: 'https://github.com/invoiceninja/invoiceninja',
            statItems: [{_key: 'cm-s3', value: '⭐ 9,660+', label: 'stars'}],
            linkLabel: 'View on GitHub →',
          },
          {
            _key: 'cm-c4',
            icon: '🎮',
            name: 'Discord',
            description: 'Join the Invoice Ninja Discord server for community chat, developer discussions, and a more informal way to connect with other self-hosters.',
            href: 'https://discord.gg/invoiceninja',
            linkLabel: 'Join Discord →',
          },
        ],
      }),
      section('cm-contrib', {
        _type: 'featureGrid',
        sectionLabel: 'Contribute',
        title: 'Help make Invoice Ninja better',
        subtitle: 'Invoice Ninja is source-code available and built with community input. Here are the best ways to contribute.',
        theme: 'surface',
        columnsDesktop: '4',
        cards: [
          feat('🐛', 'Report a bug', 'Found something broken? Open a GitHub issue with steps to reproduce.', 'cm-g1'),
          feat('💡', 'Request a feature', 'Have an idea? Share it on GitHub Discussions or the community forum.', 'cm-g2'),
          feat('🌍', 'Translate', 'Help translate Invoice Ninja into your language via our Transifex project.', 'cm-g3'),
          feat('📖', 'Improve the docs', 'Documentation improvements are always welcome — submit a PR on GitHub.', 'cm-g4'),
        ],
        followLinks: [
          {_key: 'cm-fl1', label: 'Open an issue →', href: 'https://github.com/invoiceninja/invoiceninja/issues'},
          {_key: 'cm-fl2', label: 'Contributing guide →', href: 'https://github.com/invoiceninja/invoiceninja/blob/v5-stable/CONTRIBUTING.md'},
        ],
      }),
      section('cm-res', {
        _type: 'cardGrid',
        sectionLabel: 'Resources',
        title: 'Everything the community has built',
        theme: 'light',
        variant: 'doc',
        band: 'none',
        columnsDesktop: '3',
        cards: [
          {_key: 'cm-r1', icon: '📖', name: 'User guide', description: 'Complete documentation for installation, configuration, and all features.', href: 'https://invoiceninja.github.io/', hideDocLink: true},
          {_key: 'cm-r2', icon: '⚙️', name: 'API documentation', description: 'Full REST API reference for developers building integrations.', href: 'https://api-docs.invoicing.co/', hideDocLink: true},
          {_key: 'cm-r3', icon: '📁', name: 'Legacy v4 docs', description: 'Still running v4? The legacy documentation is preserved for reference.', href: 'https://invoiceninja.github.io/en/v4/', hideDocLink: true},
        ],
      }),
      section('cm-cta', {
        _type: 'ctaBand',
        variant: 'default',
        headline: 'Ready to join',
        highlightedText: 'the community?',
        body: '10,000+ self-hosters. Active forum. Daily Slack chat.',
        primaryCta: {label: 'Join the forum →', href: 'https://forum.invoiceninja.com/'},
        secondaryCta: {label: 'Join Slack', href: 'https://slack.invoiceninja.com/'},
        caption: 'Forum · Slack · GitHub · Discord',
      }),
    ],
  })

  // --- Hosting ---
  const partners = [
    ['FireMultimedia', 'Reliable and fast hosting with 1-click install for Invoice Ninja. Over 15 years providing hosting services for companies in the Netherlands and Belgium.', 'https://www.firemultimedia.nl/invoiceninja-hosting/', ['Netherlands', '1-click install', 'Shared hosting']],
    ['KnownHost', 'Trusted since 2006 for outstanding, fully managed web hosting. Offers Shared, Cloud, VPS, and Dedicated hosting with proven best uptime.', 'https://www.knownhost.com/invoiceninja-hosting.html', ['Managed hosting', 'VPS', 'Dedicated', '24/7 support']],
    ['GlowHost', 'Nearly two decades of hosting experience. An in-house technical team with hundreds of years of combined expertise, available 24/7/365.', 'https://apps.glowhost.com/ecommerce/invoice-ninja', ['24/7 support', 'Shared', 'Cloud', 'VPS']],
    ['Cloud68.co', 'Reliable open-source digital infrastructure for solopreneurs, SMEs, and organizations. Human support from active FLOSS contributors.', 'https://cloud68.co/instances/invoiceninja', ['Open source focus', 'Managed Invoice Ninja', 'Privacy-first']],
    ['Hostripples', 'Great pricing with friendly 24×7 real support, top-level server security, and fastest network. Shared, Reseller, VPS and Dedicated servers.', 'https://hostripples.in/Invoice-Ninja-hosting.php', ['Budget-friendly', 'VPS', 'Dedicated', '24/7']],
    ['Rose Hosting', 'Popular with developers and industry professionals. Easily create cPanel logins per customer or website. Fully managed Linux hosting.', 'https://www.rosehosting.com/blog/how-to-install-invoice-ninja-on-debian-9/', ['Developer-friendly', 'Managed', 'Linux', 'cPanel']],
    ['Interserver', 'Optimized for Invoice Ninja. Built to serve freelancers and business owners with a complete suite of tools to advance your business.', 'https://www.interserver.net/apps/invoice_ninja-hosting.html', ['Optimized', 'VPS', 'Shared', 'Dedicated']],
    ['Kualo', "Invoice Ninja hosting plans with features you'll love, backed by fast 24/7 support and powered entirely by renewable energy.", 'https://www.kualo.com/webhosting/invoice-ninja-hosting', ['Green hosting', 'Renewable energy', '24/7 support']],
    ['AspirationHosting', 'Specializes in performance-based private cloud hosting for eCommerce. Custom infrastructure for high-end private cloud at an affordable price.', 'https://www.aspirationhosting.com/invoice-ninja', ['Private cloud', 'Performance', 'eCommerce']],
    ['AltusHost', 'Premium Business Web Hosting optimized for Invoice Ninja. Fast, secure, and reliable Cloud Hosting with data hosted in Europe.', 'https://www.altushost.com/invoice-ninja-hosting', ['European data', 'Business hosting', 'Cloud', 'GDPR-friendly']],
    ['Infiniroot', 'Fast and secure servers located in Switzerland. Data protected by strict Swiss privacy laws and dedicated server security management.', 'https://www.infiniroot.com/dedicated-hosting/invoiceninja-billing.php', ['Switzerland', 'Privacy-first', 'Managed', 'Security']],
    ['AccuWebHosting', 'Blazing-fast web hosting at the lowest cost. Working 16 years in 10+ regions worldwide with 24×7 enthusiastic technical support.', 'https://www.accuwebhosting.com/web-hosting/invoiceninja-hosting', ['Budget-friendly', 'Global', '24/7 support', '16 years']],
  ]

  pages.push({
    _id: 'page-hosting',
    _type: 'page',
    title: 'Hosting Partners',
    slug: {_type: 'slug', current: 'hosting'},
    seo: {
      title: 'Hosting partners — Invoice Ninja',
      description:
        'Recommended hosting providers for self-hosting Invoice Ninja. 13 vetted partners with shared, VPS, and managed hosting options.',
    },
    sections: [
      section('ho-hero', {
        _type: 'heroSection',
        label: 'Hosting partners',
        headline: 'Recommended hosting',
        highlightedText: 'for Invoice Ninja.',
        subtitle: 'All partners listed below offer environments compatible with Invoice Ninja self-hosting. Many offer 1-click installs or managed setups.',
      }),
      section('ho-grid', {
        _type: 'cardGrid',
        sectionLabel: 'Partner hosts',
        title: '13 trusted hosting providers',
        subtitle: 'All partners listed below offer environments compatible with Invoice Ninja self-hosting. Many offer 1-click installs or managed setups.',
        theme: 'light',
        variant: 'partner',
        band: 'none',
        columnsDesktop: '3',
        cards: partners.map(([name, description, href, tags], i) =>
          cardPartner(
            name,
            description,
            href,
            tags.map((t, j) => tag(t, `ho-p${i}-t${j}`)),
            `ho-p${i}`,
          ),
        ),
        disclaimer: [
          {
            _type: 'block',
            _key: 'ho-dis1',
            style: 'normal',
            markDefs: [{_key: 'ho-mail', _type: 'link', href: 'mailto:contact@invoiceninja.com'}],
            children: [
              {_type: 'span', _key: 'ho-d1a', marks: ['strong'], text: 'Note:'},
              {
                _type: 'span',
                _key: 'ho-d1b',
                marks: [],
                text: ' These hosting recommendations are provided as a community resource. Invoice Ninja LLC does not receive compensation for these listings and cannot guarantee the services of any third-party provider. Pricing and features may change — please verify directly with each host. To suggest an addition or correction, contact ',
              },
              {_type: 'span', _key: 'ho-d1c', marks: ['ho-mail'], text: 'contact@invoiceninja.com'},
              {_type: 'span', _key: 'ho-d1d', marks: [], text: '.'},
            ],
          },
        ],
      }),
      section('ho-tips', {
        _type: 'featureGrid',
        sectionLabel: 'What to look for',
        title: 'Choosing the right host for Invoice Ninja',
        subtitle: 'Not sure which host to pick? Here are the key things to check.',
        theme: 'surface',
        cards: [
          feat('⚙️', 'PHP 8.1+ support', 'Invoice Ninja v5 requires PHP 8.1 or higher. Confirm your host supports this before purchasing.', 'ho-t1'),
          feat('🗃️', 'MySQL or MariaDB', 'A MySQL 5.7+ or MariaDB 10.3+ database is required. Most hosting plans include this.', 'ho-t2'),
          feat('🔒', 'SSL certificate', "HTTPS is strongly recommended. Most hosts provide free Let's Encrypt SSL certificates.", 'ho-t3'),
          feat('🔄', 'Cron job access', 'Invoice Ninja requires cron job access for recurring invoices and automated reminders.', 'ho-t4'),
          feat('💾', 'At least 1 GB RAM', 'Shared hosting with 1 GB RAM works for small setups. VPS is recommended for teams or heavy usage.', 'ho-t5'),
          feat('📍', 'Data location', 'For GDPR compliance or data sovereignty requirements, choose a host with servers in your region.', 'ho-t6'),
        ],
      }),
      section('ho-cta', {
        _type: 'ctaBand',
        variant: 'default',
        headline: 'Ready to get',
        highlightedText: 'Invoice Ninja running?',
        body: 'Follow our step-by-step guide to get up and running in minutes.',
        primaryCta: {label: 'Getting Started →', href: '/getting-started'},
        secondaryCta: {label: '⬇ Download v5.13.17', href: 'https://github.com/invoiceninja/invoiceninja/releases/latest'},
        caption: 'Free to self-host · Elastic License v2',
      }),
    ],
  })

  // --- Auto-installers ---
  pages.push({
    _id: 'page-auto-installers',
    _type: 'page',
    title: 'Auto-Installers',
    slug: {_type: 'slug', current: 'auto-installers'},
    seo: {
      title: 'Auto-Installers – Invoice Ninja Self-Hosting',
      description:
        'Install Invoice Ninja on your server without touching the command line. One-click auto-installers including Softaculous, Cloudron, Elestio, Coolify, Umbrel, and more.',
    },
    sections: [
      section('ai-hero', {
        _type: 'heroSection',
        label: 'Auto-installers',
        headline: 'Install Invoice Ninja',
        highlightedText: 'without the command line.',
        subtitle:
          'These platforms automate the entire setup process — no SSH, no config files, no manual steps. Invoice Ninja running in minutes.',
      }),
      section('ai-grid', {
        _type: 'cardGrid',
        sectionLabel: 'One-click installers',
        title: '7 platforms that do the heavy lifting',
        subtitle:
          "Whether you're running shared hosting, a VPS, a home server, or a cloud instance — there's an auto-installer that fits your environment.",
        theme: 'light',
        variant: 'installer',
        columnsDesktop: '3',
        cards: [
          {
            _key: 'ai-1',
            icon: '⚡',
            name: 'Softaculous',
            eyebrow: 'Shared hosting · cPanel · DirectAdmin',
            description:
              'The most widely used one-click installer in web hosting. Available in cPanel and DirectAdmin on most shared hosting plans — install Invoice Ninja without touching a single config file.',
            href: 'https://www.softaculous.com/apps/ecommerce/Invoice_Ninja',
            featured: true,
            badge: 'Most popular',
            linkLabel: 'Install via Softaculous →',
            tags: [
              tag('One-click', 'ai-1a', 'green'),
              tag('cPanel', 'ai-1b'),
              tag('DirectAdmin', 'ai-1c'),
              tag('Auto-updates', 'ai-1d'),
              tag('Shared hosting', 'ai-1e'),
            ],
          },
          {
            _key: 'ai-2',
            icon: '☁️',
            name: 'Cloudron',
            eyebrow: 'Self-hosted app platform · VPS',
            description:
              'Cloudron is a self-hosted app platform for your own VPS. It handles installation, updates, SSL certificates, backups, and monitoring — so you get the control of self-hosting without the maintenance overhead.',
            href: 'https://www.cloudron.io/store/com.invoiceninja.cloudronapp.html',
            linkLabel: 'Install via Cloudron →',
            tags: [tag('Managed updates', 'ai-2a', 'green'), tag('SSL included', 'ai-2b'), tag('Backups', 'ai-2c'), tag('VPS', 'ai-2d')],
          },
          {
            _key: 'ai-3',
            icon: '🚀',
            name: 'Elestio',
            eyebrow: 'Fully managed cloud deployment',
            description:
              'Deploy a fully managed Invoice Ninja instance on Elestio in minutes. Elestio takes care of installation, configuration, encryption, backups, and live monitoring — ideal for teams who want self-hosting without DevOps.',
            href: 'https://elestio.app/invoice-ninja',
            linkLabel: 'Deploy on Elestio →',
            tags: [tag('Fully managed', 'ai-3a', 'green'), tag('Cloud', 'ai-3b'), tag('Live monitoring', 'ai-3c'), tag('Backups', 'ai-3d')],
          },
          {
            _key: 'ai-4',
            icon: '☂️',
            name: 'Umbrel',
            eyebrow: 'Home server · Personal cloud',
            description:
              'Umbrel turns your home server or Raspberry Pi into a personal cloud. Browse the Umbrel App Store and install Invoice Ninja alongside other self-hosted apps like Nextcloud, Bitwarden, and more.',
            href: 'https://umbrel.com/',
            linkLabel: 'Install via Umbrel →',
            tags: [tag('App store', 'ai-4a', 'green'), tag('Home server', 'ai-4b'), tag('Raspberry Pi', 'ai-4c'), tag('Privacy-first', 'ai-4d')],
          },
          {
            _key: 'ai-5',
            icon: '🔧',
            name: 'Installatron',
            eyebrow: 'Auto-install & update manager',
            description:
              'Installatron Remote is a one-click solution to install and manage all of your Invoice Ninja websites. It automatically keeps Invoice Ninja up to date and secure with minimal effort on your part.',
            href: 'https://installatron.com/invoiceninja',
            linkLabel: 'Install via Installatron →',
            tags: [tag('Auto-updates', 'ai-5a', 'green'), tag('One-click', 'ai-5b'), tag('Multi-site', 'ai-5c'), tag('cPanel', 'ai-5d')],
          },
          {
            _key: 'ai-6',
            icon: '🏗️',
            name: 'Hossted',
            eyebrow: 'Managed deployment · Any cloud',
            description:
              "Deploy Invoice Ninja instantly on your own cloud with Hossted's deployment and maintenance platform. Run open-source applications on AWS, GCP, Azure, or any provider — with ongoing managed maintenance.",
            href: 'https://hossted.com',
            linkLabel: 'Deploy via Hossted →',
            tags: [tag('Any cloud provider', 'ai-6a', 'green'), tag('AWS', 'ai-6b'), tag('GCP', 'ai-6c'), tag('Managed', 'ai-6d')],
          },
          {
            _key: 'ai-7',
            icon: '❄️',
            name: 'Coolify',
            eyebrow: 'Self-hostable PaaS · VPS',
            description:
              'Coolify is an open-source, self-hostable alternative to Heroku and Vercel. Run it on your own VPS and use it to deploy Invoice Ninja (and other apps) with a simple, powerful interface — no complex Docker knowledge required.',
            href: 'https://coolify.io',
            linkLabel: 'Deploy via Coolify →',
            tags: [tag('Open source', 'ai-7a', 'green'), tag('Self-hostable', 'ai-7b'), tag('VPS', 'ai-7c'), tag('Docker', 'ai-7d')],
          },
        ],
      }),
      section('ai-manual', {
        _type: 'richTextSection',
        layout: 'calloutStrip',
        title: 'Prefer a manual installation?',
        body: [
          blockP(
            'If you want full control over every step — or need a custom server setup — follow our manual installation guides for Ubuntu + Nginx, CentOS + Nginx, or Docker Compose.',
            'ai-m1',
          ),
        ],
        calloutCta: {
          label: 'View manual install guides →',
          href: '/getting-started',
        },
      }),
      section('ai-cmp', {
        _type: 'comparisonTable',
        sectionLabel: 'Compare installers',
        title: 'Which installer is right for you?',
        subtitle: 'Different platforms suit different environments and technical comfort levels.',
        firstColumnLabel: 'Installer',
        columns: ['Best for', 'Auto-updates', 'SSL included', 'Backups', 'Technical level'],
        rows: [
          compareRow('Softaculous', ['Shared hosting users', '✓', '—', '—', 'Beginner'], 'ai-r1'),
          compareRow('Cloudron', ['VPS owners who want managed apps', '✓', '✓', '✓', 'Intermediate'], 'ai-r2'),
          compareRow('Elestio', ['Teams wanting fully managed cloud', '✓', '✓', '✓', 'Beginner'], 'ai-r3'),
          compareRow('Umbrel', ['Home servers & personal clouds', '✓', '—', '—', 'Beginner'], 'ai-r4'),
          compareRow('Installatron', ['Multi-site managers on cPanel', '✓', '—', '—', 'Beginner'], 'ai-r5'),
          compareRow('Hossted', ['Cloud deployments (AWS, GCP, Azure)', '✓', '✓', '✓', 'Intermediate'], 'ai-r6'),
          compareRow('Coolify', ['Developers who want a self-hosted PaaS', '✓', '✓', '✓', 'Intermediate'], 'ai-r7'),
          compareRow('Manual (Docker)', ['Full control & custom setups', '—', '—', '—', 'Advanced'], 'ai-r8'),
        ],
      }),
      section('ai-cta', {
        _type: 'ctaBand',
        variant: 'default',
        headline: 'Need help after',
        highlightedText: 'installing?',
        body: 'The Invoice Ninja self-host community is here — forum, Slack, and GitHub.',
        primaryCta: {label: 'Visit the community →', href: '/community'},
        secondaryCta: {label: 'Read the docs', href: 'https://invoiceninja.github.io/'},
        caption: 'Forum · Slack · GitHub · API Docs',
      }),
    ],
  })

  return pages
}

async function main() {
  const token = process.env.SANITY_API_WRITE_TOKEN
  if (!token) {
    console.error('Missing SANITY_API_WRITE_TOKEN (needs create/write on the dataset).')
    process.exit(1)
  }

  const client = createClient({projectId: PROJECT_ID, dataset: DATASET, apiVersion: '2024-01-01', token, useCdn: false})

  const docs = buildDocuments()
  for (const doc of docs) {
    await client.createOrReplace(doc)
    console.log('Upserted', doc._id, doc.slug?.current || doc.slug)
  }
  console.log(`Done. ${docs.length} pages.`)
}

module.exports = { buildDocuments }

if (require.main === module) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
