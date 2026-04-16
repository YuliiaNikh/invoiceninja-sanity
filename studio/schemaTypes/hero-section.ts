import {defineType, defineField, defineArrayMember} from 'sanity'
import {RocketIcon} from '@sanity/icons'

import {TechChipColorInput} from '../components/TechChipColorInput'
import {isValidTechChipColor} from '../constants/techChipColors'

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
      name: 'labelIcon',
      title: 'Label icon (emoji)',
      type: 'string',
      description:
        'Optional emoji shown in a circle before the label (e.g. home hero). Leave empty for inner pages that use a text-only pill.',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description:
        'First part of the hero title only (e.g. “Your invoicing software.”). Do not repeat the highlighted line here—that goes in Highlighted Text.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'highlightedText',
      title: 'Highlighted Text',
      type: 'string',
      description:
        'Accent-colored phrase. On inner pages it appears after the headline on the same line unless “Second headline line” is set (then it is inline before the line break). If duplicated inside Headline, it is shown once.',
    }),
    defineField({
      name: 'headlineLine2',
      title: 'Second headline line',
      type: 'string',
      description:
        'Optional second line below the title (e.g. pricing.html: “Always.” after “Self-hosting is free.”). When set, Highlighted Text stays on the first line next to the headline.',
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
            defineField({
              name: 'color',
              title: 'Color',
              type: 'string',
              description: 'Preset token or custom hex from the picker (stored as e.g. "blue" or "#2563eb").',
              components: {input: TechChipColorInput},
              validation: (rule) => rule.custom((val) => (isValidTechChipColor(val) ? true : 'Invalid color')),
            }),
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
