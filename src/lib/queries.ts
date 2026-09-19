import {client, isSanityConfigured} from './sanity'
import type {HomePage, PostCard, PostDetail, SiteSettings} from './types'
import {fallbackHomePage, fallbackPosts, fallbackSiteSettings} from './fallbacks'

const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  title,
  description,
  whatsappUrl,
  whatsappTooltip,
  logo,
  headerNav[]{label, href},
  footer{
    description,
    email,
    copyright,
    quickLinks[]{label, href},
    supportLinks[]{label, href},
    socialLinks[]{platform, url}
  }
}`

const homePageQuery = `*[_type == "homePage"][0]{
  heroSlides[]{
    image,
    subtitle,
    title,
    titleHighlight,
    description,
    primaryCtaLabel,
    primaryCtaIcon,
    secondaryCtaLabel
  },
  matchesSection{
    title,
    subtitle,
    categories[]{
      name,
      icon,
      matches[]{teams, league, time, status}
    }
  },
  casinoSection{
    title,
    subtitle,
    games[]{image, name, provider, badge, badgeStyle}
  },
  aboutSection{title, eyebrow, paragraphs, ctaLabel},
  featuresSection{
    title,
    subtitle,
    features[]{image, title, description}
  },
  betBigSection{image, eyebrow, title, titleHighlight, description, ctaLabel},
  blogSection{
    title,
    subtitle,
    featuredPosts[]->{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      mainImage,
      featured,
      authorName,
      "categoryTitle": category->title
    }
  },
  faqSection{
    title,
    subtitle,
    items[]{question, answer}
  }
}`

const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage,
  featured,
  authorName,
  "categoryTitle": category->title
}`

const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage,
  featured,
  authorName,
  authorImage,
  breadcrumb,
  "categoryTitle": category->title,
  sections[]{heading, paragraphs},
  body,
  blockquote{text, cite},
  tags,
  seoTitle,
  seoDescription
}`

const postSlugsQuery = `*[_type == "post" && defined(slug.current)]{"slug": slug.current}`

function replaceMahadevBook<T>(value: T): T {
  if (typeof value === 'string') {
    return value.replace(/Mahadev Book/g, 'Fairplay') as T
  }
  if (Array.isArray(value)) {
    return value.map((item) => replaceMahadevBook(item)) as T
  }
  if (value && typeof value === 'object') {
    const next: Record<string, unknown> = {}
    for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
      next[key] = replaceMahadevBook(nested)
    }
    return next as T
  }
  return value
}

async function safeFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!isSanityConfigured) return null
  try {
    const data = await client.fetch<T>(query, params)
    return data == null ? data : replaceMahadevBook(data)
  } catch (error) {
    console.error('Sanity fetch failed:', error)
    return null
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await safeFetch<SiteSettings>(siteSettingsQuery)
  return replaceMahadevBook(data ?? fallbackSiteSettings)
}

export async function getHomePage(): Promise<HomePage> {
  const data = await safeFetch<HomePage>(homePageQuery)
  return replaceMahadevBook(data ?? fallbackHomePage)
}

export async function getPosts(): Promise<PostCard[]> {
  const data = await safeFetch<PostCard[]>(postsQuery)
  if (data && data.length > 0) return replaceMahadevBook(data)
  return replaceMahadevBook(fallbackPosts)
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  const data = await safeFetch<PostDetail>(postBySlugQuery, {slug})
  if (data) return replaceMahadevBook(data)
  const fallback = fallbackPosts.find((p) => p.slug === slug) ?? null
  return fallback ? replaceMahadevBook(fallback) : null
}

export async function getPostSlugs(): Promise<string[]> {
  const data = await safeFetch<{slug: string}[]>(postSlugsQuery)
  if (data && data.length > 0) return data.map((d) => d.slug)
  return fallbackPosts.map((p) => p.slug)
}

export async function getRelatedPosts(slug: string, limit = 2): Promise<PostCard[]> {
  const posts = await getPosts()
  return posts.filter((p) => p.slug !== slug).slice(0, limit)
}
