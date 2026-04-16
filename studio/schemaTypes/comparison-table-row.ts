import {defineType, defineField, defineArrayMember} from 'sanity'

export const comparisonTableRow = defineType({
  name: 'comparisonTableRow',
  title: 'Table row',
  type: 'object',
  fields: [
    defineField({
      name: 'feature',
      title: 'Row label',
      type: 'string',
      description: 'First column (e.g. installer or product name).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cells',
      title: 'Cells',
      type: 'array',
      of: [defineArrayMember({type: 'comparisonCell'})],
      description: 'One cell per column header, in the same order as “Column headers” above.',
      validation: (rule) => rule.min(1).error('Add at least one cell'),
    }),
  ],
  preview: {
    select: {feature: 'feature', cells: 'cells'},
    prepare({feature, cells}) {
      const n = Array.isArray(cells) ? cells.length : 0
      return {
        title: feature || 'Row',
        subtitle: n ? `${n} cell${n === 1 ? '' : 's'}` : 'No cells',
      }
    },
  },
})
