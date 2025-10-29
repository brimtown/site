import Link from "next/link";
import fs from "fs";
import path from "path";

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
          description: metadata?.description || "",
        };
      })
  );

  // Sort by date, newest first
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export default async function BlogList() {
  const posts = await getPosts();

  return (
    <div>
      <h1>Writing</h1>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/${post.slug}`}>{post.title}</Link>
              {post.date && <time> — {post.date}</time>}
              {post.description && <p>{post.description}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
