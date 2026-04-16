import {defineType, defineField, defineArrayMember} from 'sanity'
import {InlineIcon} from '@sanity/icons'

export const cardGrid = defineType({
  name: 'cardGrid',
  title: 'Card Grid',
  type: 'object',
  icon: InlineIcon,
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
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {list: ['light', 'dark'], layout: 'radio'},
      initialValue: 'light',
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          {title: 'Install', value: 'install'},
          {title: 'Partner', value: 'partner'},
          {title: 'Community', value: 'community'},
          {title: 'Integration', value: 'integration'},
          {title: 'Documentation', value: 'doc'},
        ],
      },
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'icon', type: 'string'}),
            defineField({name: 'name', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'description', type: 'text', rows: 2}),
            defineField({
              name: 'tags',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [defineField({name: 'value', type: 'string', title: 'Tag', validation: (rule) => rule.required()})],
                  preview: {select: {title: 'value'}},
                }),
              ],
            }),
            defineField({name: 'href', type: 'url', validation: (rule) => rule.uri({allowRelative: true})}),
            defineField({name: 'badge', type: 'string'}),
            defineField({name: 'featured', type: 'boolean', initialValue: false}),
          ],
          preview: {
            select: {title: 'name', subtitle: 'description'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title', variant: 'variant'},
    prepare({title, variant}) {
      return {title: title || 'Card Grid', subtitle: `Card Grid – ${variant || 'default'}`}
    },
  },
})
