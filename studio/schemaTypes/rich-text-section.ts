import {defineType, defineField, defineArrayMember} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const richTextSection = defineType({
  name: 'richTextSection',
  title: 'Rich Text Section',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'default',
      options: {
        list: [
          {title: 'Default (section heading + rich text)', value: 'default'},
          {title: 'Callout strip (compact banner + link)', value: 'calloutStrip'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'sectionLabel',
      title: 'Section Label',
      type: 'string',
      hidden: ({parent}) => parent?.layout === 'calloutStrip',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'calloutCta',
      title: 'Callout link',
      type: 'object',
      hidden: ({parent}) => parent?.layout !== 'calloutStrip',
      fields: [
        defineField({name: 'label', type: 'string', title: 'Link label', validation: (rule) => rule.required()}),
        defineField({
          name: 'href',
          type: 'string',
          title: 'Link URL',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Rich Text Section', subtitle: 'Rich Text'}
    },
  },
})
