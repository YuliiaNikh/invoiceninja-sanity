import {defineType, defineField, defineArrayMember} from 'sanity'
import {NumberIcon} from '@sanity/icons'

export const stepsSection = defineType({
  name: 'stepsSection',
  title: 'Steps Section',
  type: 'object',
  icon: NumberIcon,
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
      description: 'Intro line under the title (e.g. “Choose the approach…”).',
    }),
    defineField({
      name: 'compactTop',
      title: 'Compact top padding',
      type: 'boolean',
      initialValue: false,
      description:
        'Use when this block continues directly after another section (e.g. steps after requirements on Getting Started). Removes top padding and adds spacing before the label.',
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'number', type: 'number'}),
            defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'body', type: 'text', rows: 3}),
            defineField({
              name: 'chips',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'value',
                      type: 'string',
                      title: 'Chip',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'href',
                      title: 'Link URL',
                      type: 'url',
                      description: 'Optional. When set, the chip renders as a link.',
                      validation: (rule) => rule.uri({allowRelative: true}),
                    }),
                    defineField({
                      name: 'variant',
                      title: 'Style',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Default', value: 'default'},
                          {title: 'Primary (blue)', value: 'primary'},
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'default',
                    }),
                  ],
                  preview: {select: {title: 'value'}},
                }),
              ],
            }),
            defineField({name: 'codeSnippet', type: 'text', rows: 4}),
          ],
          preview: {
            select: {title: 'title', number: 'number'},
            prepare({title, number}) {
              return {title: `${number ? `${number}. ` : ''}${title || 'Step'}`}
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {title: title || 'Steps Section', subtitle: 'Steps'}
    },
  },
})
