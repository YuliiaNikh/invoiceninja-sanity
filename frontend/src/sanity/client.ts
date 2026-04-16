import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'j3iufmh2',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})
