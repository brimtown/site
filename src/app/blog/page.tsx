import Link from "next/link";
import fs from "fs";
import path from "path";
import styles from "./blog.module.css";

async function getPosts() {
  const postsDirectory = path.join(process.cwd(), "src/posts");
  const files = fs.readdirSync(postsDirectory);

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const { metadata } = await import(`@/posts/${slug}.mdx`);

        return {
          slug,
          title: metadata?.title || slug,
          subtitle: metadata?.subtitle || "",
          date: metadata?.date || "",
        };
      })
  );

  // Sort by date, newest first
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
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
  const posts = await getPosts();
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
                    <td className={styles.dateCell}>{formatDate(post.date)}</td>
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
