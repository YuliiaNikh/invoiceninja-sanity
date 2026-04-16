import {defineType, defineField} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Meta Title',
      type: 'string',
      validation: (rule) => rule.max(60).warning('Keep under 60 characters for best SEO'),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.max(160).warning('Keep under 160 characters for best SEO'),
    }),
  ],
})
