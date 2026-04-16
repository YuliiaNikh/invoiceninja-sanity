import {defineType, defineField, defineArrayMember} from 'sanity'
import {BarChartIcon} from '@sanity/icons'

export const statStrip = defineType({
  name: 'statStrip',
  title: 'Stat Strip',
  type: 'object',
  icon: BarChartIcon,
  fields: [
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'value', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
          ],
          preview: {
            select: {title: 'value', subtitle: 'label'},
          },
        }),
      ],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    select: {stats: 'stats'},
    prepare({stats}) {
      return {
        title: `${stats?.length || 0} stats`,
        subtitle: 'Stat Strip',
      }
    },
  },
})
