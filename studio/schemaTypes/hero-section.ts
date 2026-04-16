import {defineType, defineField, defineArrayMember} from 'sanity'
import {RocketIcon} from '@sanity/icons'

export const heroSection = defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'Small text above the headline (e.g. "Open-Source Invoicing")',
    }),
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
      description: 'Text that appears in a different color/style within the headline',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'ctas',
      title: 'Call to Action Buttons',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'href', type: 'url', validation: (rule) => rule.uri({allowRelative: true})}),
            defineField({
              name: 'variant',
              type: 'string',
              options: {list: ['primary', 'secondary', 'ghost'], layout: 'radio'},
              initialValue: 'primary',
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'variant'},
          },
        }),
      ],
      validation: (rule) => rule.max(3),
    }),
    defineField({
      name: 'techChips',
      title: 'Technology Chips',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'color', type: 'string', description: 'Tailwind color token (e.g. "laravel", "flutter")'}),
          ],
          preview: {
            select: {title: 'name'},
          },
        }),
      ],
    }),
    defineField({
      name: 'footnote',
      title: 'Footnote',
      type: 'string',
      description: 'Small text below the CTA buttons',
    }),
  ],
  preview: {
    select: {title: 'headline'},
    prepare({title}) {
      return {title: title || 'Hero Section', subtitle: 'Hero'}
    },
  },
})
