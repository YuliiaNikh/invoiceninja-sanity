import {defineType, defineField} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons'

export const ctaBand = defineType({
  name: 'ctaBand',
  title: 'CTA Band',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'highlightedText',
      title: 'Highlighted Text',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        defineField({name: 'label', type: 'string'}),
        defineField({name: 'href', type: 'url', validation: (rule) => rule.uri({allowRelative: true})}),
      ],
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        defineField({name: 'label', type: 'string'}),
        defineField({name: 'href', type: 'url', validation: (rule) => rule.uri({allowRelative: true})}),
      ],
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Small text below the buttons',
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {list: ['default', 'hosted'], layout: 'radio'},
      initialValue: 'default',
    }),
  ],
  preview: {
    select: {title: 'headline'},
    prepare({title}) {
      return {title: title || 'CTA Band', subtitle: 'CTA Band'}
    },
  },
})
