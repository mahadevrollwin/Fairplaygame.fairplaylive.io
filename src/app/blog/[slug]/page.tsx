import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { ArticleDetail } from "@/components/blog/ArticleDetail";
import {
  getPostBySlug,
  getPostSlugs,
  getPosts,
  getRelatedPosts,
} from "@/lib/queries";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

const ARTICLE_SEO: Record<
  string,
  {
    title: string;
    description: string;
    canonical: string;
    ogImage: string;
    jsonLd: Record<string, unknown>[];
  }
> = {
  "mahadev-book-explore-an-exciting-online-casino-experience": {
    title: "Fairplay: Explore an Exciting Online Casino Experience",
    description:
      "Discover Fairplay's online casino — live dealer tables, slots, and top casino games with fast deposits, secure play, and round-the-clock support in India.",
    canonical:
      "https://fairplaylive.io/blog/mahadev-book-explore-an-exciting-online-casino-experience",
    ogImage: "https://fairplaylive.io/images/logo.png",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id":
            "https://fairplaylive.io/blog/mahadev-book-explore-an-exciting-online-casino-experience",
        },
        headline: "Fairplay: Explore an Exciting Online Casino Experience",
        description:
          "Discover Fairplay's online casino — live dealer tables, slots, and top casino games with fast deposits, secure play, and round-the-clock support in India.",
        image: "https://fairplaylive.io/blog-image.jpg",
        author: { "@type": "Organization", name: "Fairplay" },
        publisher: {
          "@type": "Organization",
          name: "Fairplay",
          logo: {
            "@type": "ImageObject",
            url: "https://fairplaylive.io/images/logo.png",
          },
        },
        datePublished: "2026-08-01",
        dateModified: "2026-08-01",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://fairplaylive.io/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://fairplaylive.io/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Fairplay: Explore an Exciting Online Casino Experience",
            item: "https://fairplaylive.io/blog/mahadev-book-explore-an-exciting-online-casino-experience",
          },
        ],
      },
    ],
  },
  "mahadev-book-best-cricket-betting-exchange-sites-in-india": {
    title: "Fairplay – Best Cricket Betting Exchange Sites in India",
    description:
      "Compare the best cricket betting exchange sites in India with Fairplay — top odds, live in-play markets, fast withdrawals, and a trusted betting ID.",
    canonical:
      "https://fairplaylive.io/blog/mahadev-book-best-cricket-betting-exchange-sites-in-india",
    ogImage: "https://fairplaylive.io/images/logo.png",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id":
            "https://fairplaylive.io/blog/mahadev-book-best-cricket-betting-exchange-sites-in-india",
        },
        headline: "Fairplay – Best Cricket Betting Exchange Sites in India",
        description:
          "Compare the best cricket betting exchange sites in India with Fairplay — top odds, live in-play markets, fast withdrawals, and a trusted betting ID.",
        image: "https://fairplaylive.io/blog-image.jpg",
        author: { "@type": "Organization", name: "Fairplay" },
        publisher: {
          "@type": "Organization",
          name: "Fairplay",
          logo: {
            "@type": "ImageObject",
            url: "https://fairplaylive.io/images/logo.png",
          },
        },
        datePublished: "2026-08-01",
        dateModified: "2026-08-01",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://fairplaylive.io/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://fairplaylive.io/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Fairplay – Best Cricket Betting Exchange Sites in India",
            item: "https://fairplaylive.io/blog/mahadev-book-best-cricket-betting-exchange-sites-in-india",
          },
        ],
      },
    ],
  },
  "mahadev-book-your-ultimate-online-cricket-betting-id-provider-in-india": {
    title:
      "Fairplay: Your Ultimate Online Cricket Betting ID Provider in India",
    description:
      "Get your online cricket betting ID with Fairplay, India's trusted provider — instant activation, secure play, live odds, and 24/7 WhatsApp support.",
    canonical:
      "https://fairplaylive.io/blog/mahadev-book-your-ultimate-online-cricket-betting-id-provider-in-india",
    ogImage: "https://fairplaylive.io/images/logo.png",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id":
            "https://fairplaylive.io/blog/mahadev-book-your-ultimate-online-cricket-betting-id-provider-in-india",
        },
        headline:
          "Fairplay: Your Ultimate Online Cricket Betting ID Provider in India",
        description:
          "Get your online cricket betting ID with Fairplay, India's trusted provider — instant activation, secure play, live odds, and 24/7 WhatsApp support.",
        image: "https://fairplaylive.io/blog-image.jpg",
        author: { "@type": "Organization", name: "Fairplay" },
        publisher: {
          "@type": "Organization",
          name: "Fairplay",
          logo: {
            "@type": "ImageObject",
            url: "https://fairplaylive.io/images/logo.png",
          },
        },
        datePublished: "2026-08-01",
        dateModified: "2026-08-01",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://fairplaylive.io/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Blog",
            item: "https://fairplaylive.io/blog",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Fairplay: Your Ultimate Online Cricket Betting ID Provider in India",
            item: "https://fairplaylive.io/blog/mahadev-book-your-ultimate-online-cricket-betting-id-provider-in-india",
          },
        ],
      },
    ],
  },
};

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const seo = ARTICLE_SEO[slug];

  if (seo) {
    return {
      title: seo.title,
      description: seo.description,
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: seo.canonical,
      },
      openGraph: {
        type: "article",
        title: seo.title,
        description: seo.description,
        url: seo.canonical,
        siteName: "Fairplay",
        images: [{ url: seo.ogImage }],
      },
      twitter: {
        card: "summary_large_image",
        title: seo.title,
        description: seo.description,
        images: [seo.ogImage],
      },
    };
  }

  const article = await getPostBySlug(slug);
  if (!article) return {};
  return {
    title: article.seoTitle || `${article.title} | Fairplay Blog`,
    description: article.seoDescription || article.excerpt,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getPostBySlug(slug);
  if (!article) notFound();

  const [related, allPosts] = await Promise.all([
    getRelatedPosts(slug),
    getPosts(),
  ]);
  const popular = allPosts.filter((post) => post.slug !== slug).slice(0, 5);
  const seo = ARTICLE_SEO[slug];

  return (
    <>
      {seo
        ? seo.jsonLd.map((schema, index) => (
            <script
              key={`${slug}-jsonld-${index}`}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(schema),
              }}
            />
          ))
        : null}
      <ReadingProgress />
      <Header variant="inner" active="blog" />
      <ArticleDetail article={article} related={related} popular={popular} />
      <Footer variant="inner" />
    </>
  );
}
