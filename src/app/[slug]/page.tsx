import { notFound } from "next/navigation";
import { Metadata } from "next";
import fs from "fs";
import path from "path";
import styles from "./post.module.css";
import mdxStyles from "@/styles/mdx-layout.module.css";
import { getPostMetadata, getAllPosts } from "@/lib/posts";

interface PostPageProps {
  params: {
    slug: string;
  };
}

function formatDate(dateString: string): string {
  // Parse as local date to avoid timezone issues
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function buildOgImageUrl(params: {
  title: string;
  subtitle?: string;
  leftColumn?: string;
  rightColumn?: string;
  date?: string;
}): string {
  const queryParams = new URLSearchParams();
  queryParams.set("title", params.title);
  if (params.subtitle) queryParams.set("subtitle", params.subtitle);
  if (params.leftColumn) queryParams.set("leftColumn", params.leftColumn);
  if (params.rightColumn) queryParams.set("rightColumn", params.rightColumn);
  if (params.date) queryParams.set("date", params.date);

  return `/api/og?${queryParams.toString()}`;
}

// Generate metadata for social sharing
export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = params;

  const metadata = await getPostMetadata(slug);

  if (!metadata) {
    return {
      title: "Post Not Found",
    };
  }

  const ogImageUrl = buildOgImageUrl({
    title: metadata.title,
    subtitle: metadata.subtitle || "",
    date: metadata.date || "",
  });

  return {
    title: metadata.title,
    description: metadata.subtitle,
    openGraph: {
      title: metadata.title,
      description: metadata.subtitle,
      type: "article",
      publishedTime: metadata.date,
      authors: ["@_brimtown"],
      url: `https://brimtown.com/${slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.subtitle,
      creator: "@_brimtown",
      images: [ogImageUrl],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;

  try {
    // Dynamic import of the MDX post
    const { default: Post, metadata } = await import(`@/posts/${slug}.mdx`);

    const articleSchema = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: metadata.title,
      description: metadata.subtitle,
      datePublished: metadata.date,
      author: {
        "@type": "Person",
        name: "Tim Brown",
        alternateName: "brimtown",
        url: "https://brimtown.com",
      },
      url: `https://brimtown.com/${slug}`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://brimtown.com/${slug}`,
      },
    };

    const isPublished = metadata.published ?? false;

    return (
      <article>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(articleSchema),
          }}
        />
        {!isPublished && (
          <div
            style={{
              background: "#fef3c7",
              border: "2px solid #f59e0b",
              borderRadius: "8px",
              padding: "12px 16px",
              marginBottom: "24px",
              color: "#92400e",
              fontWeight: 500,
            }}
          >
            ⚠️ This post is unpublished and not visible in the blog listing or
            sitemap
          </div>
        )}
        <header className={styles.postHeader}>
          <h1 className={styles.postTitle}>{metadata.title}</h1>
          {metadata.subtitle && (
            <p className={styles.postSubtitle}>{metadata.subtitle}</p>
          )}
          <div className={styles.postMeta}>
            <span className={styles.postByline}>
              by{" "}
              <a
                href="https://x.com/_brimtown"
                target="_blank"
                rel="noopener me"
              >
                @_brimtown
              </a>
            </span>
            {metadata.date && (
              <time className={styles.postDate}>
                {formatDate(metadata.date)}
              </time>
            )}
          </div>
        </header>
        <div className={mdxStyles.mdxContent}>
          <Post />
        </div>
      </article>
    );
  } catch (error) {
    console.log("Post not found:", error);
    notFound();
  }
}

// Generate static params for all posts at build time
export async function generateStaticParams() {
  // In production, only generate pages for published posts
  // In development, generate all posts for preview
  const includeUnpublished = process.env.NODE_ENV === "development";
  const posts = await getAllPosts(includeUnpublished);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
