import {defineType, defineField, defineArrayMember} from 'sanity'
import {CreditCardIcon} from '@sanity/icons'

export const pricingSection = defineType({
  name: 'pricingSection',
  title: 'Pricing Section',
  type: 'object',
  icon: CreditCardIcon,
  fields: [
    defineField({
      name: 'sectionLabel',
      title: 'Section Label',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'tiers',
      title: 'Pricing Tiers',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'price', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'period', type: 'string', description: 'e.g. "/month", "forever"'}),
            defineField({name: 'featured', type: 'boolean', initialValue: false}),
            defineField({name: 'badge', type: 'string', description: 'e.g. "Most Popular"'}),
            defineField({
              name: 'features',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'value',
                      type: 'string',
                      title: 'Feature',
                      validation: (rule) => rule.required(),
                    }),
                  ],
                  preview: {select: {title: 'value'}},
                }),
              ],
            }),
            defineField({
              name: 'cta',
              title: 'CTA Button',
              type: 'object',
              fields: [
                defineField({name: 'label', type: 'string'}),
                defineField({name: 'href', type: 'url', validation: (rule) => rule.uri({allowRelative: true})}),
              ],
            }),
          ],
          preview: {
            select: {title: 'name', subtitle: 'price'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Pricing Section', subtitle: 'Pricing'}
    },
  },
})
