import {defineType, defineField, defineArrayMember} from 'sanity'
import {CogIcon} from '@sanity/icons'

export const settings = defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logoImage',
      title: 'Logo image',
      type: 'image',
      description: 'Optional. Square image (e.g. 64×64 or larger) shown in the header. If empty, a default mark is used.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'logo',
      title: 'Logo label',
      type: 'string',
      description: 'Text next to the mark (e.g. “Invoice Ninja”).',
    }),
    defineField({
      name: 'headerNav',
      title: 'Header Navigation',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'href', type: 'url', validation: (rule) => rule.uri({allowRelative: true})}),
          ],
          preview: {
            select: {title: 'label', subtitle: 'href'},
          },
        }),
      ],
    }),
    defineField({
      name: 'headerActions',
      title: 'Header Action Buttons',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'href', type: 'url', validation: (rule) => rule.uri({allowRelative: true})}),
            defineField({
              name: 'variant',
              type: 'string',
              options: {list: ['primary', 'secondary', 'ghost'], layout: 'radio'},
            }),
          ],
          preview: {
            select: {title: 'label', subtitle: 'variant'},
          },
        }),
      ],
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer Link Columns',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'heading', type: 'string', validation: (rule) => rule.required()}),
            defineField({
              name: 'links',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  fields: [
                    defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
                    defineField({name: 'href', type: 'url', validation: (rule) => rule.uri({allowRelative: true})}),
                  ],
                  preview: {
                    select: {title: 'label'},
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {title: 'heading'},
          },
        }),
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'platform', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'href', type: 'url', validation: (rule) => rule.uri({allowRelative: true})}),
          ],
          preview: {
            select: {title: 'platform'},
          },
        }),
      ],
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal Links',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'label', type: 'string', validation: (rule) => rule.required()}),
            defineField({name: 'href', type: 'url', validation: (rule) => rule.uri({allowRelative: true})}),
          ],
          preview: {
            select: {title: 'label'},
          },
        }),
      ],
    }),
  ],
})
