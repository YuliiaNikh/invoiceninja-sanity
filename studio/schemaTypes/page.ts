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
      of: [
        defineArrayMember({type: 'heroSection'}),
        defineArrayMember({type: 'statStrip'}),
        defineArrayMember({type: 'featureGrid'}),
        defineArrayMember({type: 'pricingSection'}),
        defineArrayMember({type: 'faqSection'}),
        defineArrayMember({type: 'cardGrid'}),
        defineArrayMember({type: 'ctaBand'}),
        defineArrayMember({type: 'comparisonTable'}),
        defineArrayMember({type: 'stepsSection'}),
        defineArrayMember({type: 'richTextSection'}),
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
