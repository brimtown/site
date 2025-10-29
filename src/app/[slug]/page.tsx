import { notFound } from "next/navigation";
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
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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
          {metadata.date && (
            <time className={styles.postDate}>{formatDate(metadata.date)}</time>
          )}
        </header>
        <div className={mdxStyles.mdxContent}>
          <Post />
        </div>
      </article>
    );
  } catch (error) {
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
