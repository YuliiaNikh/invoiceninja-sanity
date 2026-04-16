import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../sanity/client'
import { PAGE_QUERY } from '../sanity/queries'
import { PageBuilder } from '../components/PageBuilder'

interface PageData {
  _id: string
  title: string
  slug: { current: string }
  seo?: { title?: string; description?: string }
  sections?: { _key: string; _type: string; [key: string]: unknown }[]
}

export function Page({ slug: slugProp }: { slug?: string }) {
  const { slug: slugParam } = useParams()
  const slug = slugProp || slugParam || 'index'

  return <PageFetch key={slug} slug={slug} />
}

function PageFetch({ slug }: { slug: string }) {
  const [page, setPage] = useState<PageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    client
      .fetch<PageData>(PAGE_QUERY, { slug })
      .then((data) => {
        if (cancelled) return
        if (!data) {
          setError('Page not found')
        } else {
          setPage(data)
          if (data.seo?.title || data.title) {
            document.title = `${data.seo?.title || data.title} – Invoice Ninja`
          }
        }
      })
      .catch(() => {
        if (!cancelled) setError('Failed to load page')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-6">
        <div className="text-[#64748b]">Loading…</div>
      </div>
    )
  }

  if (error || !page) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 px-6">
        <h1 className="font-['Sora',sans-serif] text-2xl font-bold text-[#0f172a]">
          {error || 'Page not found'}
        </h1>
        <p className="text-[#64748b]">The page you're looking for doesn't exist.</p>
      </div>
    )
  }

  return <PageBuilder sections={page.sections} />
}
