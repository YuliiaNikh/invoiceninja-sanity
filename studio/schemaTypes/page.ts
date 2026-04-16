import {defineType, defineField, defineArrayMember} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      description:
        'Build the page from blocks. Use “Comparison table” for installer/feature matrix tables (e.g. auto-installers page).',
      of: [
        defineArrayMember({type: 'heroSection', title: 'Hero'}),
        defineArrayMember({type: 'statStrip', title: 'Stat strip'}),
        defineArrayMember({type: 'featureGrid', title: 'Feature grid'}),
        defineArrayMember({type: 'pricingSection', title: 'Pricing'}),
        defineArrayMember({type: 'faqSection', title: 'FAQ'}),
        defineArrayMember({type: 'cardGrid', title: 'Card grid'}),
        defineArrayMember({type: 'ctaBand', title: 'CTA band'}),
        defineArrayMember({type: 'comparisonTable', title: 'Comparison table'}),
        defineArrayMember({type: 'stepsSection', title: 'Steps'}),
        defineArrayMember({type: 'richTextSection', title: 'Rich text'}),
      ],
    }),
  ],
  preview: {
    select: {title: 'title', slug: 'slug.current'},
    prepare({title, slug}) {
      return {title, subtitle: `/${slug || ''}`}
    },
  },
})
