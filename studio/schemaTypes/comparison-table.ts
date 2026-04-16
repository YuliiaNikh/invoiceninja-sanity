import {defineType, defineField, defineArrayMember} from 'sanity'
import {MenuIcon} from '@sanity/icons'

export const comparisonTable = defineType({
  name: 'comparisonTable',
  title: 'Comparison Table',
  type: 'object',
  icon: MenuIcon,
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
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Column headers for the table',
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'feature', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'values',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
              description: 'One value per column (use "✓", "✗", or text)',
            }),
          ],
          preview: {
            select: {title: 'feature'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Comparison Table', subtitle: 'Comparison Table'}
    },
  },
})
