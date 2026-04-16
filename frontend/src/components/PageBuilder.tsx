import { HeroSection } from './sections/HeroSection'
import { StatStrip } from './sections/StatStrip'
import { FeatureGrid } from './sections/FeatureGrid'
import { PricingSection } from './sections/PricingSection'
import { FaqSection } from './sections/FaqSection'
import { CardGrid } from './sections/CardGrid'
import { CtaBand } from './sections/CtaBand'
import { ComparisonTable } from './sections/ComparisonTable'
import { StepsSection } from './sections/StepsSection'
import { RichTextSection } from './sections/RichTextSection'

/* eslint-disable @typescript-eslint/no-explicit-any */
const sectionComponents: Record<string, React.ComponentType<any>> = {
  heroSection: HeroSection,
  statStrip: StatStrip,
  featureGrid: FeatureGrid,
  pricingSection: PricingSection,
  faqSection: FaqSection,
  cardGrid: CardGrid,
  ctaBand: CtaBand,
  comparisonTable: ComparisonTable,
  stepsSection: StepsSection,
  richTextSection: RichTextSection,
}

interface Section {
  _key: string
  _type: string
  [key: string]: unknown
}

export function PageBuilder({ sections }: { sections?: Section[] }) {
  if (!sections?.length) return null

  return (
    <>
      {sections.map((section) => {
        const Component = sectionComponents[section._type]
        if (!Component) {
          console.warn(`Unknown section type: ${section._type}`)
          return null
        }
        return <Component key={section._key} {...section} />
      })}
    </>
  )
}
