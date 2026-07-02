import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://khurshidalom.in'
  
  let blogs = []
  try {
    const res = await fetch('https://kode.devkayy.in/api/blogs.php', { next: { revalidate: 3600 } })
    if (res.ok) {
      blogs = await res.json()
    }
  } catch (e) {
    console.error("Sitemap fetch failed:", e)
  }

  const blogUrls = Array.isArray(blogs) ? blogs.map((blog: any) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  })) : []

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogUrls,
  ]
}
