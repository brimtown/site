import Link from "next/link";
import { Metadata } from "next";
import styles from "./blog.module.css";
import { getAllPosts } from "@/lib/posts";

const BLOG_TAGLINE = "Notes on AI product engineering, from the trenches";

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

export async function generateMetadata(): Promise<Metadata> {
  const ogImageUrl = buildOgImageUrl({
    title: "Tim Brown - Blog",
    subtitle: BLOG_TAGLINE,
    leftColumn: "@_brimtown",
    rightColumn: "https://brimtown.com/blog",
  });

  const absoluteOgImageUrl = `https://brimtown.com${ogImageUrl}`;

  return {
    title: "Blog - Tim Brown",
    description: BLOG_TAGLINE,
    openGraph: {
      title: "Blog",
      description: BLOG_TAGLINE,
      url: "https://brimtown.com/blog",
      type: "website",
      images: [
        {
          url: absoluteOgImageUrl,
          width: 1200,
          height: 630,
          alt: "Blog - Tim Brown",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Blog",
      description: BLOG_TAGLINE,
      creator: "@_brimtown",
      images: [absoluteOgImageUrl],
    },
  };
}

function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function groupPostsByYear(posts: any[]) {
  const grouped: Record<string, any[]> = {};

  posts.forEach((post) => {
    if (post.date) {
      const year = post.date.split("-")[0];
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(post);
    }
  });

  return grouped;
}

export default async function BlogList() {
  // Only show published posts
  const posts = await getAllPosts(false);
  const postsByYear = groupPostsByYear(posts);
  const years = Object.keys(postsByYear).sort((a, b) => Number(b) - Number(a));

  return (
    <div className={styles.blogContainer}>
      <h1 className={styles.blogTitle}>Blog</h1>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <div className={styles.yearTables}>
          {years.map((year) => (
            <table key={year} className={styles.yearTable}>
              <thead>
                <tr>
                  <th className={styles.yearHeader}>{year}</th>
                  <th className={styles.dateHeader}></th>
                </tr>
              </thead>
              <tbody>
                {postsByYear[year].map((post) => (
                  <tr key={post.slug} className={styles.postRow}>
                    <td className={styles.titleCell}>
                      <Link href={`/${post.slug}`} className={styles.rowLink}>
                        <span className={styles.postTitle}>{post.title}</span>
                        {post.subtitle && (
                          <span className={styles.postSubtitle}>
                            {post.subtitle}
                          </span>
                        )}
                      </Link>
                    </td>
                    <td className={styles.dateCell}>
                      <Link href={`/${post.slug}`} className={styles.rowLink}>
                        <span className={styles.date}>
                          {formatDate(post.date)}
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
      )}
    </div>
  );
}
