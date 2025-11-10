import { notFound } from "next/navigation";
import { Metadata } from "next";
import fs from "fs";
import path from "path";
import styles from "./post.module.css";
import mdxStyles from "@/styles/mdx-layout.module.css";

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

// Generate metadata for social sharing
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = params;

  try {
    const { metadata } = await import(`@/posts/${slug}.mdx`);

    const ogImageUrl = `/api/og?title=${encodeURIComponent(metadata.title)}&subtitle=${encodeURIComponent(metadata.subtitle || '')}&date=${encodeURIComponent(metadata.date || '')}`;

    return {
      title: metadata.title,
      description: metadata.subtitle,
      openGraph: {
        title: metadata.title,
        description: metadata.subtitle,
        type: 'article',
        publishedTime: metadata.date,
        authors: ['@_brimtown'],
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
        card: 'summary_large_image',
        title: metadata.title,
        description: metadata.subtitle,
        creator: '@_brimtown',
        images: [ogImageUrl],
      },
    };
  } catch (error) {
    return {
      title: 'Post Not Found',
    };
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = params;

  try {
    // Dynamic import of the MDX post
    const { default: Post, metadata } = await import(`@/posts/${slug}.mdx`);

    return (
      <article>
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
                rel="noopener noreferrer"
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
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const files = fs.readdirSync(postsDirectory);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
    }));
}
