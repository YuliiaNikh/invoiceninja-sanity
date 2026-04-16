import {defineType, defineField, defineArrayMember} from 'sanity'
import {ThListIcon} from '@sanity/icons'

export const featureGrid = defineType({
  name: 'featureGrid',
  title: 'Feature Grid',
  type: 'object',
  icon: ThListIcon,
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
      name: 'cards',
      title: 'Feature Cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'icon', type: 'string', description: 'Icon name or emoji'}),
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'body', type: 'text', rows: 3}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'body'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Feature Grid', subtitle: 'Feature Grid'}
    },
  },
})
