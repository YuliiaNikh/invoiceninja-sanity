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
      description: 'Small uppercase label above the heading (optional).',
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
      name: 'firstColumnLabel',
      title: 'First column header',
      type: 'string',
      description: 'Header for the first column (e.g. “Installer” or “Feature”).',
      initialValue: 'Feature',
    }),
    defineField({
      name: 'columns',
      title: 'Column headers',
      type: 'array',
      of: [defineArrayMember({type: 'string', title: 'Column name'})],
      description: 'One entry per data column (after the first / row-label column).',
      validation: (rule) => rule.min(1).error('Add at least one column header'),
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      description:
        'Add a row for each line in the table. Each row needs a label and one cell per column (Text, ✓, —, or ✗).',
      of: [defineArrayMember({type: 'comparisonTableRow'})],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Comparison Table', subtitle: 'Comparison table'}
    },
  },
})
