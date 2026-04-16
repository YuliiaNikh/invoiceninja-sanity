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
      options: {list: ['light', 'dark', 'surface'], layout: 'radio'},
      initialValue: 'light',
      description: 'Surface = gray band (sec-bg), like “What to look for” on hosting.',
    }),
    defineField({
      name: 'columnsDesktop',
      title: 'Columns on desktop',
      type: 'string',
      initialValue: '3',
      options: {
        list: [
          {title: '2 columns', value: '2'},
          {title: '3 columns', value: '3'},
          {title: '4 columns (e.g. community “Contribute” row)', value: '4'},
        ],
        layout: 'radio',
      },
      description: 'Grid width on large screens. Community “Help make Invoice Ninja better” uses 4 to match the static HTML.',
    }),
    defineField({
      name: 'compactBottom',
      title: 'Compact bottom padding',
      type: 'boolean',
      initialValue: false,
      description:
        'Remove bottom section padding when the next page block continues in the same visual band (e.g. requirements → steps on Getting Started).',
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
            defineField({
              name: 'body',
              type: 'text',
              rows: 3,
              description:
                'One paragraph, or several lines: each non-empty line becomes a row with a checkmark (light / surface cards).',
            }),
            defineField({
              name: 'tags',
              title: 'Tags (codebase / dark cards)',
              type: 'array',
              of: [{type: 'string'}],
              description: 'Shown as small pills under the body on dark “codebase” cards.',
            }),
            defineField({
              name: 'linkLabel',
              title: 'Link label',
              type: 'string',
              description: 'e.g. “View on GitHub →” (dark codebase cards).',
            }),
            defineField({
              name: 'linkHref',
              title: 'Link URL',
              type: 'url',
              validation: (rule) => rule.uri({allowRelative: true}),
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'body'},
          },
        }),
      ],
    }),
    defineField({
      name: 'licenseTitle',
      title: 'License box title (dark section only)',
      type: 'string',
    }),
    defineField({
      name: 'licenseBody',
      title: 'License box body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'followLinks',
      title: 'Links below cards',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'href',
              type: 'url',
              validation: (rule) => rule.uri({allowRelative: true}),
            }),
          ],
          preview: {select: {title: 'label'}},
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
