import {defineType, defineField} from 'sanity'

const cellModes = [
  {title: 'Text', value: 'text'},
  {title: '✓ Included', value: 'check'},
  {title: '— Not included', value: 'dash'},
  {title: '✗ No', value: 'cross'},
]

export const comparisonCell = defineType({
  name: 'comparisonCell',
  title: 'Cell',
  type: 'object',
  fields: [
    defineField({
      name: 'mode',
      title: 'Cell type',
      type: 'string',
      options: {
        list: cellModes,
        layout: 'radio',
      },
      initialValue: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'string',
      description: 'Required when cell type is “Text”.',
      hidden: ({parent}) => parent?.mode !== 'text',
      validation: (rule) =>
        rule.custom((value, context) => {
          const mode = (context.parent as {mode?: string} | undefined)?.mode
          if (mode === 'text' && !(value && String(value).trim())) {
            return 'Enter text for this cell'
          }
          return true
        }),
    }),
  ],
  preview: {
    select: {mode: 'mode', text: 'text'},
    prepare({mode, text}) {
      if (mode === 'check') return {title: '✓', subtitle: 'Included'}
      if (mode === 'dash') return {title: '—', subtitle: 'Not included'}
      if (mode === 'cross') return {title: '✗', subtitle: 'No'}
      return {title: text?.trim() ? text : 'Text', subtitle: 'Text'}
    },
  },
})
