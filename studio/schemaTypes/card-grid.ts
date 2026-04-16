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
      name: 'band',
      title: 'Background band',
      type: 'string',
      description: 'Surface = gray sec-bg wrapper (installation & doc blocks on home). None = plain wrap (integrations, partners).',
      initialValue: 'surface',
      options: {
        list: [
          {title: 'Gray band (sec-bg)', value: 'surface'},
          {title: 'None (plain section)', value: 'none'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          {title: 'Install (compact grid)', value: 'install'},
          {title: 'Installer page (large cards)', value: 'installer'},
          {title: 'Partner', value: 'partner'},
          {title: 'Community', value: 'community'},
          {title: 'Integration', value: 'integration'},
          {title: 'Documentation', value: 'doc'},
        ],
      },
    }),
    defineField({
      name: 'footerNote',
      title: 'Footer note (below grid)',
      type: 'array',
      of: [{type: 'block'}],
      description: 'e.g. REST API / Webhooks line under integration cards on the home page.',
    }),
    defineField({
      name: 'disclaimer',
      title: 'Disclaimer (partner grids)',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Shown in a bordered box after partner cards (hosting page).',
    }),
    defineField({
      name: 'columnsDesktop',
      title: 'Columns on desktop',
      type: 'string',
      description: 'How many cards appear per row on large screens. Smaller breakpoints stack or use two columns first.',
      initialValue: '3',
      options: {
        list: [
          {title: '2 columns', value: '2'},
          {title: '3 columns', value: '3'},
          {title: '4 columns', value: '4'},
        ],
        layout: 'radio',
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
            defineField({
              name: 'eyebrow',
              title: 'Eyebrow / type line',
              type: 'string',
              description: 'Small uppercase line under the title (e.g. “Shared hosting · cPanel”).',
            }),
            defineField({name: 'description', type: 'text', rows: 2}),
            defineField({
              name: 'linkLabel',
              title: 'Link label',
              type: 'string',
              description: 'Text for the bottom link on installer-style cards (e.g. “Install via Softaculous →”).',
            }),
            defineField({
              name: 'tags',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({name: 'value', type: 'string', title: 'Tag', validation: (rule) => rule.required()}),
                    defineField({
                      name: 'tone',
                      title: 'Tone',
                      type: 'string',
                      options: {
                        list: [
                          {title: 'Default', value: 'default'},
                          {title: 'Green accent', value: 'green'},
                        ],
                        layout: 'radio',
                      },
                      initialValue: 'default',
                    }),
                  ],
                  preview: {select: {title: 'value', tone: 'tone'}},
                }),
              ],
            }),
            defineField({name: 'href', type: 'url', validation: (rule) => rule.uri({allowRelative: true})}),
            defineField({
              name: 'hideDocLink',
              title: 'Hide doc card link row',
              type: 'boolean',
              description: 'Community resources use full-card links only (no “Read the docs →” row).',
              initialValue: false,
            }),
            defineField({name: 'badge', type: 'string'}),
            defineField({name: 'featured', type: 'boolean', initialValue: false}),
            defineField({
              name: 'statItems',
              title: 'Stat row (community featured card)',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({name: 'value', type: 'string', title: 'Value', validation: (r) => r.required()}),
                    defineField({name: 'label', type: 'string', title: 'Label', validation: (r) => r.required()}),
                  ],
                  preview: {select: {title: 'value', subtitle: 'label'}},
                }),
              ],
            }),
          ],
          preview: {
            select: {title: 'name', subtitle: 'description'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'title', variant: 'variant', columnsDesktop: 'columnsDesktop'},
    prepare({title, variant, columnsDesktop}) {
      const cols = columnsDesktop || '3'
      return {title: title || 'Card Grid', subtitle: `${variant || 'default'} · ${cols} cols`}
    },
  },
})
